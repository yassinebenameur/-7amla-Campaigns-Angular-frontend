import {Component, OnInit} from '@angular/core';
import {CrudService} from '../../_services/crud.service';
import {Globals} from '../../_globals/Globals';
import {Compaign} from '../../_models/compaign.model';

@Component({
  selector: 'app-list-compaign',
  templateUrl: './list-compaign.component.html',
  styleUrls: ['./list-compaign.component.css']
})
export class ListCompaignComponent implements OnInit {

  compaigns: Compaign[];

  constructor(private crudService: CrudService) {
  }

  ngOnInit() {
    this.getAllCompaigns();
  }

  getAllCompaigns() {
    this.crudService.getAll(Globals.API_URL + Globals.COMPAIGNS).subscribe(
      (data: Compaign[]) => {
        this.compaigns = data;
        console.log(this.compaigns);
      }
    );
  }

}
