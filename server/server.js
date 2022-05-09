
const express = require('express'); 
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo'); // MongoDB session store
//const User = require('./user_model.js');
//const Note = require('./note_model.js');
const Note = require('./routes/notes');
const User = require('./routes/users');

const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const sessionSecret = 'i made a secret string';

//Set up mongoose connection
var dbURL = "mongodb+srv://natnaelbereda:IosADnkyBdQsXluK@cse316hw3.yfcv9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"; // insert your database URL here
mongoose.connect(dbURL, { useNewUrlParser: true , useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

 // Create Mongo DB Session Store
const store = MongoStore.create({
    mongoUrl: dbURL,
    secret: sessionSecret,
    touchAfter: 24 * 60 * 60
})

// Setup to use the express-session package
const sessionConfig = {
    store,
    name: 'session',
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
        // later you would want to add: 'secure: true' once your website is hosted on HTTPS.
    }
}

app.use(session(sessionConfig));

// This is middleware that will run before every request
app.use((req, res, next) => {
    // We can set variables on the request, which we can then access in a future method
    req.requestTime = Date.now();
    console.log(req.method, req.path);
    // Calling next() makes it go to the next function that will handle the request
    next();
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.use('/', User);
app.use('/', Note);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.use((err, req, res, next) => {
    console.log("Error handling called");
    // If want to print out the error stack, uncomment below
    // console.error(err.stack)
    // Updating the statusMessage with our custom error message (otherwise it will have a default for the status code).
    res.statusMessage = err.message;

    if (err.name === 'ValidationError') {
        res.status(400).end();
    } else {
        // We could further interpret the errors to send a specific status based more error types.
        res.status(500).end();
    }
})

port = process.env.PORT || 6001;
app.listen(port, () => { console.log('server started!')});


/*

// Using an async function to be able to use the "await" functionality below, which makes
// the find command run synchronously.
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/users', async function (req,res) {
    const users = await User.find({});
    res.json(users[0]);
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
app.delete('/users/:id', async function (req,res) {
    const id = req.params.id;
    User.findByIdAndDelete(id,
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
  

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/notes', async function (req,res) {
  console.log("Posted with body: " + JSON.stringify(req.body));

  const newNote = new Note({
      id: Number(req.body.id), 
      forsort: Number(req.body.forsort), 
      notebody: req.body.notebody,
      lastModified: req.body.lastModified,
      note_tag: req.body.note_tag 
    });
  
  await newNote.save();
  res.json(newNote);
});

app.get('/notes', async function (req,res) {
  let notes = await Note.find({});
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

  console.log("No note with id: " + id);
  res.status(404);
  res.send("No note with id: " + id);
});

app.put('/notes/:id', async function (req,res) {
  let myid = req.params.id;
    console.log("PUT with id: " + myid + ", body: " + JSON.stringify(req.body));
    // This below method automatically saves it to the database
    Note.updateOne({id:myid},
        {'id': Number(req.body.id), "forsort": Number(req.body.forsort), "notebody": req.body.notebody, "lastModified": req.body.lastModified, "note_tag" : req.body.note_tag  },
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
  const myid = req.params.id;
  Note.remove({id:myid},
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


//*/