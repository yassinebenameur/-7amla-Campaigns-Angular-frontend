import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

// declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isCollapsed = false;

  constructor(private router: Router) {
  }

  onSearch() {
    console.log('SEARCH');
  }


  onEnter(nzValue: any) {
    console.log(nzValue);
    this.router.navigateByUrl('search/' + nzValue);
  }

  ngOnInit(): void {
    // if ($('.main-header').attr('data-sticky_header')) {
    //
    //   $('.main-header .header-wrapper').waypoint('sticky', {
    //     wrapper: '<div class="sticky-wrapper" />',
    //     stuckClass: 'stuck'
    //   });
    //
    // }
  }
}
