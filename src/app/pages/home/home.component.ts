import { Component, ElementRef, Renderer2 } from '@angular/core';
import { FeaturesComponent } from '../../components/features/features.component';
import { CommonServicesService } from 'src/app/services/common-services.service';
import { AuthModalComponent } from 'src/app/modals/auth-modal/auth-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [FeaturesComponent],
})
export class HomeComponent {
  whyChoose = [
    {
      id: 1,
      title: 'Professional Quality',
      description:
        'Our templates are designed by experts to ensure your resume looks polished and professional.',
    },
    {
      id: 2,
      title: 'Time-saving',
      description:
        'Say goodbye to hours spent formatting and tweaking your resume. With ResumeBuilder, you can create a standout resume in minutes.',
    },
    {
      id: 3,
      title: 'Tailored Guidance',
      description:
        'Receive personalized suggestions and tips throughout the resume-building process, ensuring your resume effectively showcases your qualifications.',
    },
    {
      id: 4,
      title: 'Flexibility',
      description:
        'Update your resume anytime, anywhere, and tailor it to specific job applications effortlessly.',
    },
  ];

  constructor(
    public commonService: CommonServicesService,
    public dialog: MatDialog
  ) {}

  ngOninit() {
    this.getChoose();
  }

  getChoose() {
    return this.whyChoose;
  }
  openAuthModal() {
    this.dialog.open(AuthModalComponent, {
      backdropClass: 'backdrop-blur',
      width: '500px',
      panelClass: 'rounded-lg',
    });
  }
}
