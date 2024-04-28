export const templateData: any = {
  firstName: 'Your FName',
  lastName: 'Your LName',
  jobTitle: 'Your Job Title',
  email: 'demo@email.com',
  phone: '+91 9876543210',
  birthDate: 'Your Birth Date',
  website: 'yourLink.com',
  address: 'Your Address',
  postalCode: 'Your Pin code',
  city: 'Your City',
  state: 'Your State',
  country: 'Your Country',
  description: 'summary or description',
  educationalDetails: [
    {
      institutionName: 'Your school name',
      studyField: 'Your Course Title',
      degree: 'Your Course Title',
      startDate: '2022-01-01',
      endDate: '2022-01-01',
      grades: 'Your grades',
      description: 'summary or description',
      city: 'Your City',
    },
  ],
  experienceDetails: [
    {
      jobTitle: 'Your Job Title',
      companyName: 'Your company name',
      city: 'Your City',
      startDate: '2022-01-01',
      endDate: '2022-01-01',
      description: 'summary or description',
      experienceYear: 'year of experience in company',
      // responsibilities: [
      //     'summary or description',
      //     'summary or description',
      // ],
    }
  ],
  skillDetails: [
    {
      skillName: 'Your Skill',
      skillValue: 'summary or description'
    },

  ],
  projectDetails: [
    {
      projectTitle: 'Your Project Name',
      projectLink: 'Project Link',
      projectCodeLink: 'Project Code Link',
      projectYear: 'year of project',
      projectDescription: 'summary or description',
      projectTechUsed: ['skills used ', 'skills used ',]
    },
  ],
  languageDetails: [
    {
      languageName: 'language title',
      languageValue: 'language values',
    },
  ],
  hobbyDetails: [
    "interest and hobby",
    "interest and hobby",
  ]
}


