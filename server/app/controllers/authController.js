const db = require("../models");
const User = db.users;

exports.register = async (req, res)=> {
    if (!req.body.name) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
      }
    
      // Create a Product
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });
      
      const token = user.createJWT();
      
      // Save User in the database
      user
        .save(user)
        .then(user => {
          res.status(201).json({user,token})
        }
        ).catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Product."
          });
        });
         
}

exports.login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    if(!email || !password){
        res.status(500).json({msg:"please provide all value"})
    }
    const user = await User.findOne({email}).select('+password');
    if(!user){
        res.status(500).json({msg:'Invalid credentials'})
    }

    const isCorrect = await user.comparePassword(password)

    if(!isCorrect) {
        res.status(500).json({msg:'Invalid credentials'})
    }

    const token = user.createJWT()
    user.password = undefined
    res.status(201).json({user,token})
}


exports.logout = async (req, res) => {
    
  }