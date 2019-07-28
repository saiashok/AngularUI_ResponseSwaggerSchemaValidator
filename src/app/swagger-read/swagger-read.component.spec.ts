import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwaggerReadComponent } from './swagger-read.component';

describe('SwaggerReadComponent', () => {
  let component: SwaggerReadComponent;
  let fixture: ComponentFixture<SwaggerReadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwaggerReadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwaggerReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
