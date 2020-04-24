import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserBugComponent } from './add-user-bug.component';

describe('AddUserBugComponent', () => {
  let component: AddUserBugComponent;
  let fixture: ComponentFixture<AddUserBugComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUserBugComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserBugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
