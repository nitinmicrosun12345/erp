let {
    register_data_save,
    login_data_validation,
  } = require("./../services/userloginService");
  
  exports.register = async (req, res) => {
    res.render("register");
  };
  exports.login =async (req,res) => {
    res.render("login");
    }
  exports.register_data_save = async (req, res) => {
    let data = await register_data_save(req);
    console.log(data)
    if (data.success) {
     
     console.log(data);
     res.send({ staus: 200, message: "registered successfully", data: [], sucess: true });
    } else {
      res.send({ staus: 400, message: "not regisred", data: [], sucess: false });
    }
  };
  
  exports.login_data_validation = async (req, res) => {
    console.log(req.body);
    let data = await login_data_validation(req,res);
    
  
    if (data.success) {
      res.send({ staus: 200, message: "login successfully", data: [], sucess: true });
    } else {
      if (data.status === 401 || data.status === 400) {
        res.status(data.status).send({ status: data.status, message: "Wrong email or password", data: [], success: false });
      } else if (data.status === 500) {
        res.status(data.status).send({ status: data.status, message: "Internal server error", data: [], success: false });
      } else if (data.status === 400) {
        res.status(data.status).send({ status: 400, message: "Invalid email format", data: [], success: false });
      } else {
        res.status(400).send({ status: 400, message: "Not registered", data: [], success: false });
      }
    }
 
  };
  