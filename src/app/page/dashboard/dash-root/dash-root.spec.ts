import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashRoot } from './dash-root';

describe('DashRoot', () => {
  let component: DashRoot;
  let fixture: ComponentFixture<DashRoot>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashRoot]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashRoot);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
