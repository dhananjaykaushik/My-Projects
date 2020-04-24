import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BugCountSetComponent } from './bug-count-set.component';

describe('BugCountSetComponent', () => {
  let component: BugCountSetComponent;
  let fixture: ComponentFixture<BugCountSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BugCountSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BugCountSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
