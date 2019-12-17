import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AddCompaignComponent} from './add-compaign.component';

describe('AddCompaignComponent', () => {
  let component: AddCompaignComponent;
  let fixture: ComponentFixture<AddCompaignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddCompaignComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCompaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
