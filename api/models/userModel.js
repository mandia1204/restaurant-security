import mongoose from 'mongoose';
import bluebird from 'bluebird';

const userSchema = mongoose.Schema({
    userName: String,
    password: String,
    roles: [ { name: String}]
});

mongoose.Promise = bluebird;
export default mongoose.model('User', userSchema);
