import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTagComponent } from './show-tag.component';

describe('ShowTagComponent', () => {
  let component: ShowTagComponent;
  let fixture: ComponentFixture<ShowTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
