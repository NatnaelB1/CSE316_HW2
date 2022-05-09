const express = require('express');
const router = express.Router();
const User = require('../user_model');
const {wrapAsync} = require('../utils/helper');


// Multer is middleware for multipart form data: https://www.npmjs.com/package/multer
const multer = require('multer');
// This part is a temporary place to store the uploaded files
// In actual development we would not store it on the local server
const upload = multer({dest: 'uploads/'})

// upload.single('image') tells it we are only uploading 1 file, and the file was named "image" on the front end client.
router.post('/users/:id/file', upload.single('image'), wrapAsync(async function (req, res) {
    // You can see the file details here – it also gets automatically saved into the uploads folder
    // Again, this is an example of how this works but you would do something a little different in production.
    console.log("File uploaded of length: " + req.file.size);
    console.dir(req.file);
    res.json("File uploaded successfully");
}));


router.post('/register', wrapAsync(async function (req, res) {
    const {userpassword, useremail, username, usercolor} = req.body;
    const user = new User({useremail, userpassword, username, usercolor})
    await user.save();
    req.session.userId = user._id;
    // Note: this is returning the entire user object to demo, which will include the hashed and salted password.
    // In practice, you wouldn't typically do this – a success status would suffice, or perhaps just the user id.
    res.json(user);
}));

router.post('/login', wrapAsync(async function (req, res) {
    const {userpassword, useremail} = req.body;
    const user = await User.findAndValidate(useremail, userpassword);
    if (user) {
        req.session.userId = user._id;
        res.sendStatus(204);
        console.log("Succesfully logged in!");
    } else {
        console.log("wrong Password/Email")
        res.sendStatus(401);
    }
}));

router.post('/logout', wrapAsync(async function (req, res) {
    req.session.userId = null;
    console.log("Succesfully logged out!");
    res.sendStatus(204);
}));


// router.get('/', async function (req,res) {
//     const users = await User.find({});
//     res.json(users[0]);
// });

// router.post('users/add', async function (req,res) {
//   console.log("Posted with body: " + JSON.stringify(req.body));

//   const newUser = new User({
//       username : req.body.username,
//       useremail : req.body.useremail,
//       usercolor : req.body.usercolor,
//       userpassword: req.body.userpassword,
//   });
//   await newUser.save();
//   res.json(newUser);
// });

// router.put('users/:id', async function (req,res) {
//   let id = req.params.id;
//   console.log("PUT with id: " + id + ", body: " + JSON.stringify(req.body));
//   // This below method automatically saves it to the database
//   User.findByIdAndUpdate(id,
//       {'username': req.body.username, "useremail": req.body.useremail, "usercolor": req.body.usercolor, "userpassword": req.body.userpassword},
//       function (err, result) {
//           if (err) {
//               console.log("ERROR: " + err);
//               res.send(err);
//           } else {
//               // Status 204 represents success with no content
//               // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/204
//               res.sendStatus(204);
//           }
//       });
// });
// router.delete('users/:id', async function (req,res) {
//     const id = req.params.id;
//     User.findByIdAndDelete(id,
//         null,
//         function (error, result) {
//             if (error) {
//                 console.log("ERROR: " + error);
//                 res.status(404).send(error.message);
//             } else {
//                 console.log("Deleted successfully: " + result);
//                 // Status 204 represents success with no content
//                 // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/204
//                 res.sendStatus(204);
//             }
//         });
//   });


module.exports = router;