const Wod = require('../../models/wod');
const User = require('../../models/user');
const OpenAI = require('openai');

const openai = new OpenAI();

module.exports = {
  createWod
}

// async function create(req, res) {
//   const completion = await openai.createCompletion({
//     model: "gpt-3.5-turbo",
//     prompt: generatePrompt(req.body.puppetInput),
//     temperature: 0.6,
//     max_tokens: 360,
//     user: req.user._id
//   });
//   res.status(200).json({ result: completion.data.choices[0].text });
// }

async function createWod(req, res) {
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  const endpoint = 'https://api.openai.com/v1/chat/completions';
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      model: "gpt-3.5-turbo",
      body: JSON.stringify({
        prompt: `Create a CrossFit WOD using the following object: ${WodString}`,
        max_tokens: 200
      })
    });
    const data = await res.json();
    console.log(data);
  } catch(err) {
    console.log(err);
  }
}

const WodString = `const wodSchema = new Schema({
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
});`