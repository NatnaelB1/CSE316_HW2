
// const router = require('express').Router();
// let Note = require('../note_mode.js');

// router.route('/').post((req, res) => {
//     const noteId = Number(req.body.id);
//     const noteContent = req.body.notebody;
//     const date = req.body.lastModified;
//     const tags = req.body.note_tag;

//     const newNote = new Note({
//         noteId,
//         noteContent,
//         date,
//         tags,
//     });

//     newNote.save()
//         .then(() => res.json('Note added!'))
//         .catch(err => res.status(400).json('Error: ' + err));
// });

// router.route('/id').get((res,req) => {
//     Note.find()
//         .then(notes => res.json(notes))
//         .catch(err => res.status(400).json('Error: ' + err));
// });

// router.route('/id').put((res,req) => {

// })

// router.route('/id').delete((res,req) => {
    
// })

// router.route('/*').get((req, res) => {
//     res.send("Nothing here");
//  })

// module.exports = router;

/*
/notes          - POST   - creates a note
/notes/id?      - GET    - gets the note with the specified ID
                - PUT    - updates the contents of the note
                - DELETE - removes a note
*/