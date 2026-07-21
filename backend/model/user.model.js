import mongoose from "mongoose";

import bcrypt from 'bcrypt'
import { ROLES } from "../utils/constant.js";
import { lowercase, maxLength, minLength, trim, union } from "zod";


const UserSchema = new mongoose.Schema({

    username: {

        type: String,
        required: [true, 'Username Not found'],
        unique: true,
        trim: true,
        minLength: [3, 'minimum length should be 3 on username'],
        maxLength: [30, 'max can be 30 character on username']
    },

    email: {
        type: String,
        unique: true,
        required: [true, 'Email Is required'],
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [6, 'Password must be at least 6 character'],
        select: false
    },

    handle: {
        type: String,
        trim: true,
        default: ''

    },

    bio: {

        type: String,
        trim: true,
        default: ''


    },

    avtar: {



    },
    maxRating: {

    },
    role: {

    },
    refreshToken: {

    }



}, {

    timestamps: true,
    toJSON: {

        transform(doc, ret) {
            delete ret.password;
            delete ret.refreshToken;
            delete ret.__v;


            return ret;

        }

    }


})