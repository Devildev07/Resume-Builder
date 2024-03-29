import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTemplateComponent } from './view-template.component';

describe('ViewTemplateComponent', () => {
  let component: ViewTemplateComponent;
  let fixture: ComponentFixture<ViewTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewTemplateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
