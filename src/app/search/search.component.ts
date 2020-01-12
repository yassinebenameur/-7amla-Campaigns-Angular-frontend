import {Component, OnInit} from '@angular/core';
import {CrudService} from '../_services/crud.service';
import {ActivatedRoute} from '@angular/router';
import {Globals} from '../_globals/Globals';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  keyword: string;
  results: any[];

  constructor(private crudService: CrudService, private route: ActivatedRoute) {
    this.keyword = this.route.snapshot.params.keyword;

  }

  ngOnInit() {

    this.route.params.subscribe(routeParams => {
      this.keyword = routeParams['keyword'];
      this.search();
    });


  }

  search() {
    this.crudService.searchByKeyword(Globals.API_URL, this.keyword).subscribe(
      (data: any[]) => {
        console.log(data);
        this.results = data;
      }
    );
  }

}
