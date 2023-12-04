let adminModel = require('../model/admin-model');
let userModel = require('../model/user_model');
let transactionModel = require('../model/transactions');
let service_infoModel = require('../model/service_info');
let leavesdataModel = require('../model/leaves_data_model');
let salary_ledgerModel = require('../model/salary_ledger_model');
let allowanceModel = require('../model/allowance_data_model');
let workstatusModel = require('../model/work_status_model');



const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

let mongoose = require("mongoose");
const transactions = require('../model/transactions');

// Admin Register Post
exports.admin_register_save = async (req) => {
  try {
    let salt = bcrypt.genSaltSync(10);
    req.body.pass = bcrypt.hashSync(req.body.pass, salt);
    let name = req.body.name;
    let email = req.body.email;
    let pass = req.body.pass;
    let mobile = req.body.mobile;

    let savedata = new adminModel({
      a_name: name,
      a_email: email,
      password: pass,
      a_mobile: mobile,
    });
    let saved_data = await savedata.save();
    if (saved_data)
      return {
        message: "data saved",
        data: saved_data,
        sucess: true,
      };
    else {
      return {
        message: "data not saved",
        data: [],
        sucess: false,
      };
    }
  } catch (error) {
    console.log("error", error);
  }

  //saving database
};

// Admin login post
exports.admin_login_validation = async (req, res) => {
  try {
    let data = await adminModel.findOne({ a_email: req.body.email });
    if (data) {
      let matchpass =  bcrypt.compareSync( req.body.pass,data.password);
      if (matchpass) {
        const token = jwt.sign(
          { _id: data._id.toString() },
          process.env.SECRET_KEY
        );
  await adminModel.findByIdAndUpdate(
          { _id: data._id },
          { auth_key: token }
        );
        res.cookie("jwt", token, {
          expires: new Date(Date.now() + 10000 * 60 * 60), //1 minit
          httpOnly: true,
          overwrite: true,
        });

        return {
          message: "user is logined",
          sucess: true,
          status: 200,
          data:data,
        };
      } else {
        return {
          message: "invalid credentials",
          sucess: false,
          status: 300,
        };
      }
    } else {
      return {
        message: "invalid credentials",
        sucess: false,
        status: 300,
      };
    }
  } catch (error) {
    console.log("error", error);
  };
};

//Admin Profile Page
exports.admin_profile = async (req,res) => {
  try{
    console.log(req.cookies.jwt);
    if (req.cookies.jwt != undefined && req.cookies.jwt != "") {
      const token = req.cookies.jwt;
        let data = await adminModel.findOne({auth_key:token});
        console.log(data);
  
    if(data){
        return {
          data:data,
          message: "user is logined",
          sucess: true,
          status: 200,
        };
      } else {
        return {
          message: "invalid credentials",
          sucess: false,
          status: 300,
        };
      }
    }
    } 
   catch (error) {
    console.log("error", error);
  }

  };

//Admin Porfile Update Post
exports.admin_update_profile = async (req,res) => {
  try {

    if (req.cookies.jwt != undefined && req.cookies.jwt != "") {
    const token = req.cookies.jwt;

    let name = req.body.name;
    let mobile= req.body.mobile;
    let updatedata = await adminModel.findOneAndUpdate({auth_key:token},{
      a_name: name,
      a_mobile: mobile,
      image: req.file.filename,
    });
    if (updatedata)
      return {
        message: "data saved",
        data: updatedata,
        sucess: true,
      };
    else {
      return {
        message: "data not saved",
        data: null,
        sucess: false,
      };
    }
  }
  } catch (error) {
    console.log("error", error);
  }

  //saving database
};

