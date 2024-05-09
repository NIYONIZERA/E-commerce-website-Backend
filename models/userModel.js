import mongoose from "mongoose"

const userSchema=new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    otp: {
        type: Number,
        required: true
    }
   
   
   
},
{
    toJSON: {
        transform: (doc, ret) => {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            delete ret.password;
            return ret;
        }
    },
    timestamps: true,
});
const userModel=mongoose.model("User",userSchema)

export default userModel;