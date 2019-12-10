import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormArticleComponent } from './form-article.component';

describe('FormArticleComponent', () => {
  let component: FormArticleComponent;
  let fixture: ComponentFixture<FormArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
