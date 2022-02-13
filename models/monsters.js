const mongoose = require('mongoose');

const monsterSchema = new mongoose.Schema({
    name: { type: String },
    location: { type: String },
    story: { type: String },
})

const monsterCollection = mongoose.model('Monster', monsterSchema);

module.exports = monsterCollection