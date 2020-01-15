import {Component, OnInit} from '@angular/core';
import {Campaign} from '../../_models/campaign.model';
import {CrudService} from '../../_services/crud.service';
import {Globals} from '../../_globals/Globals';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserModel} from '../../_models/user.model';
import {AuthenticationService} from '../../_services/authentication.service';
// @ts-ignore
import differenceInCalendarDays from 'date-fns/difference_in_calendar_days';

@Component({
  selector: 'app-show-campaign',
  templateUrl: './show-campaign.component.html',
  styleUrls: ['./show-campaign.component.css']
})
export class ShowCampaignComponent implements OnInit {

  campaignUrl;
  campaign: Campaign;
  campaignId: string;
  feedbackForm: FormGroup;
  feedbackUrl;
  currentUser: UserModel;
  interested: number;
  interestUrl;
  fundsUrl;
  rating: number;
  loading: boolean;
  fundForm: FormGroup;

  today = new Date();
  validityDate;

  constructor(private crud: CrudService,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthenticationService,
              private fb: FormBuilder) {
    this.campaignUrl = Globals.API_URL + Globals.CAMPAIGNS;
    this.feedbackUrl = this.campaignUrl + Globals.FEEDBACK;
    this.interestUrl = this.campaignUrl + Globals.INTEREST;
    this.fundsUrl = this.campaignUrl + Globals.FUNDS;
    route.params.subscribe(params => {
      this.campaignId = params.id;
    });
    this.interested = 0;
    this.rating = 2.5;

    authService.currentUser
      .subscribe(user => {
        if (user) {
          this.currentUser = user.user;
          this.checkIfUserInterested();
        }
      });
  }

  get card_number() {
    return this.fundForm.get('card_number');
  }

  get amount() {
    return this.fundForm.get('amount');
  }

  get validity_date() {
    return this.fundForm.get('validity_date');
  }

  get cvc() {
    return this.fundForm.get('cvc');
  }

  ngOnInit() {
    this.crud.getOne<Campaign>(this.campaignUrl, this.campaignId)
      .subscribe(campaign => {
        this.campaign = campaign;
        this.checkIfUserInterested();
      }, () => {
        this.router.navigate(['/campaign']);

      });
    this.initFeedbackForm();
    this.initFundForm();
  }

  initFeedbackForm() {
    this.feedbackForm = this.fb.group({
      rating: [null],
      comment: [null, Validators.required],
      user_id: this.currentUser ? this.currentUser.id : null,
      campaign_id: this.campaignId ? this.campaignId : null
    });
  }

  initFundForm() {
    const date = new Date();
    this.fundForm = this.fb.group({
      card_number: [null, [Validators.required, Validators.minLength(19)]],
      validity_date: [null, Validators.required],
      cvc: [null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(3)
      ]
      ],
      amount: [null, Validators.required],

      user_id: this.currentUser ? this.currentUser.id : null,
      campaign_id: this.campaignId ? this.campaignId : null
    });
  }

  postFeedback() {
    for (const key in this.feedbackForm.controls) {
      this.feedbackForm.controls[key].markAsDirty();
      this.feedbackForm.controls[key].updateValueAndValidity();
    }
    this.loading = true;
    this.feedbackForm.controls.rating.setValue(this.rating);
    this.crud.post(this.feedbackUrl, this.feedbackForm.value)
      .subscribe(feedback => {
        // @ts-ignore
        this.campaign.feedback = feedback;
        this.loading = false;
      }, () => {

        this.loading = false;
      });
  }

  checkUserCanGiveFeedback() {
    for (const feedback of this.campaign.feedback) {
      if (feedback.id === this.currentUser.id) {
        return false;
      }
    }
    return true;
  }

  submitInterest(n) {
    let url;
    if (n > 0) {
      url = this.interestUrl;
    } else {
      url = this.interestUrl + Globals.REMOVE;
    }
    this.loading = true;
    this.crud.post(url, {user_id: this.currentUser.id, campaign_id: this.campaignId})
      .subscribe((interests) => {
        // @ts-ignore
        this.campaign.interests = interests;
        this.checkIfUserInterested();
        this.loading = false;
      }, () => {
        console.log('error');
        this.checkIfUserInterested();
        this.loading = false;
      });

  }

  checkIfUserInterested() {
    if (this.currentUser && this.campaign) {
      for (const user of this.campaign.interests) {
        if (user.id === this.currentUser.id) {
          this.interested = 1;
          console.log('interested');
          return;
        }
      }

      this.interested = 0;
    }
  }

  resetFundForm(e: MouseEvent = null): void {
    if (e) {
      e.preventDefault();
    }
    this.fundForm.reset();
    for (const key in this.fundForm.controls) {
      this.fundForm.controls[key].markAsPristine();
      this.fundForm.controls[key].updateValueAndValidity();
    }
    this.validityDate = null;
  }

  onChange($event: any) {
    console.log($event.getFullYear());
    const date = $event.getFullYear() + '-'
      + ('0' + ($event.getMonth() + 1)).slice(-2) + '-'
      + ('0' + $event.getDate()).slice(-2) + ' ';
    this.validity_date.setValue(date);
  }

  disabledDate = (current: Date): boolean => {
    // Can not select days before today and today
    return differenceInCalendarDays(current, this.today) < 0;
  };

  postFund() {
    this.loading = true;
    const validity_date = this.validity_date.value;
    console.log(validity_date);
    this.validity_date.setValue(validity_date.split('-')[0] + '-' + validity_date.split('-')[1]);
    this.crud.post(this.fundsUrl, this.fundForm.value)
      .subscribe(campaign => {
        this.resetFundForm();
        this.loading = false;
        // @ts-ignore
        this.campaign = campaign;
      }, () => {

        this.loading = false;
      });
  }

  formatCreditCardNumber($event) {
    console.log($event);
    if (this.card_number.value.charAt(this.card_number.value.length - 1)) {
      if (isNaN(this.card_number.value.charAt(this.card_number.value.length - 1))) {
        this.card_number.setValue((this.card_number.value as string).slice(0, this.card_number.value.length - 1));
      }
    }
    if ($event.inputType !== 'deleteContentBackward' && $event.inputType !== 'deleteContentForward') {
      if (this.card_number.value.length === 4 || this.card_number.value.length === 9 || this.card_number.value.length === 14) {
        this.card_number.setValue(this.card_number.value + ' ');
      }
      if (this.card_number.value.length >= 20) {
        this.card_number.setValue((this.card_number.value as string).slice(0, this.card_number.value.length - 1));
      }
    } else {
      if (this.card_number.value.length === 4 || this.card_number.value.length === 9 || this.card_number.value.length === 14) {
        this.card_number.setValue((this.card_number.value as string).slice(0, this.card_number.value.length - 1));
      } else {
        let newCardNumber = '';
        for (let i = 0; i < this.card_number.value.length; i++) {
          if (this.card_number.value.charAt(i) !== ' ') {
            newCardNumber += this.card_number.value.charAt(i);
            console.log(this.card_number.value.charAt(i));
          }
          if (newCardNumber.length === 4 || newCardNumber.length === 9 || newCardNumber.length === 14) {
            newCardNumber += ' ';
          }
        }
        this.card_number.setValue(newCardNumber);
      }
    }
  }

}
