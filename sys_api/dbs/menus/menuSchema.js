/**
 * 用户信息
 */
import mongoose from '../db.js';
const Schema = mongoose.Schema;

const MenuSchema = new Schema({
  type: {
    type: String // 1 2 3
  },
  name: {
    type: String
  },
  key: {
    type: String,
    index: true
  },
  icon: {
    type: String
  },
  path: {
    type: String
  },
  sub: {
    type: Array,
    default: []
  },
  updateAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Menu', MenuSchema);