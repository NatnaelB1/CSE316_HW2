
const express = require('express');
const mongoose = require('mongoose');
const User = require('./user_model.js');
const Note = require('./note_model.js');

const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

//Set up mongoose connection
var mongoDB = "mongodb://localhost:27017/H2"; // insert your database URL here
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Changing this setting to avoid a Mongoose deprecation warning:
// See: https://mongoosejs.com/docs/deprecations.html#findandmodify
//mongoose.set('useFindAndModify', false);

 
// Using an async function to be able to use the "await" functionality below, which makes
// the find command run synchronously.
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/users', async function (req,res) {
    const users = await User.find({});
    res.json(users);
});

app.post('/users/add', async function (req,res) {
  console.log("Posted with body: " + JSON.stringify(req.body));

  const newUser = new User({
      username : req.body.username,
      useremail : req.body.useremail,
      usercolor : req.body.usercolor,
  });
  await newUser.save();
  res.json(newUser);
});

app.put('/users/:id', async function (req,res) {
  let id = req.params.id;
  console.log("PUT with id: " + id + ", body: " + JSON.stringify(req.body));
  // This below method automatically saves it to the database
  User.findByIdAndUpdate(id,
      {'username': req.body.username, "useremail": req.body.useremail, "usercolor": req.body.usercolor},
      function (err, result) {
          if (err) {
              console.log("ERROR: " + err);
              res.send(err);
          } else {
              // Status 204 represents success with no content
              // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/204
              res.sendStatus(204);
          }
      });
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/notes', async function (req,res) {
  console.log("Posted with body: " + JSON.stringify(req.body));

  const newNote = new Note({
      id: req.body.id, 
      notebody: req.body.notebody,
      lastModified: req.body.lastModified,
      note_tag: req.body.note_tag 
    });
  
  await newNote.save();
  res.json(newNote);
});

app.get('/notes', async function (req,res) {
  const notes = await Note.find({});
  res.json(notes);
});

app.get('/notes/:id', async function (req,res) {
  let id = req.params.id;
  if( mongoose.isValidObjectId(id) ) {
      const note = await Note.findById(id);
      if( note ) {
          res.json(note);
          return; 
      }
  }

  console.log("No author with id: " + id);
  res.status(404);
  res.send("No author with id: " + id);
});

app.put('/notes/:id', async function (req,res) {
  let id = req.params.id;
    console.log("PUT with id: " + id + ", body: " + JSON.stringify(req.body));
    // This below method automatically saves it to the database
    Note.findByIdAndUpdate(id,
        {'id': req.body.id, "notebody": req.body.notebody, "lastModified": req.body.lastModified, "note_tag" : req.body.note_tag  },
        function (err, result) {
            if (err) {
                console.log("ERROR: " + err);
                res.send(err);
            } else {
                // Status 204 represents success with no content
                // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/204
                res.sendStatus(204);
            }
        });
})

app.delete('/notes/:id', async function (req,res) {
  const id = req.params.id;
  Note.findByIdAndDelete(id,
      null,
      function (error, result) {
          if (error) {
              console.log("ERROR: " + error);
              res.status(404).send(error.message);
          } else {
              console.log("Deleted successfully: " + result);
              // Status 204 represents success with no content
              // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/204
              res.sendStatus(204);
          }
      });
});

/*
/notes          - POST   - creates a note
/notes/id?      - GET    - gets the note with the specified ID
                - PUT    - updates the contents of the note
                - DELETE - removes a note
*/

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

port = process.env.PORT || 6001;
app.listen(port, () => { console.log('server started!')});

// const express = require("express");
// const cors = require("cors");
// const  mongoose  = require("mongoose");
// const path = require('path');
// require('dotenv').config({ path: path.resolve(__dirname, './.env') });


// const app = express();
// //app.use(express.static(__dirname));
// const bodyParser = require('body-parser');
// app.use(bodyParser.json());

// const port = process.env.PORT || 6001;

// app.use(cors()); 
// //app.use(express.json());
 
// const uri = process.env.ATLAS_URI; 
// mongoose.connect(uri);

// const connection = mongoose.connection;
// connection.once('open', () => {
  
//   console.log("MongoDB database connection established successfully;");
// })

// const usersRouter = require('./routes/users');
// const notesRouter = require('./routes/notes');

// app.use('/users', usersRouter);
// app.use('/notes', notesRouter);
 
// app.listen(port, () => {
  
//   console.log(`Server is running on port: ${port}`);
// });