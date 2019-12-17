import {Component, OnInit} from '@angular/core';
import {CrudService} from '../../_services/crud.service';
import {Globals} from '../../_globals/Globals';

@Component({
  selector: 'app-list-compaign',
  templateUrl: './list-compaign.component.html',
  styleUrls: ['./list-compaign.component.css']
})
export class ListCompaignComponent implements OnInit {

  compaigns: any;

  constructor(private crudService: CrudService) {
  }

  ngOnInit() {
    this.getAllCompaigns();
  }

  getAllCompaigns() {
    this.crudService.getAll(Globals.API_URL + Globals.COMPAIGNS).subscribe(
      (data) => {
        this.compaigns = data;
      }
    );
  }

}
