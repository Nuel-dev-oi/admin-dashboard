import mongoose, {type Document, Model} from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

interface IUserMethods {
  createJWT(): string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface IUser extends Document, IUserMethods {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
} 

const userSchema = new mongoose.Schema<IUser, Model<IUser, {}, IUserMethods>>({
    name: {
        type: String,
        required: [true, "A name is required"],
        trim: true,
        lowercase: true,
    },
    email: {
        type: String,
        required: [true, "An email is required"],
        trim: true,
        lowercase: true,
        match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please provide a valid email',
        ],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "A password is required"],
        trim: true,
        minlength: [8, "Password must be 8 characters long"]
    },
    isAdmin: {
    type: Boolean,
    default: false,
    },
}, 
{
    timestamps: true
});


userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});  

userSchema.methods.createJWT = function() {
    return jwt.sign(
        { userId: this._id, name: this.name, admin: this.isAdmin },
        process.env.JWT_SECRET!,
        {
            expiresIn: process.env.JWT_LIFETIME as any,
        }
    )
};

userSchema.methods.comparePassword = async function(candidatePassword: string) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
}



const User = mongoose.model<IUser>("user", userSchema);

export default User;
