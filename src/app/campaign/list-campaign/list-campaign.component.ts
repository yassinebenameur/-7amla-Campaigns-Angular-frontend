import {Component, Input, OnInit} from '@angular/core';
import {CrudService} from '../../_services/crud.service';
import {Globals} from '../../_globals/Globals';
import {Campaign} from '../../_models/campaign.model';
import {UserModel} from '../../_models/user.model';
import {AuthenticationService} from '../../_services/authentication.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-list-campaign',
  templateUrl: './list-campaign.component.html',
  styleUrls: ['./list-campaign.component.css']
})
export class ListCampaignComponent implements OnInit {
  @Input() campaigns: Campaign[];
  currentUser: UserModel;
  commentForm: FormGroup;

  constructor(private crudService: CrudService,
              private authService: AuthenticationService,
              private fb: FormBuilder) {


    authService.currentUser
      .subscribe(user => {
        this.currentUser = user.user;
      });
  }

  ngOnInit() {
    if (!this.campaigns) {
      this.getAllCampaigns();
    }
  }

  getAllCampaigns() {
    this.crudService.getAll<Campaign[]>(Globals.API_URL + Globals.CAMPAIGNS).subscribe(
      (data) => {
        this.campaigns = data;
        console.log(this.campaigns);
      }
    );
  }



}
