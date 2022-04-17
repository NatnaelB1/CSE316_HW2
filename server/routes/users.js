
// const router = require('express').Router();
// let User = require('../user_model.js');

// router.route('/').get((req, res) => {
//     //res.send("HHHHHH");
//     User.find()
//         .then(users => res.json(users))
//         .catch(err => res.status(400).json('Error: ' + err));
// });


// router.route('/add').post((res,req) => {
//     console.log("was here");
//     console.log("Posted with body: " + JSON.stringify(req.body));
//     const newUser = new User({
//         username : req.body.username,
//         useremail : req.body.useremail,
//         usercolor : req.body.usecolor,
//     });
    
//     newUser.save()
//         .then(() => res.json('User added!'))
//         .catch(err => res.status(400).json('Error: ' + err));
// });

// router.route('/*').get((req, res) => {
//     res.send("Nothing here");
//  })

// module.exports = router;