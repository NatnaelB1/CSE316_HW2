const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../user_model');
const Note = require('../note_model');
const {isLoggedIn, isAgent} = require('../middleware/auth');
const {wrapAsync} = require('../utils/helper');


// Using an async function to be able to use the "await" functionality below, which makes
// the find command run synchronously.

  // The React app does not call the below methods, but these are further examples of using Express
router.post('/notes', isLoggedIn, wrapAsync(async function (req, res) {
    console.log("Posted with body: " + JSON.stringify(req.body));
    const newNote = new Note({
        _id: req.body.id,
        id: Number(req.body.id), 
        forsort: Number(req.body.forsort), 
        notebody: req.body.notebody,
        lastModified: req.body.lastModified,
        note_tag: req.body.note_tag, 
        agent: req.session.userId // Saves the agent as the logged in user if present (otherwise no agent)
    })

    // Calling save is needed to save it to the database given we aren't using a special method like the update above
    await newNote.save();
    res.json(newNote);
}));

router.get('/notes', isLoggedIn, wrapAsync(async function (req, res) {
    console.log("Accessed by user id: " + req.session.userId);
    // Notice here that this will not only fetch the book instances, but also the book they reference.
    // Try taking out the .populate part of the line and see what changes.
    
    const userNotes = await Note.find({agent: req.session.userId});
    res.json(userNotes);

    
}));




// This now calls the isAgent function, which checks if the author has an agent, and if so requires
// the logged in user to be that agent, otherwise the request is denied.
router.get('/notes/:id', isAgent, wrapAsync(async function (req, res, next) {
    let id = req.params.id;
    if (mongoose.isValidObjectId(id)) {
        const note = await Note.findById(id);
        if (note) {
            res.json(note);
            return;
        } else {
            // The thrown error will be handled by the error handling middleware
            throw new Error('Note Not Found');
        }
    } else {
        throw new Error('Invalid Note Id');
    }
}));

router.put('/notes/:id', isAgent, wrapAsync(async function (req, res) {
    const id = req.params.id;
    //console.log(id);
    const {forsort, notebody, lastModified, note_tag} = req.body;
    console.log("PUT with id: " + id + ", body: " + JSON.stringify(req.body));
    // This below method automatically saves it to the database
    // findByIdAndUpdate by default does not run the validators, so we need to set the option to enable it.
    // This below method automatically saves it to the database. Note this code works
    // using a JavaScript syntactic sugar that requires the variables to be the same name
    // as the schema keys.
    await Note.findByIdAndUpdate(id, {'id': Number(req.body.id), "forsort": Number(req.body.forsort), "notebody": req.body.notebody, "lastModified": req.body.lastModified, "note_tag" : req.body.note_tag  },
        {runValidators: true});
    // Status 204 represents success with no content
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/204
    res.sendStatus(204);
}));

router.delete('/notes/:id', isAgent, wrapAsync(async function (req, res) {
    const id = req.params.id;
    console.log(id);
    const result = await Note.findByIdAndDelete(id);
    console.log("Deleted successfully: " + result);
    res.json(result);
}));
  

  module.exports = router;