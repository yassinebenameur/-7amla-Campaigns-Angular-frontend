import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  links: any[];
  constructor() {
    this.links = [
      {nom: 'Be Tounsi',
        description: 'association pour promouvoir le Produit tunisien',
        lien: 'https://www.facebook.com/groups/jemhabilletunisien/'
      },
      {nom: 'consommi tounsi',
        description: '',
        lien: 'https://www.facebook.com/groups/2573727366018975/'
      }
    ];
  }

  ngOnInit() {
  }

}
