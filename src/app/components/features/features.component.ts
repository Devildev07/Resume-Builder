import { Component } from '@angular/core';

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [],
  templateUrl: './features.component.html',
  styleUrl: './features.component.css',
})
export class FeaturesComponent {
  features = [
    {
      svg: '<svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  viewBox="0 0 24 24"  fill="none"stroke="currentColor"stroke-width="2"stroke-linecap="round"stroke-linejoin="round" class="w-20 h-20 rounded-xl p-5 bg-gray-100 grid place-items-center dark:bg-gray-800"  > <rect width="20" height="14" x="2" y="3" rx="2"></rect>  <line x1="8" x2="16" y1="21" y2="21"></line> <line x1="12" x2="12" y1="17" y2="21"></line> </svg>',
      Feature: 'User-Friendly Interface',
      Description:
        'Our user-friendly interface makes resume building a breeze. Simply input your information, select a template, and watch as your resume comes to life.',
    },
    {
      svg: ' <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"> <path stroke-linecap="round" stroke-linejoin="round" d="M6 13.5V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 9.75V10.5" /> </svg> ',
      Feature: 'Customizable Templates',
      Description:
        'Choose from a variety of customizable templates tailored to different industries and career levels. Personalize fonts, colors, and layouts to reflect your unique style.',
    },
    {
      Feature: 'Expert Tips and Suggestions',
      Description:
        'Receive expert tips and suggestions throughout the resume-building process. From crafting compelling summaries to highlighting key achievements, our platform guides you every step of the way.',
    },
    {
      Feature: 'Access Anytime, Anywhere',
      Description:
        "Access your resume anytime, anywhere, from any device. Whether you're on your desktop, tablet, or smartphone, your resume is always at your fingertips.",
    },
  ];

  constructor() {}

  ngOnInit() {
    this.getFeatures();
  }

  getFeatures() {
    console.log(this.features);
    console.log(typeof this.features);
    return this.features;
  }
}
