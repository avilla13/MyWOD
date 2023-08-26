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
    type: Number
  },
  movements: [{
    movement: String,
    reps: Number,
    weight: String        
  }],
  rounds: {
    type: Number    
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }  
}, {
    timestamps: true,
    toJSON: {virtuals: true }
});

module.exports = mongoose.model('Wod', wodSchema);