
import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import User from './user.model.js';
import Expense from './expense.model.js';
import Category from './category.model.js';

mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.users = User(mongoose, mongoosePaginate);
db.expenses = Expense(mongoose, mongoosePaginate);
db.categories = Category(mongoose, mongoosePaginate);

export default db;
