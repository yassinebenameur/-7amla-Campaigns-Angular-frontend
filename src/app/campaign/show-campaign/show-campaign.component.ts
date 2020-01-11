import {Component, OnInit} from '@angular/core';
import {Campaign} from '../../_models/campaign.model';
import {CrudService} from '../../_services/crud.service';
import {Globals} from '../../_globals/Globals';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-show-campaign',
  templateUrl: './show-campaign.component.html',
  styleUrls: ['./show-campaign.component.css']
})
export class ShowCampaignComponent implements OnInit {

  campaignUrl;
  campaign: Campaign;
  campaignId: string;

  constructor(private crud: CrudService, private route: ActivatedRoute) {
    this.campaignUrl = Globals.API_URL + Globals.CAMPAIGNS;
    route.params.subscribe(params => {
      this.campaignId = params.id;
    });
  }

  ngOnInit() {
    this.crud.getOne<Campaign>(this.campaignUrl, this.campaignId)
      .subscribe(campaign => {
        this.campaign = campaign;
      });
  }

}
