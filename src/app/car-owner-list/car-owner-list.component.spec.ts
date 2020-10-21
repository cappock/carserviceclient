import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarOwnerListComponent } from './car-owner-list.component';

describe('CarOwnerListComponent', () => {
  let component: CarOwnerListComponent;
  let fixture: ComponentFixture<CarOwnerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarOwnerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarOwnerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
