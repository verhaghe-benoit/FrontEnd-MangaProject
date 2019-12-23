import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimesDetailsComponent } from './animes-details.component';

describe('AnimesDetailsComponent', () => {
  let component: AnimesDetailsComponent;
  let fixture: ComponentFixture<AnimesDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimesDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
