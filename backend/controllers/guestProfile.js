const Guest = require('../models/Guest');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {jwtSecret, jwtExpire} = require('../config/keys');
const express = require('express');
//
exports.getGuestById = async (req, res) => {
  await Guest.findById({_id: req.params.id}, (err, guest) => {
    if (err) {
      return res.status(400).json({success: false, error: err});
    }

    if (!guest) {
      return res.status(404).json({success: false, error: `Guest not found`});
    }
    return res.status(200).json({success: true, data: guest});
  });
};

exports.updateGuest = async (req, res) => {
  const body = req.body;
  Guest.updateOne(
    {_id: req.params.id},
 
  );
};

exports.updateGuestPic = async (req, res) => {
  await Guest.findByIdAndUpdate(
    req.user._id,
    {$set: {pic: req.body.pic}},
    {new: true},
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({error: err});
    } else {
      res.json(result);
    }
  });
};

exports.updateGuestUName = async (req, res) => {
  const {firstname, lastname} = req.body;

  if (!firstname && !lastname) {
    return res.status(422).json();
  } else {
    Guest.findByIdAndUpdate(
      req.user._id,
      {$set: {firstname: req.body.firstname, lastname: req.body.lastname}},

      {
        new: true,
      },
    ).exec((err, result) => {
      if (err) {
        return res.status(422).json({error: err});
      } else {
        res.json(result);
      }
    });
  }
};

exports.updateGuestBio = async (req, res) => {
  const {bio} = req.body;

  if (!bio) {
    return res.status(422).json();
  }
  Guest.findByIdAndUpdate(
    req.user._id,
    {$set: {bio: req.body.bio}},

    {
      new: true,
    },
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({error: err});
    } else {
      res.json(result);
    }
  });
};

exports.updateGuestLocation = async (req, res) => {
  const {location} = req.body;

  if (!location) {
    return res.status(422).json();
  }
  Guest.findByIdAndUpdate(
    req.user._id,
    {$set: {location: req.body.location}},

    {
      new: true,
    },
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({error: err});
    } else {
      res.json(result);
    }
  });
};

exports.updatePassword = async (req, res) => {
  const {password, password2} = req.body;

  if (!equals(password, password2)) {
    return res.status(422).json();
  }
  // } else if (isLength({ min: 6 })) {
  //   return res.status(423).json();
  // }
  const newPassword = new Guest();

  const salt = await bcrypt.genSalt(10);
  newPassword.password = await bcrypt.hash(password, salt);
  await Guest.findByIdAndUpdate(
    req.user._id,
    {$set: {password: newPassword.password}},

    {
      new: true,
    },
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({error: err});
    } else {
      res.json(result);
    }
  });
};
