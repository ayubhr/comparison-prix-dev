const validator = require("validator");
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
require("dotenv").config();
module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        name: {
            type:String,
            required:[true,'Please provide name'],
            maxlength:25,
            trim:true
        },
        email : {
            type:String,
            required: true,
            validate: {
                validator:validator.isEmail,
                message: 'Please provide a valide email adress'
            },
            unique: true
        },
        password: {
            type : String,
            required: [true,'Please provide password'],
            minlength: 6,
            select: false
        }
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    schema.pre("save", async function(){
        const salt = await bcryptjs.genSalt(10);
        this.password = await  bcryptjs.hash(this.password,salt);
    });

    schema.methods.createJWT = function() {
        return jwt.sign({userId:this._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_LIFETIME })
    }

    schema.methods.comparePassword = async function(candidate) {
        const isMatch = await bcryptjs.compare(candidate,this.password)
        return isMatch
    }

    const User = mongoose.model("user", schema);
    return User;
  };
  