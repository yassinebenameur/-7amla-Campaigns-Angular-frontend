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

  constructor(private crud: CrudService,
              private route: ActivatedRoute,
              private authService: AuthenticationService,
              private fb: FormBuilder) {
    this.campaignUrl = Globals.API_URL + Globals.CAMPAIGNS;
    this.feedbackUrl = this.campaignUrl + Globals.FEEDBACK;
    route.params.subscribe(params => {
      this.campaignId = params.id;
    });
    authService.currentUser
      .subscribe(user => {
        this.currentUser = user.user;
      });
  }

  ngOnInit() {
    this.crud.getOne<Campaign>(this.campaignUrl, this.campaignId)
      .subscribe(campaign => {
        this.campaign = campaign;
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

}
