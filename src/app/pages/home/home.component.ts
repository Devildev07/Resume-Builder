import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FeaturesComponent } from '../../components/features/features.component';
import { CommonServicesService } from 'src/app/services/common-services.service';
import { AuthModalComponent } from 'src/app/modals/auth-modal/auth-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { CarousalNextDirective } from 'src/app/directives/carousal-next.directive';
import { CarousalPrevDirective } from 'src/app/directives/carousal-prev.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [FeaturesComponent, CarousalNextDirective, CarousalPrevDirective],
})
export class HomeComponent implements OnInit {
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

  testimonials = [
    {
      content:
        'I was dreading the thought of updating my resume, but this platform made it so easy! The templates are modern, and the process is straightforward. Highly recommend!',
      author: 'Sarah T.',
    },
    {
      content:
        "As someone who's not tech-savvy, I was pleasantly surprised by how user-friendly this platform is. I was able to create a polished resume in no time!",
      author: 'Michael R.',
    },
    {
      content:
        'Using the Resumify was a breeze! I was able to create a professional-looking resume in no time.',
      author: 'Jessica S.',
    },
    {
      content:
        'I highly recommend this platform to anyone looking to revamp their resume. The templates are modern and sleek, and the editing process is straightforward.',
      author: 'Michael R.',
    },
    {
      content:
        'I was dreading the thought of updating my resume, but this platform made it so simple and hassle-free. The templates are fantastic, and the whole process was incredibly smooth.',
      author: 'Sarah M.',
    },
    {
      content:
        'Thanks to this Resumify, I was able to create a professional-looking resume in no time. The suggestions were really helpful, and I got positive feedback from recruiters right away.',
      author: 'John D.',
    },
  ];

  constructor(
    public commonService: CommonServicesService,
    public dialog: MatDialog,
    public elementRef: ElementRef,
    public renderer: Renderer2
  ) {}

  ngOnInit(): void {
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
