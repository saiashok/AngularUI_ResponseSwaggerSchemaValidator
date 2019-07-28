import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserApiSelectComponent } from './user-api-select.component';

describe('UserApiSelectComponent', () => {
  let component: UserApiSelectComponent;
  let fixture: ComponentFixture<UserApiSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserApiSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserApiSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
