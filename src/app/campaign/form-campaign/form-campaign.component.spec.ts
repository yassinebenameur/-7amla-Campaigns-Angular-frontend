import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FormCampaignComponent} from './form-campaign.component';

describe('AddCampaignComponent', () => {
  let component: FormCampaignComponent;
  let fixture: ComponentFixture<FormCampaignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormCampaignComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
