const mongoose = require('mongoose');

const deletedEmployeeSchema = new mongoose.Schema({
    
    
      empId: String,
        
      username: String,
        
      firstName: String,
        
      lastName: String,
      
      email: String,
        
      password: String,
      
      role: String,
        
      type:  String,
        
      NIC:  String,
        
      gender:  String,
      
      DOB:  Date,
      
      contactNo: String,
       
      address: String,
      
      joinedDate: String,
        
      profilePhoto: String, 

      reason: String,

      date: Date,
});

const DeletedEmployee = mongoose.model('DeletedEmployee', deletedEmployeeSchema);

module.exports = DeletedEmployee;
