import {Component, OnInit} from '@angular/core';
import {Campaign} from '../../_models/campaign.model';
import {CrudService} from '../../_services/crud.service';
import {Globals} from '../../_globals/Globals';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserModel} from '../../_models/user.model';
import {AuthenticationService} from '../../_services/authentication.service';

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
  rating: number;

  constructor(private crud: CrudService,
              private route: ActivatedRoute,
              private authService: AuthenticationService,
              private fb: FormBuilder) {
    this.campaignUrl = Globals.API_URL + Globals.CAMPAIGNS;
    this.feedbackUrl = this.campaignUrl + Globals.FEEDBACK;
    this.interestUrl = this.campaignUrl + Globals.INTEREST;
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

  ngOnInit() {
    this.crud.getOne<Campaign>(this.campaignUrl, this.campaignId)
      .subscribe(campaign => {
        this.campaign = campaign;
        this.checkIfUserInterested();
      });
    this.initFeedbackForm();
  }

  initFeedbackForm() {
    this.feedbackForm = this.fb.group({
      rating: [null, Validators.required],
      comment: [null, Validators.required],
      user_id: this.currentUser ? this.currentUser.id : null,
      campaign_id: this.campaignId ? this.campaignId : null
    });
  }

  postFeedback() {
    for (const key in this.feedbackForm.controls) {
      this.feedbackForm.controls[key].markAsDirty();
      this.feedbackForm.controls[key].updateValueAndValidity();
    }
    this.feedbackForm.controls.rating.setValue(this.rating);
    this.crud.post(this.feedbackUrl, this.feedbackForm.value)
      .subscribe(feedback => {
        // @ts-ignore
        this.campaign.feedback = feedback;
      });
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.feedbackForm.reset();
    for (const key in this.feedbackForm.controls) {
      this.feedbackForm.controls[key].markAsPristine();
      this.feedbackForm.controls[key].updateValueAndValidity();
    }
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
    this.crud.post(url, {user_id: this.currentUser.id, campaign_id: this.campaignId})
      .subscribe((interests) => {
        // @ts-ignore
        this.campaign.interests = interests;
        this.checkIfUserInterested();
      }, () => {
        console.log('error');
        this.checkIfUserInterested();
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

}
