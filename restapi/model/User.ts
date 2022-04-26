import moongose, { Schema,model } from 'mongoose';

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
},{
    timestamps: true
});


export interface UserModel extends moongose.Document {
    email: string;
    password: string;
}

export default model<UserModel>('User', UserSchema);

    
