import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

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
      // svg: '../../../assets/Svg/monitor.svg',
      svg: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-20 h-20 rounded-xl p-5 bg-gray-200 grid place-items-center dark:bg-gray-800 dark:text-blue-600"> <path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" /> </svg>',
    },
    {
      Feature: 'Customizable Templates',
      Description:
        'Choose from a variety of customizable templates tailored to different industries and career levels. Personalize fonts, colors, and layouts to reflect your unique style.',
      // svg: '../../../assets/Svg/setting.svg',
      svg: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-20 h-20 rounded-xl p-5 bg-gray-200 grid place-items-center dark:bg-gray-800 dark:text-blue-600"> <path stroke-linecap="round" stroke-linejoin="round" d="M6 13.5V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 9.75V10.5" /> </svg>',
    },
    {
      Feature: 'Expert Tips and Suggestions',
      Description:
        'Receive expert tips and suggestions throughout the resume-building process. From crafting compelling summaries to highlighting key achievements, our platform guides you every step of the way.',
      // svg: '../../../assets/Svg/bulb.svg',
      svg: '<svg  xmlns="http://www.w3.org/2000/svg"  fill="none"  viewBox="0 0 24 24"  stroke-width="1.5"  stroke="currentColor"  class="w-20 h-20 rounded-xl p-5 bg-gray-200 grid place-items-center dark:bg-gray-800 dark:text-blue-600 ">  <path    stroke-linecap="round"    stroke-linejoin="round"    d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"  /></svg>',
    },
    {
      Feature: 'Access Anytime, Anywhere',
      Description:
        "Access your resume anytime, anywhere, from any device. Whether you're on your desktop, tablet, or smartphone, your resume is always at your fingertips.",
      // svg: '../../../assets/Svg/globe.svg',
      svg: '<svg  xmlns="http://www.w3.org/2000/svg"  fill="none"  viewBox="0 0 24 24"  stroke-width="1.5"  stroke="currentColor"  class="w-20 h-20 rounded-xl p-5 bg-gray-200 grid place-items-center dark:bg-gray-800 dark:text-blue-600">  <path    stroke-linecap="round"    stroke-linejoin="round"    d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 0 1-1.161.886l-.143.048a1.107 1.107 0 0 0-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 0 1-1.652.928l-.679-.906a1.125 1.125 0 0 0-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 0 0-8.862 12.872M12.75 3.031a9 9 0 0 1 6.69 14.036m0 0-.177-.529A2.25 2.25 0 0 0 17.128 15H16.5l-.324-.324a1.453 1.453 0 0 0-2.328.377l-.036.073a1.586 1.586 0 0 1-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 0 1-5.276 3.67m0 0a9 9 0 0 1-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25"  /></svg>',
    },
  ];

  constructor(private sanitizer: DomSanitizer) {}

  sanitizeSVG(svg: string): any {
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }

  ngOnInit() {
    this.getFeatures();
  }

  getFeatures() {
    console.log(this.features);
    console.log(typeof this.features);
    return this.features;
  }
}
