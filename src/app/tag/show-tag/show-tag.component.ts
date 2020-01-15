import {Component, OnInit} from '@angular/core';
import {TagModel} from '../../_models/tag.model';
import {CrudService} from '../../_services/crud.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Globals} from '../../_globals/Globals';

@Component({
  selector: 'app-show-tag',
  templateUrl: './show-tag.component.html',
  styleUrls: ['./show-tag.component.css']
})
export class ShowTagComponent implements OnInit {
  tag: TagModel;
  tagUrl;

  constructor(private crud: CrudService,
              private route: ActivatedRoute,
              private router: Router) {
    this.tagUrl = Globals.API_URL + Globals.TAG;
  }

  ngOnInit() {
    this.crud.getOne<TagModel>(this.tagUrl, this.route.snapshot.params.id)
      .subscribe(tag => {
        this.tag = tag;
      }, () => {
        this.router.navigate(['/tag']);
      });
  }

}
