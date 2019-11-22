import {ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';
import {ListExampleComponent} from './list-example.component';

describe('ListExampleComponent', () => {
  let component: ListExampleComponent;
  let fixture: ComponentFixture<ListExampleComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ListExampleComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ListExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
