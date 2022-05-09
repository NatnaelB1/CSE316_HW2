var mongoose = require('mongoose');

var Schema = mongoose.Schema;

const noteSchema = new Schema(
    {
    _id: Number,
    id: Number, 
    forsort: Number,
    notebody: String,
    lastModified: String,
    note_tag: [{
        id: String, 
        text: String, 
    }],
    
    agent: { type: Schema.Types.ObjectId, ref: 'User', required: false },
    }
);

module.exports =  mongoose.model("note_model",noteSchema);