//Getting All Amdin Transactions 
exports.transaction_data = async (req, res) => {
  try {
    if (req.cookies.jwt != undefined && req.cookies.jwt != "") {
      const token = req.cookies.jwt;

      // Retrieve filter values from query parameters
      const username = req.query.username;
      const date = req.query.date;
      const year = req.query.year;
      const paymentMode = req.query.paymentMode;

      // Define the initial pipeline stages
      let pipeline = [
        {
          $lookup: {
            from: "users",
            localField: "user_id",
            foreignField: "_id",
            as: "user_info",
          },
        },
        {
          $unwind: "$user_info",
        },
        {
          $project: {
            _id: 1,
            user_id: 1,
            date: 1,
            method: 1,
            createdAt: 1,
            updatedAt: 1,
            userName: "$user_info.name",
          },
        },
      ];

      // Apply filters based on provided parameters
// Apply filters based on provided parameters
if (username) {
  pipeline.push({ $match: { "userName": { $regex: new RegExp(username), $options: 'i' } } });
}
if (date) {
  const regexDate = new RegExp(date);
  pipeline.push({
    $match: {
      $expr: {
        $regexMatch: {
          input: { $dateToString: { format: "%a %b %d %Y %X GMT%z (%Z)", date: "$date" } },
          regex: regexDate,
          options: "i"
        }
      }
    }
  });
}
if (year) {
  pipeline.push({
    $match: {
      $expr: {
        $eq: [{ $year: "$date" }, parseInt(year, 10)]
      }
    }
  });
}
if (paymentMode) {
  pipeline.push({ $match: { "method": { $regex: new RegExp(paymentMode), $options: 'i' } } });
}



      // Execute the aggregation pipeline
      let data = await transactionModel.aggregate(pipeline);

      console.log(data);

      if (data) {
        return {
          data: data,
          message: "user is logged in",
          sucess: true,
          status: 200,
        };
      } else {
        return {
          message: "invalid credentials",
          sucess: false,
          status: 300,
        };
      }
    }
  } catch (error) {
    console.log("error", error);
  }
};

//User Manager
exports.user_manager = async (req, res) => {
  try {
    console.log(req.cookies.jwt);
    if (req.cookies.jwt != undefined && req.cookies.jwt != "") {
      const token = req.cookies.jwt;

      // Extract filter parameters from the query string
      const filterUsername = req.query.filterusername;
      const filterEmail = req.query.filteremail;
      const filterMobile = req.query.filtermobile;
      const filterStatus = req.query.filterstatus;

      // Build the filter object based on the provided parameters
      const filter = {};
      if (filterUsername) {
        filter.name = { $regex: new RegExp(filterUsername, 'i') }; // Case-insensitive partial match
      }
      if (filterEmail) {
        filter.email = { $regex: new RegExp(filterEmail, 'i') };
      }
      if (filterMobile) {
        filter.mobile = { $regex: new RegExp(filterMobile, 'i') };
      }
      if (filterStatus) {
        filter.status = filterStatus;
      }

      // Apply the filter to the userModel.find() query
      let data;
      if (Object.keys(filter).length > 0) {
        // If at least one filter is provided, apply the filter
        data = await userModel.find(filter);
      } else {
        // If no filters are provided, retrieve all users
        data = await userModel.find();
      }

      console.log(data);

      if (data) {
        return {
          data: data,
          message: "user is logged in",
          success: true,
          status: 200,
        };
      } else {
        return {
          message: "invalid credentials",
          success: false,
          status: 300,
        };
      }
    }
  } catch (error) {
    console.log("error", error);
  }
};

//User Manager Update -- UserBlock/Unblock
exports.user_update = async (req,res) => {
  try {

    if (req.cookies.jwt != undefined && req.cookies.jwt != "") {
    const token = req.cookies.jwt;

    let status = "Blocked";
    let id=req.body.id;

    let updatedata = await userModel.findById({_id:id});
    let status2 = status.localeCompare(updatedata.status);

    if(status2 == 0){
      let updatedata = await userModel.findByIdAndUpdate({_id:id},{
        status: "Active",
      });
    }
    else {
      let updatedata = await userModel.findByIdAndUpdate({_id:id},{
        status: "Blocked",
      });
    }
    
    if (updatedata)
      return {
        message: "data saved",
        data: updatedata,
        sucess: true,
      };
    else {
      return {
        message: "data not saved",
        data: null,
        sucess: false,
      };
    }
  }
  } catch (error) {
    console.log("error", error);
  }

  //saving database
}

