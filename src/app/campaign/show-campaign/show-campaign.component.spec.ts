import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCampaignComponent } from './show-campaign.component';

describe('ShowCampaignComponent', () => {
  let component: ShowCampaignComponent;
  let fixture: ComponentFixture<ShowCampaignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowCampaignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowCampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
