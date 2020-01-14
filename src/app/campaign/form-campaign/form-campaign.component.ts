import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CrudService} from '../../_services/crud.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Globals} from '../../_globals/Globals';
import {Campaign} from '../../_models/campaign.model';
import {TagModel} from '../../_models/tag.model';
import {UserModel} from '../../_models/user.model';
import {AuthenticationService} from '../../_services/authentication.service';

declare var $: any;

@Component({
  selector: 'app-add-campaign',
  templateUrl: './form-campaign.component.html',
  styleUrls: ['./form-campaign.component.css']
})
export class FormCampaignComponent implements OnInit {

  campaignForm: FormGroup;
  campaignUrl;
  campaign_id: string;
  campaign: Campaign;
  tags: TagModel[];
  listOfTagOptions: TagModel[];
  selectedTag = [];
  userUrl: string;

  users: UserModel[];
  currentUser: UserModel;

  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;

  selectedStartDate;
  selectStartDate: boolean;
  selectEndDate: boolean;
  private selectedEndDate;

  constructor(private fb: FormBuilder,
              private crud: CrudService,
              private router: Router,
              private route: ActivatedRoute,
              private authService: AuthenticationService) {
    this.campaignUrl = Globals.API_URL + Globals.CAMPAIGNS;
    this.userUrl = Globals.API_URL + Globals.USER;

    this.selectStartDate = false;
    this.selectEndDate = false;

    authService.currentUser
      .subscribe(user => {
        if (user) {
          this.currentUser = user.user;
        }
      });
  }

  get title() {
    return this.campaignForm.get('title');
  }

  get description() {
    return this.campaignForm.get('description');
  }

  get start() {
    return this.campaignForm.get('start');
  }

  get end() {
    return this.campaignForm.get('end');
  }

  get place() {
    return this.campaignForm.get('place');
  }

  getAllTags() {
    this.crud.getAll(Globals.API_URL + Globals.TAG).subscribe(
      (data: TagModel[]) => {
        this.tags = data;
      }
    );

  }

  submitForm(value: any): void {
    for (const key in this.campaignForm.controls) {
      this.campaignForm.controls[key].markAsDirty();
      this.campaignForm.controls[key].updateValueAndValidity();
    }
    console.log(value);
    // console.log(this.start.value.toLocaleString());

    if (!this.campaign) {
      const values = this.fileData ? Object.assign(this.campaignForm.value, {image: this.fileData}) : this.campaignForm.value;
      this.crud.post(this.campaignUrl, values, true)
        .subscribe(() => {
          this.router.navigate(['/campaign/']);
        });
    } else {
      const values = this.fileData ? Object.assign(this.campaignForm.value, {image: this.fileData}) : this.campaignForm.value;
      this.crud.update(this.campaignUrl, this.campaign_id, values, true)
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
    this.getAllTags();
    this.getAllUsers();
    this.campaign_id = this.route.snapshot.params.id;
    console.log(this.campaign_id);
    if (this.campaign_id) {
      this.crud.getOne(this.campaignUrl, this.campaign_id).subscribe(
        (data: Campaign) => {
          this.campaign = data;

          this.initForm();
          console.log(this.campaign);

          this.campaign.users.forEach(
            (elt) => {
              this.add_committee_member(elt.role);
              console.log(elt);
              console.log('TEST');
            }
          );
          for (const tag of this.campaign.tags) {
            this.selectedTag.push(tag.name);
          }

          this.selectedStartDate = new Date();
          this.selectedStartDate.setDate(parseInt(this.campaign.start_date.split('-')[2], 10));
          this.selectedStartDate.setMonth(parseInt(this.campaign.start_date.split('-')[1], 10) - 1);
          this.selectedStartDate.setYear(parseInt(this.campaign.start_date.split('-')[0], 10));
          this.selectedStartDate.setMinutes(parseInt(this.campaign.start_hour.split(':')[1], 10));
          this.selectedStartDate.setHours(parseInt(this.campaign.start_hour.split(':')[0], 10));

          this.start.setValue(this.campaign.start_date + ' ' + this.campaign.start_hour);

          this.selectedEndDate = new Date();
          this.selectedEndDate.setDate(parseInt(this.campaign.end_date.split('-')[2], 10));
          this.selectedEndDate.setMonth(parseInt(this.campaign.end_date.split('-')[1], 10) - 1);
          this.selectedEndDate.setYear(parseInt(this.campaign.end_date.split('-')[0], 10));
          this.selectedEndDate.setMinutes(parseInt(this.campaign.end_hour.split(':')[1], 10));
          this.selectedEndDate.setHours(parseInt(this.campaign.end_hour.split(':')[0], 10));

          this.end.setValue(this.campaign.end_date + ' ' + this.campaign.end_hour);

        }
      );
    }


    this.initForm();
  }

  initForm() {
    const date = new Date();
    this.campaignForm = this.fb.group({
      title: [this.campaign ? this.campaign.title : '', [Validators.required]],
      description: [this.campaign ? this.campaign.description : '', [Validators.required]],
      tags: [this.campaign ? this.selectedTag : null, [Validators.required]],
      committee_members: this.fb.array([]),

      creator_id: this.campaign ? this.campaign.creator.id : this.currentUser.id,
      start: [null],
      end: [null],
      place: [this.campaign ? this.campaign.place : null, Validators.required],
    });
  }

  fileProgress(fileInput: any) {
    this.fileData = fileInput.target.files[0] as File;
    this.preview();
  }

  preview() {
    // Show preview
    const mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
    };
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
    console.log(this.campaignForm.get('committee_members'));
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

  onChange($event: any, picker) {
    const date = $event.getFullYear() + '-'
      + ('0' + ($event.getMonth() + 1)).slice(-2) + '-'
      + ('0' + $event.getDate()).slice(-2) + ' '
      + ('0' + $event.getHours()).slice(-2) + ':'
      + ('0' + $event.getMinutes()).slice(-2);
    if (picker === 'start') {
      this.start.setValue(date);
    }
    if (picker === 'end') {
      this.end.setValue(date);
    }
  }
}
