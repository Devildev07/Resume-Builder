export const templateData: any = {
    name_key: 'Your Name',
    jobTitle: 'Your Job Title',
    email: 'demo@email.com',
    phone: '+91 9876543210',
    webLink: 'yourLink.com',
    address: 'Your Address',
    pincode: 'Your Pincode',
    city: 'Your City',
    state: 'Your State',
    country: 'Your Country',
    summary: 'summary or discription',
    experience_list: [
        {
            companyName: 'Your company name',
            jobTitle: 'Your Job Title',
            from: '2022-01-01',
            to: '2022-01-01',
            description: 'summary or discription',
            experienceYear: 'year of experience in company',
            responsibilities: [
                'summary or discription',
            ],
            skills: [
                'summary or discription',
            ],
            achievements: [
                'summary or discription',
            ],
            certificates: [
                'summary or discription',
            ],
        }
    ],
    education_list: [
        {
            institutionName: 'Your school name',
            courseTitle: 'Your Course Title',
            from: '2022-01-01',
            to: '2022-01-01',
            grades: 'Your grades',
            description: 'summary or discription',
        },
    ],
    skills_list: [
        {
            skillTitle: 'Your Skill',
            skillvalues: 'summary or discription'
        },
        {
            skillTitle: 'Your Skill2',
            skillvalues: 'summary or discription'
        },
        {
            skillTitle: 'Your Skill3',
            skillvalues: 'summary or discription'
        },
    ],
    projects_list: [
        {
            projectName: 'Your Project Name',
            from: '2022-01-01',
            to: '2022-01-01',
            year: 'year of project',
            description: 'summary or discription',
            skills: [
                'summary or discription',
            ],

        },
    ],
    language_list: [
        {
            languagetitle: 'language title',
            languagevalues: 'language values',
        },
    ],

}

export const templateArraySection: any = {
    template_01: {
        skills_list: "<span class=\"rounded-md p-2 bg-blue-500 text-white\">{{skillTitle}}</span>",
        experience_list: "<div class=\"exp_detail poppins-medium \"> <div class=\"job_title poppins-bold text-base\">{{jobTitle}}</div> <div class= \"company_name text-sm\" > {{companyName}}</div> <div class=\"time_period text-gray-600 text-xs poppins-light-italic\" > {{from}} to {{to}}</div> <div class=\"company_name text-sm\" > {{experienceYear}}</div> <ul class=\"list-disc ms-4 text-sm text-gray-800\" > <li>{{responsibilities}}</li>  </ul>  </div>",
        education_list: "<div class=\"edu_detail poppins-medium \"> <div class=\"course_title text-base poppins-bold\">{{courseTitle}}</div> <div class=\"university_name text-sm\">{{institutionName}}</div> <div class=\"time_period text-gray-600 text-xs poppins-light-italic\"> {{from}} to {{to}} </div> </div>",
        language_list: "<div class=\"lang_box\"> <div class=\"lang_title poppins-bold text-base\">{{languagetitle}}</div> <div class=\"lang_level poppins-light-italic text-gray-600 text-xs\">{{languagevalues}}</div> </div>"
    },
    template_02: {
        skills_list: "<span class=\"rounded-md p-2 bg-blue-500 text-white\">{{skills[0].skillTitle}}</span>",
        projects_list: "<span class=\"rounded-md p-2 bg-blue-500 text-white\">{{projects[0].projectName}}</span>",
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