// models/wod.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');

const wodSchema = new Schema({
  name: {
    type: String,
    unique: true
  },
  type: {
    type: String,
    enum: ['AMRAP', 'EMOM', 'For Time'],
    required: true
  },
  duration: {
    type: Number,
    min: 1
  },
  movements: {
    type: [String],
    required: true,        
  },
  rounds: {
    type: Number,
    min: 1
  }  
}, {
    timestamps: true
});

module.exports = mongoose.model('Wod', wodSchema);