// Current No use
exports.service_type_data = async (req,res) => {
  try {

    if (req.cookies.jwt != undefined && req.cookies.jwt != "") {
    const token = req.cookies.jwt;

    let service_type=req.body.service_type;

    let updatedata = await adminModel.findOneAndUpdate({auth_key:token},{
      service_type: service_type,
    });
    
    if (updatedata)
      return {
        message: "data saved",
        data: updatedata,
        sucess: true,
      };
    else {
      return {
        message: "data not saved",
        data: null,
        sucess: false,
      };
    }
  }
  } catch (error) {
    console.log("error", error);
  }

  //saving database
}

//Add new service 
exports.service_info_data = async (req) => {
  try {
    let name = req.body.name;
    let service_type = req.body.service_type;
    let property1 = req.body.property1;
    let property2 = req.body.property2;
    let property3 = req.body.property3;
    let property4 = req.body.property4;
    let property5 = req.body.property5;
    let property6 = req.body.property6;

    let savedata = new service_infoModel({
      name: name,
      property:[ 
        {
          name: property1,
        },
        {
          name: property2,
        },
        {
          name: property3,
        },
        {
          name: property4,
        },
        {
          name: property5,
        },
        {
          name: property6,
        },
    ],
      service_type: service_type,
    });
    let saved_data = await savedata.save();
    if (saved_data)
      return {
        message: "data saved",
        data: saved_data,
        sucess: true,
      };
    else {
      return {
        message: "data not saved",
        data: [],
        sucess: false,
      };
    }
  } catch (error) {
    console.log("error", error);
  }

  //saving database
};

