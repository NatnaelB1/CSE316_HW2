var mongoose = require('mongoose');

var Schema = mongoose.Schema;

const noteSchema = new Schema(
    {
    id: String, 
    notebody: String,
    lastModified: String,
    note_tag: [{
        id: String, 
        text: String, 
    }],
    }
)

module.exports =  mongoose.model("note_model",noteSchema);