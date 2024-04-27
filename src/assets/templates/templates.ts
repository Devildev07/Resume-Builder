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
      projectTechUsed: 'skills used ',
    },
  ],
  languageDetails: [
    {
      languageName: 'language title',
      languageValue: 'language values',
    },
  ],
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
    skillDetails: "<span class=\"rounded-md p-2 bg-blue-500 text-white\">{{skills[0].skillTitle}}</span>",
    projectDetails: "<span class=\"rounded-md p-2 bg-blue-500 text-white\">{{projects[0].projectName}}</span>",
  }
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
