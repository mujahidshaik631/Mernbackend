const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/EmployeeJobDB',{useNewUrlParser: true},(err) => {
if (!err){
    console.log('mongobd connection succeeded');
}
else{
    console.log('error in db connection: ' +err );
}
});

require('./jobpost.model');