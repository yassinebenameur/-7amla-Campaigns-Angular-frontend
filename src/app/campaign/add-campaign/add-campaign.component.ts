import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CrudService} from '../../_services/crud.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Globals} from '../../_globals/Globals';
import {Campaign} from '../../_models/campaign.model';
import {UserModel} from '../../_models/user.model';

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
  userUrl: string;

  users: UserModel[];
  selectedValue: any;


  constructor(private fb: FormBuilder, private crud: CrudService, private router: Router,
              private route: ActivatedRoute) {
    this.campaignUrl = Globals.API_URL + Globals.CAMPAIGNS;
    this.userUrl = Globals.API_URL + Globals.USER;
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
    this.getAllUsers();
    this.campaign_id = this.route.snapshot.params.id;
    console.log(this.campaign_id);
    this.crud.getOne(this.campaignUrl, this.campaign_id).subscribe(
      (data: Campaign) => {
        this.campaign = data;
        console.log(this.campaign);
        this.initForm();
        console.log(this.campaign['users'].forEach(
          (elt) => {
            this.add_committee_member(elt.role);
          }
        ));
      }
    );
    this.initForm();
  }

  initForm() {
    this.campaignForm = this.fb.group({
      title: [this.campaign ? this.campaign.title : '', [Validators.required]],
      description: [this.campaign ? this.campaign.description : '', [Validators.required]],
      committee_members: this.fb.array([])

    });
  }

  getAllUsers() {
    this.crud.getAll(this.userUrl).subscribe(
      (data: UserModel[]) => {
        this.users = data;
        console.log(data);
      }
    );
  }

  preventDefault($event: MouseEvent) {
    $event.preventDefault();
  }

  add_committee_member(committee_member) {
    (this.campaignForm.get('committee_members') as FormArray).push(this.createCommitteeRole(committee_member));

  }

  createCommitteeRole(committee_member: any): FormGroup {
    return this.fb.group({
      user_id: [committee_member ? committee_member.user_id : '', [Validators.required]],
      role: [committee_member ? committee_member.role : '', [Validators.required]]
    });

  }

  deleteCommitteeMember(i) {
    (this.campaignForm.get('committee_members') as FormArray).removeAt(i);

  }


}
