const mongoose = require('mongoose');

var jobSchema = new mongoose.Schema({
    jobId: {
        type: String,
        //min: [6, 'Too few eggs'],
        required: 'This field is required'
    },
    jobTitle: {
        type: String,
        required: 'This field is required'
    },
    jobPostedDate: {
        type: String,
        required: 'This field is required'
    },
    jobRole: {
        type: String,
        required: 'This field is required'
    },
    jobResponsibility: {
        type: String,
        required: 'This field is required'
    },
    jobCompanyName:{
        type: String,
        required: 'This field is required'
    },
    jobExperience: {
        type: String,
        required: 'This field is required'
    },
    jobSalary: {
        type: String,
        required: 'This field is required'
    },
    jobPositions: {
        type: String,
        required: 'This field is required'
    },
    jobLocation: {
        type: String,
        required: 'This field is required'
    },
    jobSkills: {
        type: String,
        required: 'This field is required'
    },
    jobDegree: {
        type: String,
        required: 'This field is required'
    },
    jobCompanyInfo: {
        type: String,
        required: 'This field is required'
    },
    jobEmploymentType: {
        type: String,
        required: 'This field is required'
    },
    jobIndustryType: {
        type: String,
        required: 'This field is required'
    },
    jobSearch: {
        type: String,
        required: 'This field is required'
    },
    jobDescription: {
        type: String,
        required: 'This field is required'
    }
});

//Validation Part
//custom validation for id
jobSchema.path('jobId').validate((val) => {
    //jobIdRegex = /^[0-9a-zA-Z]*$/;
    jobIdRegex = /\b[a-zA-Z0-9]{12}\b/;
    return jobIdRegex.test(val);
},'enter valid id');

//custom validation for title allows strings with space
jobSchema.path('jobTitle').validate((val) => {
    jobTitleRegex = /^[a-zA-Z ]*$/;
    return jobTitleRegex.test(val);
},'enter valid title');

//custom validation for Role allows strings
jobSchema.path('jobRole').validate((val) => {
    jobTitleRegex = /^[a-zA-Z ]*$/;
    return jobTitleRegex.test(val);
},'Only Alphabets allowed');

//custom validation for Responsibility to allow max 300 characters
jobSchema.path('jobResponsibility').validate((val) => { 
    return val.length <= 300;
    },'Max 300 characters allowed');

//custom validation for Company Name to allow 100 char string with space
jobSchema.path('jobCompanyName').validate((val) => {
    jobTitleRegex = /\b[a-zA-Z]{1,100}\b/;
    return jobTitleRegex.test(val);
},'Max 100 characters allowed');

//custom validation for Experience to allow numbers
jobSchema.path('jobExperience').validate((val) => {
    jobIdRegex = /\b[0-9]{1,2}\b/;
    return jobIdRegex.test(val);
},'Only numbers allowed');

//custom validation for salary to allow numbers
jobSchema.path('jobSalary').validate((val) => {
    jobIdRegex = /\b[0-9]{1,100}\b/;
    return jobIdRegex.test(val);
},'Only numbers allowed');

//custom validation for No. of positions to allow numbers
jobSchema.path('jobPositions').validate((val) => {
    jobIdRegex = /\b[0-9]{1,10}\b/;
    return jobIdRegex.test(val);
},'Only numbers allowed');

//custom validation for Location allows strings
jobSchema.path('jobLocation').validate((val) => {
    jobTitleRegex = /\b[a-zA-Z]{1,100}\b/;
    return jobTitleRegex.test(val);
},'Only Alphabets allowed');

//custom validation for Skills allows strings
jobSchema.path('jobSkills').validate((val) => {
    jobTitleRegex = /^[a-zA-Z, ]*$/;
    return jobTitleRegex.test(val);
},'Only Alphabets allowed');


//custom validation for Company Info allows strings
jobSchema.path('jobCompanyInfo').validate((val) => {
    jobTitleRegex = /^[a-zA-Z0-9 ]*$/;
    return jobTitleRegex.test(val);
},'Only Alphabets allowed');


//custom validation for Company Info allows strings
jobSchema.path('jobSearch').validate((val) => {
    jobTitleRegex = /^([a-z\s]+,)*([a-z\s]+){1}$/i;
    return jobTitleRegex.test(val);
},'Only Alphabets allowed and commas accepted');

//custom validation for Job Description to allow max 300 characters
jobSchema.path('jobDescription').validate((val) => { 
    return val.length <= 500;
    },'Max 500 characters allowed');


//creates collection in mongodb Database
mongoose.model('JobDetails', jobSchema)