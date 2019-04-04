import mongoose from 'mongoose';
import bluebird from 'bluebird';

export const roleSchema = mongoose.Schema({
  roleName: String,
});

mongoose.Promise = bluebird;
export default mongoose.model('Role', roleSchema);
