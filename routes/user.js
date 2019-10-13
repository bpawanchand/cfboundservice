const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const MovieUser = require('../model/MovieUser');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

//  @route      POST user
//  @desc       To register user
//  @access     Public
router.post(
  '/register',
  [
    check('fname', 'First name is required.')
      .not()
      .isEmpty(),
    check('lname', 'Last name is required.')
      .not()
      .isEmpty(),
    check('email', 'Email is required.')
      .not()
      .isEmpty(),
    check('email', 'Enter a valid Email ID.').isEmail(),
    check('password', 'Password is required')
      .not()
      .isEmpty(),
    check('password', 'Enter a password of 8 or more characters').isLength({
      min: 8
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { fname, lname, email, password } = req.body;
    try {
      let user = await MovieUser.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User Already exists' }] });
      }
      user = new MovieUser({ fname, lname, email, password });
      const salt = await bcryptjs.genSalt(10);
      user.password = await bcryptjs.hash(password, salt);
      await user.save();

      const payload = {
        MovieUser: {
          id: user.id
        }
      };
      const token = jwt.sign(
        payload,
        'MovieUserToken',
        { expiresIn: 3600000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.log(error.message);
      res
        .status(500)
        .json({ errors: [{ msg: 'Server error from User Post' }] });
    }
  }
);

//  @Route      GET User
//  @Desc       To read the User Profile
//  @Access     Public

router.get('/getuser', [], async (req, res) => {
  res.status(200).send({
    message: ' User Profile read'
  });
});

//  Export Router

module.exports = router;
