import {Component, OnInit} from '@angular/core';
import {CrudService} from '../../_services/crud.service';
import {Globals} from '../../_globals/Globals';
import {Campaign} from '../../_models/campaign.model';

@Component({
  selector: 'app-list-campaign',
  templateUrl: './list-campaign.component.html',
  styleUrls: ['./list-campaign.component.css']
})
export class ListCampaignComponent implements OnInit {

  campaigns: Campaign[];

  constructor(private crudService: CrudService) {
  }

  ngOnInit() {
    this.getAllCampaigns();
  }

  getAllCampaigns() {
    this.crudService.getAll(Globals.API_URL + Globals.CAMPAIGNS).subscribe(
      (data: Campaign[]) => {
        this.campaigns = data;
        console.log(this.campaigns);
      }
    );
  }

}
