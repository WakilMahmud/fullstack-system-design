import { model, Schema } from 'mongoose';

const userSchema = new Schema(
    {
        id: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        }
    },
    {
        timestamps: true
    }
);

export const User = model('User', userSchema);