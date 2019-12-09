import {Component, OnInit} from '@angular/core';
import {TagModel} from '../../_models/tag.model';
import {CrudService} from '../../_services/crud.service';
import {Globals} from '../../_globals/Globals';

@Component({
  selector: 'app-list-tag',
  templateUrl: './list-tag.component.html',
  styleUrls: ['./list-tag.component.css']
})
export class ListTagComponent implements OnInit {

  tags: TagModel[];

  constructor(private crudService: CrudService) {
  }

  ngOnInit() {
    this.getAllTags();

  }

  getAllTags() {
    this.crudService.getAll(Globals.API_URL + Globals.TAG).subscribe(
      (data: TagModel[]) => {
        this.tags = data;
      }
    );
  }

}
