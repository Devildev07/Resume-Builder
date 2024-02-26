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
      Feature: 'User-Friendly Interface',
      Description:
        'Our user-friendly interface makes resume building a breeze. Simply input your information, select a template, and watch as your resume comes to life.',
      svg: '../../../assets/Svg/monitor.svg',
    },
    {
      Feature: 'Customizable Templates',
      Description:
        'Choose from a variety of customizable templates tailored to different industries and career levels. Personalize fonts, colors, and layouts to reflect your unique style.',
      svg: '../../../assets/Svg/setting.svg',
    },
    {
      Feature: 'Expert Tips and Suggestions',
      Description:
        'Receive expert tips and suggestions throughout the resume-building process. From crafting compelling summaries to highlighting key achievements, our platform guides you every step of the way.',
      svg: '../../../assets/Svg/bulb.svg',
    },
    {
      Feature: 'Access Anytime, Anywhere',
      Description:
        "Access your resume anytime, anywhere, from any device. Whether you're on your desktop, tablet, or smartphone, your resume is always at your fingertips.",
      svg: '../../../assets/Svg/globe.svg',
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
