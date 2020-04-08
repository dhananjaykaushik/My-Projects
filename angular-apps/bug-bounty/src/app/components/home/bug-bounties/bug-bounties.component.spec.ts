import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BugBountiesComponent } from './bug-bounties.component';

describe('BugBountiesComponent', () => {
  let component: BugBountiesComponent;
  let fixture: ComponentFixture<BugBountiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BugBountiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BugBountiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
