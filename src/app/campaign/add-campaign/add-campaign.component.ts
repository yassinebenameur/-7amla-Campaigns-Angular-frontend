import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CrudService} from '../../_services/crud.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Globals} from '../../_globals/Globals';
import {Campaign} from '../../_models/campaign.model';
import {UserModel} from '../../_models/user.model';
import {AuthenticationService} from '../../_services/authentication.service';

@Component({
  selector: 'app-add-campaign',
  templateUrl: './add-campaign.component.html',
  styleUrls: ['./add-campaign.component.css']
})
export class AddCampaignComponent implements OnInit {

  campaignForm: FormGroup;
  campaignUrl;
  campaign_id: string;
  campaign: Campaign;
  currentUser: UserModel;


  constructor(private fb: FormBuilder,
              private crud: CrudService,
              private router: Router,
              private route: ActivatedRoute,
              private authService: AuthenticationService) {
    this.campaignUrl = Globals.API_URL + Globals.CAMPAIGNS;

    authService.currentUser
      .subscribe(user => {
        this.currentUser = user.user;
      });
  }

  submitForm(value: any): void {
    for (const key in this.campaignForm.controls) {
      this.campaignForm.controls[key].markAsDirty();
      this.campaignForm.controls[key].updateValueAndValidity();
    }
    console.log(value);

    if (!this.campaign) {
      this.crud.post(this.campaignUrl, this.campaignForm.value)
        .subscribe(() => {
          this.router.navigate(['/campaign/']);
        });
    } else {
      this.crud.update(this.campaignUrl, this.campaign_id, this.campaignForm.value)
        .subscribe(() => {
          this.router.navigate(['/campaign/']);
        });
    }
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.campaignForm.reset();
    for (const key in this.campaignForm.controls) {
      this.campaignForm.controls[key].markAsPristine();
      this.campaignForm.controls[key].updateValueAndValidity();
    }
  }

  ngOnInit() {

    this.campaign_id = this.route.snapshot.params.id;
    console.log(this.campaign_id);
    this.crud.getOne(this.campaignUrl, this.campaign_id).subscribe(
      (data: Campaign) => {
        this.campaign = data;
        console.log(this.campaign);
        this.initForm();
      }
    );
    this.initForm();
  }

  initForm() {
    this.campaignForm = this.fb.group({
      title: [this.campaign ? this.campaign.title : '', [Validators.required]],
      description: [this.campaign ? this.campaign.description : '', [Validators.required]],
      creator_id: this.campaign ? this.campaign.creator.id : this.currentUser.id
    });
  }
}