//Get Service_info // View All services names
exports.service_viewer = async (req, res) => {
  try {
    console.log(req.cookies.jwt);

    if (req.cookies.jwt != undefined && req.cookies.jwt != "") {
      // Extract filter parameters from the query string
      const filterServiceName = req.query.filterservicename;
      const filterServiceType = req.query.filterservicetype;
      const filterFieldName = req.query.filterfieldname;

      // Build the filter object based on the provided parameters
      const filter = {};

      if (filterServiceName) {
        filter.name = { $regex: new RegExp(filterServiceName, 'i') };
      }

      if (filterServiceType) {
        filter.service_type = filterServiceType;
      }

      if (filterFieldName) {
        filter['property.name'] = { $regex: new RegExp(filterFieldName, 'i') };
      }

      // Apply the filter to the service_infoModel.find() query
      let data;

      if (Object.keys(filter).length > 0) {
        // If at least one filter is provided, apply the filter
        data = await service_infoModel.find(filter);
      } else {
        // If no filters are provided, retrieve all services
        data = await service_infoModel.find();
      }

      console.log(data);

      if (data) {
        return ({
          data: data,
          message: "Data retrieved successfully",
          success: true,
        });
      } else {
        return({
          message: "No data found",
          success: false,
        });
      }
    }
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

// Service Update and Delete
exports.update_service_data = async (req,res) => {
  try {

    let _id = req.body.id;
    console.log(_id);
    let name = req.body.name;
    let service_type = req.body.service_type;
    let property1 = req.body.property1;
    let property2 = req.body.property2;
    let property3 = req.body.property3;
    let property4 = req.body.property4;
    let property5 = req.body.property5;
    let property6 = req.body.property6;

    let updatedata = await service_infoModel.findByIdAndUpdate({_id:_id},{
      name: name,
      property:[ 
        {
          name: property1,
        },
        {
          name: property2,
        },
        {
          name: property3,
        },
        {
          name: property4,
        },
        {
          name: property5,
        },
        {
          name: property6,
        },
    ],
      service_type: service_type,
    });
    if (updatedata)
      return {
        message: "data saved",
        data: updatedata,
        sucess: true,
      };
    else {
      return {
        message: "data not saved",
        data: null,
        sucess: false,
      };
    }
  } catch (error) {
    console.log("error", error);
  } 

  //saving database
};

//User Register by admin
exports.user_register_save = async (req) => {
  try {
    let salt = bcrypt.genSaltSync(10);
    req.body.pass = bcrypt.hashSync(req.body.pass, salt);
    let name = req.body.name;
    let email = req.body.email;
    let pass = req.body.pass;
    let mobile = req.body.mobile;

    let savedata = new userModel({
      name: name,
      email: email,
      password: pass,
      mobile: mobile,
    });
    let saved_data = await savedata.save();
    if (saved_data)
      return {
        message: "data saved",
        data: saved_data,
        sucess: true,
      };
    else {
      return {
        message: "data not saved",
        data: [],
        sucess: false,
      };
    }
  } catch (error) {
    console.log("error", error);
  }

  //saving database
};

//Leaves Data View
exports.leaves_data_viewer = async (req, res) => {
  try {
    console.log(req.cookies.jwt);
    if (req.cookies.jwt != undefined && req.cookies.jwt != "") {
      const token = req.cookies.jwt;
      let data = await leavesdataModel.aggregate([
        {
          $lookup: {
            from: "users", // Assuming your users collection name is "users"
            localField: "user_id",
            foreignField: "_id",
            as: "user_info",
          },
        },
        {
          $unwind: "$user_info",
        },
        {
          $project: {
            _id: 1,
            user_id: 1,
            service_id: 1,
            total_leaves: 1,
            entries: 1,
            createdAt: 1,
            updatedAt: 1,
            userName: "$user_info.name", // Add user name to the result
          },
        },
      ]);

      console.log(data);

      if (data) {
        return {
          success: true,
          data: data,
          message: "user is logged in",
          status: 200,
        };
      } else {
        return {
          message: "invalid credentials",
          success: false,
          status: 300,
        };
      }
    }
  } catch (error) {
    console.log("error", error);
  }
};

// Leaves Data Approve/Deny
exports.leaves_update = async (req, res) => {
  try {
    let id = req.body.id;
    let entry_id = req.body.entry_id;
    let answer = req.body.answer;
    console.log(answer);

    // Assuming you have a Mongoose model named allowanceModel
    const leaves = await leavesdataModel.findById(id);
    console.log(leaves);
    
      // Find the entry with the matching _id
      const entryToUpdate = leaves.entries.find(entry => entry._id.toString() === entry_id);

      // Update the status based on the answer
      if (entryToUpdate && (answer === 'Approved' || answer === 'Rejected')) {
        entryToUpdate.status = answer;

        await leaves.save();
        return {
          message: "Leave Request Updated",
          sucess: true,
          status: 200,
        };
      }
  } catch (error) {
    console.log('Error:', error);
    return {
      message: "Error updating leaves",
      sucess: false,
      status: 500,
    };
  }
};

exports.update_service_get = async (req,res) => {
  try{
    let id = req.query.id;
    // console.log(req.cookies.jwt);
    if (req.cookies.jwt != undefined && req.cookies.jwt != "") {
      const token = req.cookies.jwt;
        let data = await service_infoModel.findById({_id:id});
        console.log(data);
  
    if(data){
        return {
          data:data,
          message: "user is logined",
          sucess: true,
          status: 200,
        };
      } else {
        return {
          message: "invalid credentials",
          sucess: false,
          status: 300,
        };
      }
    }
    } 
   catch (error) {
    console.log("error", error);
  }

  };

// Salary Ledger Data Add
exports.salary_ledger_data_add = async (req, res) => {
  try {
    let useremail = req.body.useremail;
    let date = req.body.date;
    let month = req.body.month;
    let credited = req.body.credited;
    let given = req.body.given;
    let balance = req.body.balance;

    let data2 = await userModel.findOne({ email: useremail });
    let data1 = await salary_ledgerModel.findOne({ user_id: data2._id });

    let servicedata2 = await service_infoModel.findOne({ name: "Salary Ledger" });

    if (data1) {
      // If data1 exists, update the entries array with the new data
      data1.entries.push({
        date: date,
        month: month,
        credited: credited,
        given: given,
        balance: balance,
      });
    
      let updated_data = await salary_ledgerModel.findOneAndUpdate(
        { user_id: data2._id },
        { $set: { entries: data1.entries } },
        { new: true }
      );
    
      if (updated_data)
        return {
          message: "Data updated",
          data: updated_data,
          success: true,
        };
      else {
        return {
          message: "Data not updated",
          data: null,
          success: false,
        };
      }
    } else {
      // If data1 doesn't exist, create a new entry
      let savedata = new salary_ledgerModel({
        user_id: data2._id,
        service_id: servicedata2._id,
        entries: [
          {
            date: date,
            month: month,
            credited: credited,
            given: given,
            balance: balance,
          },
        ],
      });
      let saved_data = await savedata.save();

      if (saved_data)
        return {
          message: "Data saved",
          data: saved_data,
          success: true,
        };
      else {
        return {
          message: "Data not saved",
          data: null,
          success: false,
        };
      }
    }
  } catch (error) {
    console.log("Error", error);
    return {
      message: "Internal server error",
      data: null,
      success: false,
    };
  }
}; 

//Allowance View
exports.allowance_viewer = async (req, res) => {
  try {
    console.log(req.cookies.jwt);
    if (req.cookies.jwt != undefined && req.cookies.jwt != "") {
      const token = req.cookies.jwt;
      let data = await allowanceModel.aggregate([
        {
          $lookup: {
            from: "users", // Assuming your users collection name is "users"
            localField: "user_id",
            foreignField: "_id",
            as: "user_info",
          },
        },
        {
          $unwind: "$user_info",
        },
        {
          $project: {
            _id: 1,
            user_id: 1,
            service_id: 1,
            entries: 1,
            createdAt: 1,
            updatedAt: 1,
            userName: "$user_info.name", // Add user name to the result
          },
        },
      ]);

      console.log(data);

      if (data) {
        return {
          data: data,
          message: "user is logged in",
          success: true,
          status: 200,
        };
      } else {
        return {
          message: "invalid credentials",
          success: false,
          status: 300,
        };
      }
    }
  } catch (error) {
    console.log("error", error);
  }
};

//Allowance Update Approve/Den
exports.allowance_update = async (req, res) => {
  try {
    let id = req.body.id;
    let entry_id = req.body.entry_id;
    let answer = req.body.answer;
    console.log(answer);

    // Assuming you have a Mongoose model named allowanceModel
    const allowance = await allowanceModel.findById(id);
    console.log(allowance);

      // Find the entry with the matching _id
      const entryToUpdate = allowance.entries.find(entry => entry._id.toString() === entry_id);

      // Update the status based on the answer
      if (entryToUpdate && (answer === 'Approved' || answer === 'Rejected')) {
        entryToUpdate.status = answer;

        await allowance.save();
        return {
          message: "Allowance Updated",
          sucess: true,
          status: 200,
        };
      }
  } catch (error) {
    console.log('Error:', error);
    return {
      message: "Error updating allowance",
      sucess: false,
      status: 500,
    };
  }
};

//Work Status Data Viewer
exports.workstatus_viewer = async (req, res) => {
  try {
    console.log(req.cookies.jwt);

    if (req.cookies.jwt != undefined && req.cookies.jwt != "") {
      // Extract filter parameters from the query string
      const filterUserName = req.query.filterusername;
      const filterStatus = req.query.filterstatus;
      const filterMonth = req.query.filtermonth;
      const filterYear = req.query.filteryear;

      // Build the filter object based on the provided parameters
      const filter = {};

      if (filterUserName) {
        filter.name = { $regex: new RegExp(filterUserName, 'i') };
      }

      if (filterStatus) {
        filter['entries.status'] = filterStatus;
      }

      if (filterYear) {
        filter['entries.year'] = filterYear;
      }

      if (filterMonth) {
        filter['entries.month'] = filterMonth;
      }


      // Apply the filter to the service_infoModel.find() query
      let data;

      if (Object.keys(filter).length > 0) {
        // If at least one filter is provided, apply the filter
        data = await workstatusModel.find(filter);
      } else {
        // If no filters are provided, retrieve all services
        data = await workstatusModel.find();
      }

      console.log(data);

      if (data) {
        return ({
          data: data,
          message: "Data retrieved successfully",
          success: true,
        });
      } else {
        return({
          message: "No data found",
          success: false,
        });
      }
    }
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};