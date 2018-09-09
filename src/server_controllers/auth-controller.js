const user = require('../database/models/user');
const participant = require('../database/models/participant');
const jwt = require('jsonwebtoken');
const shajs = require('sha.js');
const admin_access = ['/addParticipant', '/addAsset'];

const authenticate = (req, res) => {

    if(req.body.email && req.body.password){
        const hash = shajs('sha256').update(req.body.email+req.body.password).digest('hex').toUpperCase();
        
        user.findOne({email:req.body.email,password:hash})
        .then((user_info) => {
            if(!user_info)
                res.status(401).send({sucess:false});
            else {
                const { empId, email, password, name, role } = user_info;
                const jwtToken = jwt.sign(
                    {secret : hash, empId, name, email, role},
                    process.env.AUTH_SECRET,
                    { expiresIn: parseInt(process.env.AUTH_EXPIRE_TIME) }
                );
                res.status(200).send({sucess:true, auth:{empId, email, name, role, jwtToken}});
            }
        })
        .catch((e)=>{
            res.status(401).send({sucess:false});
        });
    }
    else {
        res.status(401).send({sucess:false});
    }

}

const signup = (req, res) => {
    let { email, password, name } = req.body;
    if(email && password){
        let tempParticipant = {};
        const hash = shajs('sha256').update(email+password).digest('hex').toUpperCase();
        participant.findOne({"email":email})
        .then((p) => {
            if(p) {
                tempParticipant = p;
                return user.findOne({$or:[{empId:p.empId},{"email":email}]});
            }
            else
                throw new Error("please ask admin to add as participant");
        }).then((u) => {
            if(u)
                throw new Error("user is already registered");
            else {
                const new_user = new user({ 
                    empId: tempParticipant.empId, 
                    email, 
                    password: hash, 
                    name, 
                    role: tempParticipant.role 
                });
  	            return new_user.save();
            }
        }).then((data) => {
            res.status(200).send({sucess:true});
        }).catch((e)=>{
            console.log(e);
            res.status(200).send({sucess:false, message: e.message});
        });;
    }
    else
        res.status(200).send({sucess:false, message: "field missing"});
}

const validate = (req, res) => {
    const authtoken = req.query.authToken || req.get('authToken');
    jwt.verify(req.query.authToken, process.env.AUTH_SECRET, function(err, decoded) {
      if (err) {
        return res.status(403).send(err);
      } else {
        //   if(decoded.secret && userInfo.UserList[decoded.secret] && userInfo.UserList[decoded.secret].name === decoded.name)
        //   {
            return res.status(200).send({sucess:true});
        //   }
        //   else
        //   {
        //       return res.status(403).send({sucess:false});
        //   }
      }
   });
}

const api_validate = (req, res, next) => {
    const authtoken = req.query.authToken || req.get('authtoken');
    jwt.verify(authtoken, process.env.AUTH_SECRET, function(err, decoded) {
      if (err) {
        console.log(err);
        return res.status(403).send(err);
      } else {
            res.locals.decoded = decoded;
            next();
      }
   });
}

const check_role =  (req, res, next) => {
    if(res.locals.decoded){
        const { role } = res.locals.decoded;
        if(admin_access.indexOf(req.url) > -1 && role !== 'admin') {
            return res.status(403).send("unauthorized");
        }
        else
            next();
    }
    else {
        return res.status(403).send("unauthorized");
    }
}

module.exports = {
    authenticate,
    validate,
    api_validate,
    check_role,
    signup
}