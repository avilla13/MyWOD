const User = require('../../models/user');
const Wod = require('../../models/wod');
const OpenAI = require('openai');

const openai = new OpenAI();
module.exports = {
  createWod,
  saveWod
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
          {"role": "user", 
          "content": "Generate only one WOD (either a For Time, AMRAP, or an EMOM) similar to its respective example:\nFor Time\n5 Rounds of:\n12 Deadlifts (155/105 lb)\n9 Hang Power Cleans (155/105 lb)\n6 Push Jerks (155/105 lb)\n\nAMRAP\nin 20 minutes:\n5 Deadlifts (115/75 lb)\n5 Power Cleans (115/75 lb)\n5 Front Squats (115/75 lb)\n5 Push Press (115/75 lb)\n\nEMOM\nin 14 minutes:\nOdd: 10 Thrusters (95/65 lb)\nEven: 20 Kb Swings (53/35 lb)"}
        ],
        temperature: 0.5,
        max_tokens: 260
      })
    });
    const data = await response.json();
    const aiResponseText = data.choices[0].message.content;
    const formattedWod = parseWod(aiResponseText);
    res.status(200).json({ WodResult: aiResponseText, aiGeneratedWod: formattedWod });    
  } catch(error) {
    console.log(error);
    console.error('Error in createWod:', error);
    res.status(500).json({ error: 'Oh my WOD! Internal Server Error' });
  }
}

function parseWod(responseText) {
  let wod = {};
  // Identify the type of wod
  if (responseText.includes('For Time')) {
    wod.type = 'For Time';
  } else if (responseText.includes('AMRAP')) {
    wod.type = 'AMRAP';
  } else if (responseText.includes('EMOM')) {
    wod.type = 'EMOM';
  }
  // Split the text into an array of lines (based on the '\n' char) & rid of whitespaces
  const lines = responseText.split('\n').map(line => line.trim()).filter(line => line);

  // Find and parseInt the wod rounds or duration values
  if (wod.type === 'For Time') {
    const rounds = lines.find(line => line.includes('Rounds'));
    if (rounds) {
      wod.rounds = parseInt(rounds.split(' ')[0]);
    }
  } else if (wod.type === 'EMOM' || wod.type === 'AMRAP') {
    const duration = lines.find(line => line.toLowerCase().includes('minutes'));
    if (duration) {
      wod.duration = parseInt(duration.split(' ')[1]);
    }
  }
  // Extract movements by finding the line after 'Rounds' or 'minutes' (start of movements)
  const movementLines = lines.slice(lines.findIndex(line => line.includes('Rounds') || line.toLowerCase().includes('minutes')) + 1);
  // Extract the reps, movement, & weight from each line
  wod.movements = movementLines.map(line => {
    // Detecting if the line is an Odd/Even format (for EMOMs)
    const isOddEven = line.startsWith('Odd:') || line.startsWith('Even:');
    let repsAndMovement;
    let weight;
    if (isOddEven) {
      // Removing the 'Odd:' or 'Even:' prefix and trimming spaces
      repsAndMovement = line.split(': ')[1];
    } else {
      // Separate repsAndMovement and weight w/ '('
      [repsAndMovement, weight] = line.split('(');
    }
    // Now extract the reps and movement
    const reps = parseInt(repsAndMovement.split(' ')[0]);
    const movement = repsAndMovement.slice(repsAndMovement.indexOf(' ') + 1).trim();
    return {
      movement,
      reps,
      weight: weight ? weight.slice(0, -1).trim() : null
    };
  });
  // Assign userId to wod (since it's generated by AI => null)
  wod.userId = null;
  return wod;
}

async function saveWod(req, res) {
  try {
    // Validate wod exists
    if (!req.body.wod) {
      return res.status(400).json({ message: 'Invalid request wod' });
    }    
    // Find the user to link newWod to
    const user = await User.findById(req.body.userId);
    // Guardrail in case user= null
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Create newWOD and associate it with the user
    const newWod = new Wod(req.body.wod);
    newWod.userId = user._id;
    const digits = new Date().valueOf().toString().slice(-5);
    newWod.name = `WOD${digits}`;
    await newWod.save();    
    // Respond back to Front-End
    res.status(200).json({ message: 'WOD saved to your WODS. Click on MyWODS to view', wod: newWod });
  } catch (error) {
    console.error('Error in saveWod:', error);
    res.status(500).json({ message: 'Oh my WOD! Internal Server Error' });
  }
}