import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CrudService} from '../../_services/crud.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Globals} from '../../_globals/Globals';
import {Compaign} from '../../_models/compaign.model';

@Component({
  selector: 'app-add-compaign',
  templateUrl: './add-compaign.component.html',
  styleUrls: ['./add-compaign.component.css']
})
export class AddCompaignComponent implements OnInit {

  compaignForm: FormGroup;
  compaignUrl;
  compaign_id: string;
  compaign: Compaign;


  constructor(private fb: FormBuilder, private crud: CrudService, private router: Router,
              private route: ActivatedRoute) {
    this.compaignUrl = Globals.API_URL + Globals.COMPAIGNS;
  }

  submitForm(value: any): void {
    for (const key in this.compaignForm.controls) {
      this.compaignForm.controls[key].markAsDirty();
      this.compaignForm.controls[key].updateValueAndValidity();
    }
    console.log(value);

    if (!this.compaign) {
      this.crud.post(this.compaignUrl, this.compaignForm.value)
        .subscribe(() => {
          this.router.navigate(['/compaign/']);
        });
    } else {
      this.crud.update(this.compaignUrl, this.compaign_id, this.compaignForm.value)
        .subscribe(() => {
          this.router.navigate(['/compaign/']);
        });
    }
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.compaignForm.reset();
    for (const key in this.compaignForm.controls) {
      this.compaignForm.controls[key].markAsPristine();
      this.compaignForm.controls[key].updateValueAndValidity();
    }
  }

  ngOnInit() {

    this.compaign_id = this.route.snapshot.params.id;
    console.log(this.compaign_id);
    this.crud.getOne(this.compaignUrl, this.compaign_id).subscribe(
      (data: Compaign) => {
        this.compaign = data;
        console.log(this.compaign);
        this.initForm();
      }
    );
    this.initForm();
  }

  initForm() {
    this.compaignForm = this.fb.group({
      title: [this.compaign ? this.compaign.title : '', [Validators.required]],
      description: [this.compaign ? this.compaign.description : '', [Validators.required]],
    });
  }
}
