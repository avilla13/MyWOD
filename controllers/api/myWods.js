// controllers/api/userWods.js
const Wod = require('../../models/wod');
const User = require('../../models/user');

module.exports = {
    index
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