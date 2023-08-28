// controllers/api/userWods.js
const Wod = require('../../models/wod');
const User = require('../../models/user');

module.exports = {
  index,
	show
}

// Query only user's WODS 
async function index(req, res) {
	const userId = req.user._id;
	try {
		const myWods = await Wod.find({userId});
		console.log(`These are the wods for ${req.user.name}: ${myWods}`);
		res.status(200).json(myWods);
	} catch(error){
		console.error('Error in controllers myWods.index ', error);
		res.status(500).json({error: 'Could not retrieve myWods'});
	}
}

// Get myWOD by it's Id
async function show(req, res) {
  try {
    const wod = await Wod.findById(req.params.id);
		// Return 404 if not found
    if (!wod) {
      return res.status(404).json({ error: 'WOD not found' });
    }
		console.log(`From controllers myWods.show, response wod is: ${wod._id}`);
    res.status(200).json(wod);
  } catch (error) {
    res.status(500).json({ error: "Could not retrieve WOD." });
  }
}
