import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  onEnter(value: any) {
    console.log(value);
    this.router.navigateByUrl('search/' + value);
  }
}
