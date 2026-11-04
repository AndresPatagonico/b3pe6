import mongoose from 'mongoose';
import { ROLES } from '../utils/constants.js';

const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { 
        type: String, 
        required: true, 
        default: ROLES.USER,
        enum: Object.values(ROLES) 
    }
}, { timestamps: true });

export const UserModel = mongoose.model('users', userSchema);