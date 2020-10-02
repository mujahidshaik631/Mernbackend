//DEALS WITH CRUD OPERATIONS
const express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
const EmployeeJob = mongoose.model('JobDetails');
var sessions = require('express-session');
const { response } = require('express');
var session;

var app = express();


router.get('/', (req, res) => {
    res.render('employeeJobs/addOrEdit', {
        viewTitle: "Insert Data"
    });
});

router.post('/', (req, res) => {
    //to identify updated or inserted
    if(req.body._id == ''){
        insertRecord(req, res);
    }
    else{
        updateRecord(req,res);
    }
});

//INSERTING RECORDS IN MONGODB

function insertRecord(req, res) {
    //create an object for jobPost model
    var jobpost = new EmployeeJob();
    jobpost.jobId = req.body.jobId;
    jobpost.jobTitle = req.body.jobTitle;
    jobpost.jobPostedDate = req.body.jobPostedDate;
    jobpost.jobRole = req.body.jobRole;
    jobpost.jobResponsibility = req.body.jobResponsibility;
    jobpost.jobCompanyName = req.body.jobCompanyName;
    jobpost.jobExperience = req.body.jobExperience;
    jobpost.jobSalary = req.body.jobSalary;
    jobpost.jobPositions = req.body.jobPositions;
    jobpost.jobLocation = req.body.jobLocation;
    jobpost.jobSkills = req.body.jobSkills;
    jobpost.jobDegree = req.body.jobDegree;
    jobpost.jobCompanyInfo = req.body.jobCompanyInfo;
    jobpost.jobEmploymentType = req.body.jobEmploymentType;
    jobpost.jobIndustryType = req.body.jobIndustryType;
    jobpost.jobSearch = req.body.jobSearch;
    jobpost.jobDescription = req.body.jobDescription;
    jobpost.save((err, doc) => {
        if (!err) {
            res.redirect('jobs/list');
        }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render('employeeJobs/addOrEdit', {
                    viewTitle: "Insert Data",
                    jobpost: req.body
                });
            }
            else {
                console.log("error during record insertion: " + err);
            }
        }
    });
}

//FUNCTION FOR UPDATING RECORDS

function updateRecord(req,res){
    EmployeeJob.findOneAndUpdate({_id: req.body._id},req.body,{ new: true},(err,doc) => {
        if(!err){
            res.redirect('employeeJobs/list');
        }
        else{
            if(err.name == 'validationError'){
                handleValidationError(err,req.body);
                res.render("empoyeeJobs/addOrEdit",{
                    viewTitle: "Update Job",
                    jobpost: req.body
                });
            }
            else{
                console.log("error during updating record: "+err);
            }
        }
    })
}

//ROUTER FOR LIST
router.get('/list', (req, res) => {
   // res.json('from list');
    
    //RETRIVES RECORD FROM MONGODB
    EmployeeJob.find((err,docs) => {
        if(!err){
            res.render("employeeJobs/list",{
                'list': docs
            });
        }
        else{
            console.log("error in retrieving employee list: " +err);
        }
    });
});

//VALIDATION HANDLER
function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'jobId':
                body['jobIdError'] = err.errors[field].message;
                break;
            case 'jobTitle':
                body['jobTitleError'] = err.errors[field].message;
                break;
            case 'jobPostedDate':
                body['jobPostedDateError'] = err.errors[field].message;
                break;
            case 'jobRole':
                body['jobRoleError'] = err.errors[field].message;
                break;
            case 'jobId':
                body['jobIdError'] = err.errors[field].message;
                break;
            case 'jobResponsibility':
                body['jobResponsibilityError'] = err.errors[field].message;
                break;
            case 'jobCompanyName':
                body['jobCompanyNameError'] = err.errors[field].message;
                break;
            case 'jobExperience':
                body['jobExperienceError'] = err.errors[field].message;
                break;
            case 'jobSalary':
                body['jobSalaryError'] = err.errors[field].message;
                break;
            case 'jobPositions':
                body['jobPositionsError'] = err.errors[field].message;
                break;
            case 'jobLocation':
                body['jobLocationError'] = err.errors[field].message;
                break;
            case 'jobSkills':
                body['jobSkillsError'] = err.errors[field].message;
                break;
            case 'jobDegree':
                body['jobDegreeError'] = err.errors[field].message;
                break;

            case 'jobCompanyInfo':
                body['jobCompanyInfoError'] = err.errors[field].message;
                break;

            case 'jobEmploymentType':
                body['jobEmploymentTypeError'] = err.errors[field].message;
                break;

            case 'jobIndustryType':
                body['jobIndustryTypeError'] = err.errors[field].message;
                break;

            case 'jobSearch':
                body['jobSearchError'] = err.errors[field].message;
                break;
            case 'jobDescription':
                body['jobDescriptionError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

//TO RETRIVE SPECIFIC RECORD FROM MONGODB
router.get('/:id', (req, res) => {
    EmployeeJob.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("employeeJobs/addOrEdit", {
                viewTitle: "Update Employee",
                employee: doc
            });
        }
    });
});

//ROUTE FOR DELETE
router.get('/delete/:id',(req,res) => {
    EmployeeJob.findByIdAndRemove(req.params.id,(err,doc) => {
        if(!err){
            res.redirect('jobs/list');
        }
        else{
            console.log("error in deleting: "+err);
        }
    })
});

//ADMIN LOGIN PAGE
router.get('/', (req, res) => {
    res.render('employeeJobs/login', {
        viewTitle: "Login Page"
    });
});

router.post('/login', (req,res) => {
    res.end(JSON.stringify(req.body));
    if(req.body.userName == 'admin' && req.body.userPassword == 'admin'){
        session.id = req.body.userName;
    }
    response.redirect("employeeJobs/addOrEdit");
});

module.exports = router;