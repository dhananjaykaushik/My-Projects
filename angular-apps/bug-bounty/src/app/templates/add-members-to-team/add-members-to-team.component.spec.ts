import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMembersToTeamComponent } from './add-members-to-team.component';

describe('AddMembersToTeamComponent', () => {
  let component: AddMembersToTeamComponent;
  let fixture: ComponentFixture<AddMembersToTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMembersToTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMembersToTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
