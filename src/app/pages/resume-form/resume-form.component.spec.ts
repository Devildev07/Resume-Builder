import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeFormComponent } from './resume-form.component';

describe('ResumeFormComponent', () => {
  let component: ResumeFormComponent;
  let fixture: ComponentFixture<ResumeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumeFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResumeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
