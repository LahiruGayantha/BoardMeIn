const Owner = require('../models/Owner');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {jwtSecret, jwtExpire} = require('../config/keys');
const express = require('express');
//
exports.getOwnerById = async (req, res) => {
  await Owner.findById({_id: req.params.id}, (err, owner) => {
    if (err) {
      return res.status(400).json({success: false, error: err});
    }

    if (!owner) {
      return res
        .status(404)
        .json({success: false, error: `owner not found`});
    }
    return res.status(200).json({success: true, data: owner});
  })
};

exports.updateOwner = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide details to update',
    });
  }

  owner.findOne({_id: req.params.id}, (err,owner ) => {
    if (err) {
      return res.status(404).json({
        err,
        message: 'owner not found!',
      });
    }
    (owner.owner_id = body.owner_id),
      (owner.firstname = body.firstname),
      (owner.lastname = body.lastname),
      (owner.location = body.location),
      (owner.bio = body.bio),
      (owner.pic = body.pic),
      (owner.email = body.email

        .save()
        .then(() => {
          return res.status(200).json({
            success: true,
            id: owner_id,
            message: 'Property updated!',
          });
        })
        .catch(error => {
          return res.status(404).json({
            error,
            message: 'Property not updated!',
          });
        }));
  });
};

exports.updateOwnerPic = async (req, res) => {
  await Owner.findByIdAndUpdate(
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

exports.updateOwnerUName = async (req, res) => {
  const {firstname, lastname} = req.body;

  if (!firstname && !lastname) {
    return res.status(422).json();
  } else {
    Owner.findByIdAndUpdate(
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

exports.updateOwnerBio = async (req, res) => {
  const {bio} = req.body;

  if (!bio) {
    return res.status(422).json();
  }
  Owner.findByIdAndUpdate(
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

exports.updateOwnerLocation = async (req, res) => {
  const {location} = req.body;

  if (!location) {
    return res.status(422).json();
  }
  Owner.findByIdAndUpdate(
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
  const newPassword = new Owner();

  const salt = await bcrypt.genSalt(10);
  newPassword.password = await bcrypt.hash(password, salt);
  await Owner.findByIdAndUpdate(
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
