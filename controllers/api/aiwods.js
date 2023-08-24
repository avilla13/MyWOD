const OpenAI = require('openai');

const openai = new OpenAI();
module.exports = {
  createWod
}

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const endpoint = 'https://api.openai.com/v1/chat/completions';

async function createWod(req, res) {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {"role": "system", "content": "You are a fitness assistant."},
          {"role": "user", "content": "Give me a CrossFit WOD for beginners."}
        ],
        max_tokens: 300
      })
    });
    const data = await response.json();
    res.status(200).json({ WodResult: data.choices[0].message.content });
    console.log(data);
  } catch(err) {
    console.log(err);
  }
}

function generatePrompt(){
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
  return WodString;
};


// const openai = require('openai');

// openai.apiKey = process.env.OPENAI_API_KEY;
// console.log(openai);

// async function createWod(req, res) {
//   try {
//     const completion = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       messages: [
//         {"role": "system", "content": "You are a fitness assistant."},
//         {"role": "user", "content": "Give me a CrossFit WOD for beginners."}
//       ]
//     });      
//   } catch (error) {
//     console.error(`Error with OpenAI API request: ${error.message}`);
//     res.status(500).json({
//       error: {
//         message: 'An error occurred during your request.',
//       }
//     });
//   }
// }

// async function createWod(req, res) {
//   try {
//     const completion = await openaiInstance.createCompletion({
//     model: "text-davinci-003",
//     prompt: generatePrompt(),
//     temperature: 0.6,
//     max_tokens: 250,
//     });
//     res.status(200).json({ result: completion.data.choices[0].text });
//   } catch(error){
//     console.error(`Error with OpenAI API request: ${error.message}`);
//     res.status(500).json({
//       error: {
//         message: 'An error occurred during your request.',
//       }
//     });
//   }
// }