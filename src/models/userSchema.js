import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    
    email: {
        type: String,
        required: [true, 'Please enter user email address'],
        unique: [true, 'Email address already taken']
    },

    password: {
        type: String,
        required: [true, 'Please user password']
    }
},
    {
    timestamps: true
    }
);

export const User = mongoose.model("Users", userSchema);