export const templateArraySection: any = {
  template_01: {
    // experienceDetails: "<div class=\"exp_detail poppins-medium \"> <div class=\"job_title poppins-bold text-base\">{{jobTitle}}</div> <div class= \"company_name text-sm\" > {{companyName}}</div> <div class=\"time_period text-gray-600 text-xs poppins-light-italic\" > {{startDate}} to {{endDate}}</div> <div class=\"company_name text-sm\" > {{experienceYear}}</div> <ul class=\"list-disc ms-4 text-sm text-gray-800\" > {{responsibilities}}  </ul>  </div>",
    experienceDetails: "<div class=\"exp_detail poppins-medium \"> <div class=\"job_title poppins-bold text-base\">{{jobTitle}}</div> <div class= \"company_name text-sm\" > {{companyName}}</div> <div class=\"time_period text-gray-600 text-xs poppins-light-italic\" > {{startDate}} to {{endDate}}</div> <div class=\"company_name text-sm\" > {{experienceYear}}</div> </div>",
    educationalDetails: "<div class=\"edu_detail poppins-medium \"> <div class=\"course_title text-base poppins-bold\">{{studyField}}</div> <div class=\"university_name text-sm\">{{institutionName}}</div> <div class=\"time_period text-gray-600 text-xs poppins-light-italic\"> {{startDate}} to {{endDate}} </div> </div>",
    skillDetails: "<span class=\"rounded-md p-2 bg-blue-500 text-white\">{{skillName}}</span>",
    languageDetails: "<div class=\"lang_box\"> <div class=\"lang_title poppins-bold text-base\">{{languageName}}</div> <div class=\"lang_level poppins-light-italic text-gray-600 text-xs\">{{languageValue}}</div> </div>",
  },
  template_02: {
    // experienceDetails: "<div class=\"exp_detail poppins-medium \"> <div class=\"job_title poppins-bold text-base\">{{jobTitle}}</div> <div class= \"company_name text-sm\" > {{companyName}}</div> <div class=\"time_period text-gray-600 text-xs poppins-light-italic\" > {{startDate}} to {{endDate}}</div> <div class=\"company_name text-sm\" > {{experienceYear}}</div> <ul class=\"list-disc ms-4 text-sm text-gray-800\" > {{responsibilities}}  </ul>  </div>",
    experienceDetails: "<div class=\"exp_detail poppins-medium \"> <div class=\"job_title poppins-bold text-base\">{{jobTitle}}</div> <div class= \"company_name text-sm\" > {{companyName}}</div> <div class=\"time_period text-gray-600 text-xs poppins-light-italic\" > {{startDate}} to {{endDate}}</div> <div class=\"company_name text-sm\" > {{experienceYear}}</div> </div>",
    educationalDetails: "<div class=\"edu_detail poppins-medium \"> <div class=\"course_title text-base poppins-bold\">{{studyField}}</div> <div class=\"university_name text-sm\">{{institutionName}}</div> <div class=\"time_period text-gray-600 text-xs poppins-light-italic\"> {{startDate}} to {{endDate}} </div> </div>",
    skillDetails: "<span class=\"rounded-md p-2 bg-blue-500 text-white\">{{skillName}}</span>",
    languageDetails: "<div class=\"lang_box\"> <div class=\"lang_title poppins-bold text-base\">{{languageName}}</div> <div class=\"lang_level poppins-light-italic text-gray-600 text-xs\">{{languageValue}}</div> </div>",
  },
  template_03: {
    experienceDetails: "<section class=\"mb-2 break-inside-avoid\"> <header> <h3 class=\"text-xl font-semibold text-gray-650 leading-snugish\"> {{jobTitle}} ( {{experienceYear}} ) </h3> <p class=\"leading-normal text-md text-gray-550\"> {{startDate}} to {{endDate}} | {{companyName}} </p> </header> <p class=\"mt-2 leading-normal text-gray-700 text-md\"> {{description}} </p> </section>",
    educationalDetails: " <section class=\"pb-4 mt-4 mb-4 break-inside-avoid\"> <header> <h3 class=\"flex-grow text-xl font-semibold text-gray-700 leading-snugish\"> {{institutionName}} </h3> <p class=\"leading-normal text-md text-gray-550\"> {{startDate}} to {{endDate}} | {{degree}} </p> </header> <p class=\"mt-1 leading-normal text-md text-gray-650\"> <span class=\"font-semibold text-gray-700 text-md leading-snugish\"> Major: </span> {{studyField}} </p> <p class=\"leading-normal text-gray-700 text-md\"> <span class=\"font-semibold text-gray-700 text-md leading-snugish\"> CGPA: </span> {{grades}} </p> </section>",
    projectDetails: " <section class=\"pb-4 mb-4  break-inside-avoid\"> <header> <h3 class=\"text-xl font-semibold text-gray-700 leading-snugish\"> <a class=\"group\" href=\"{{projectLink}}\"> {{projectTitle}} </a> </h3>  <div class=\"leading-normal text-md text-gray-550 flex gap-1 mb-2\"><span>{{projectYear}} | </span><div class=\"flex gap-1 list-none \">{{projectTechUsed}}</div></div> </header> <p class=\"mt-2.1 text-md text-gray-700 leading-normal\"> {{projectDescription}} </p> </section>",
    skillDetails: " <li class=\"rounded-md text-md px-2.5 py-0.5 mr-1.6 mb-1 text-gray-200 leading-relaxed print:bg-white print:border-inset bg-gray-600\"> {{skillName}} </li>"
  },
  template_04: {
    experienceDetails: " <div> <h3 class=\"text-lg font-semibold text-gray-700\"> {{jobTitle}} ({{experienceYear}}) </h3> <p class=\"text-gray-700 mb-2\"> {{startDate}} to {{endDate}} | {{companyName}} </p> <p class=\"text-gray-700\"> {{description}} </p> </div> "
    ,
    educationalDetails: " <div> <h3 class=\"text-lg font-semibold text-gray-700\"> {{institutionName}} </h3> <p class=\"text-gray-700 mb-2\">{{startDate}} / {{endDate}} | {{degree}}</p> <p class=\"text-gray-700\"> <span class=\"font-semibold\">Major:</span> {{studyField}} </p> <p class=\"text-gray-700\"> <span class=\"font-semibold\">CGPA:</span> {{grades}} </p> </div>",
    projectDetails: "<div> <h3 class=\"text-lg font-semibold text-gray-700\">     <a class=\"group\" href=\"{{projectLink}}\">{{projectTitle}}</a> </h3> <div class=\"text-gray-700 flex gap-1 mb-2\"><span>{{projectYear}} | </span><div class=\"flex gap-1 list-none \">{{projectTechUsed}}</div></div> <p class=\"text-gray-700\"> {{projectDescription}} </p> </div> "
    ,
    skillDetails: "<li>{{skillName}}</li>"
  },
  template_05: {
    experienceDetails: "<li class=\"pt-2\"> <p class=\"flex justify-between text-sm\"><strong class=\"text-base\">{{companyName}}</strong>{{startDate}} | {{endDate}}</p><p class=\"flex justify-between text-base\">  {{jobTitle}}<small>{{city}}</small></p><p class=\"text-justify text-base\">  {{description}}</p></li>",
    educationalDetails: " <li class=\"pt-2\"> <p class=\"flex justify-between text-sm\"> <strong class=\"text-base\">{{institutionName}}</strong>{{startDate}} | {{endDate}} </p> <p class=\"flex justify-between text-sm\"> {{degree}}<small>GPA {{grades}}</small> </p> </li>",
    projectDetails: "<ul class=\"mt-1\"> <li class=\"py-2\"> <div class=\"flex justify-between my-1\"> <strong>{{projectTitle}}</strong> <ul class=\" flex list-none\" > {{projectTechUsed}}  </ul>  </div> <ul class=\"flex mb-2\"> <li> <a class=\"bg-blue-600 text-white px-2 py-1 mr-1 text-sm rounded\" href=\"{{projectLink}}\" >Live</a> </li> <li> <a class=\"bg-blue-600 text-white px-2 py-1 mr-1 text-sm rounded\" href=\"{{projectCodeLink}}\" >Source Code</a> </li> </ul> <p class=\"text-base\"> {{projectDescription}} </p> </li> </ul> ",
    skillDetails: " <li class=\"px-2 rounded-md bg-blue-500 text-white mt-1 py-1 block w-fit whitespace-nowrap\" > {{skillName}} </li>",
    hobbyDetails: "<li class=\"px-2 mt-1\">{{hobby}}</li> "
  },

}


export const template = [
  {
    "Id": "template_01",
    "Name": "Template 01",
    "Img": "./assets/templates/template-01/temp1.png",
    "Path": "./assets/templates/template-01/temp1.html"
  },
  {
    "Id": "template_02",
    "Name": "Template 02",
    "Img": "./assets/templates/template-02/temp2.png",
    "Path": "./assets/templates/template-02/temp2.html"
  },
  {
    "Id": "template_03",
    "Name": "Template 03",
    "Img": "./assets/templates/template-03/temp3.png",
    "Path": "./assets/templates/template-03/temp3.html"
  },
  {
    "Id": "template_04",
    "Name": "Template 04",
    "Img": "./assets/templates/template-04/temp4.png",
    "Path": "./assets/templates/template-04/temp4.html"
  },
  {
    "Id": "template_05",
    "Name": "Template 05",
    "Img": "./assets/templates/template-05/temp5.png",
    "Path": "./assets/templates/template-05/temp5.html"
  }

];
