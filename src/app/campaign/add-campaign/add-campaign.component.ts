import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CrudService} from '../../_services/crud.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Globals} from '../../_globals/Globals';
import {Campaign} from '../../_models/campaign.model';
import {TagModel} from '../../_models/tag.model';

@Component({
  selector: 'app-add-campaign',
  templateUrl: './add-campaign.component.html',
  styleUrls: ['./add-campaign.component.css']
})
export class AddCampaignComponent implements OnInit {

  campaignForm: FormGroup;
  campaignUrl;
  campaignId: string;
  campaign: Campaign;
  tags: TagModel[];
  listOfTagOptions: TagModel[];
  selectedTag=[]


  constructor(private fb: FormBuilder, private crud: CrudService, private router: Router,
              private route: ActivatedRoute) {
    this.campaignUrl = Globals.API_URL + Globals.CAMPAIGNS;
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

    if (!this.campaign) {
      this.crud.post(this.campaignUrl, this.campaignForm.value)
        .subscribe(() => {
          this.router.navigate(['/campaign/']);
        });
    } else {
      this.crud.update(this.campaignUrl, this.campaignId, this.campaignForm.value)
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
    this.campaignId = this.route.snapshot.params.id;
    console.log(this.campaignId);
    if (this.campaignId) {
      this.crud.getOne(this.campaignUrl, this.campaignId).subscribe(
        (data: Campaign) => {
          this.campaign = data;
          console.log(this.campaign);
          for(const tag of this.campaign.tags)
            this.selectedTag.push(tag.name)
          this.initForm();
        }
      );
    }
    this.initForm();
  }

  initForm() {
    this.campaignForm = this.fb.group({
      title: [this.campaign ? this.campaign.title : '', [Validators.required]],
      description: [this.campaign ? this.campaign.description : '', [Validators.required]],
      tags: [this.campaign ? this.selectedTag : null, [Validators.required]]
    });
  }
}
