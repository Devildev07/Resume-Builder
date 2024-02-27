import { Component } from '@angular/core';
import { FeaturesComponent } from '../../components/features/features.component';

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

  ngOninit() {
    this.getChoose();
  }

  getChoose() {
    return this.whyChoose;
  }
}
