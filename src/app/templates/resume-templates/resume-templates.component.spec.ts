import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeTemplatesComponent } from './resume-templates.component';

describe('ResumeTemplatesComponent', () => {
  let component: ResumeTemplatesComponent;
  let fixture: ComponentFixture<ResumeTemplatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumeTemplatesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResumeTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
