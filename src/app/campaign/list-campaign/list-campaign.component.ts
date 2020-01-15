import {Component, Input, OnInit} from '@angular/core';
import {CrudService} from '../../_services/crud.service';
import {Globals} from '../../_globals/Globals';
import {Campaign} from '../../_models/campaign.model';
import {UserModel} from '../../_models/user.model';
import {AuthenticationService} from '../../_services/authentication.service';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-list-campaign',
  templateUrl: './list-campaign.component.html',
  styleUrls: ['./list-campaign.component.css']
})
export class ListCampaignComponent implements OnInit {
  @Input() campaigns: Campaign[];
  currentUser: UserModel;
  loading: any;
  campaignUrl: string;
  nbElements: number;

  @Input() hideBanner = false;

  @Input() limitElements = 6;

  page = 1;

  constructor(private crudService: CrudService,
              private authService: AuthenticationService,
              private fb: FormBuilder) {

    this.campaignUrl = Globals.API_URL + Globals.CAMPAIGNS;

    authService.currentUser
      .subscribe(user => {
        if (user) {
          this.currentUser = user.user;
        }
      });
  }

  ngOnInit() {
    if (!this.campaigns) {
      this.getAllCampaigns(1);
    }
  }

  getAllCampaigns(pi) {
    this.loading = true;
    this.crudService.getAllPaginate<{ count: number, elements: Campaign[] }>(this.campaignUrl, (pi - 1) * this.limitElements, this.limitElements)
      .subscribe(campaigns => {
        if (!this.campaigns) {
          this.campaigns = [];
        }
        this.campaigns = this.campaigns.concat(campaigns.elements);
        console.log(this.campaigns);

        this.loading = false;
        this.nbElements = campaigns.count;
      });
  }


  preventDefault($e) {
    $e.preventDefault();
  }


}
