const mongoose = require('mongoose');

let mongoSchema = new mongoose.Schema({
    student_id : String,
    request_id:{type: String, required:true, minlength: 32, unique:true},
    // Schema for section 1 "subject selection"
    subject_selection:{type: String, required: true},
    part_selection:{type: Number, required: true},
    // IF class is MA , MSC or BA subject selection is requiredd
    subject_selection_MA: {type: String, required: function(){if (this.class === 'MA' || this.class === 'BA'){return true}}},
    subject_selection_MSC:{type: String, required: function(){if (this.class === 'MSC'){return true}}},
    // Student info section 1
    student_name:{type: String, required: true, minlength: 3},
    student_f_name:{type: String, required:true, minlength: 3},
    student_surname:{type: String, required: true},
    student_blood_group: {type: String, required: true},
    student_cnic_num: {type: String, required: true, minlength: 13, unique:true},
    student_postal_addr: {type: String, required: true},
    student_dateof_birth: {type: Date, required: true},
    place_of_birth: {type: String, required: true},
    student_religion: {type: String, required: true},
    student_nationality: {type: String, required: true},
    student_social_status: {type: String, required: true},
    student_employee_status: {type: String, required: true},
    student_email: {type: String},
    student_phone_num: {type: String, minlength:11},
    fathers_name_alive: {type: String},
    fathers_cnic_num: {type: String, required: function(){if(this.fatherIfAlive){return true}else{return false}}},
    guardian_name: {type: String, required: function(){if(!this.fatherIfAlive){return true}else{return false}}},
    guardian_cnic_num : {type: String, required: function(){if(this.guardianName){return true}else{return false}}},
    father_occupation: {type: String},
    guardian_occupation: {type: String},
    occp_addr: {type: String},
    guardian_contact: {type: String},
    emergency_contact: {type: String, required: true, minlength:11},
    emergency_email: {type: String}
});

module.exports = mongoose.model('StudentCollection', mongoSchema);