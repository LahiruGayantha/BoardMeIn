const Comment = require("../models/comment");

exports.addComment = async (req, res, next) => {
  const pId = req.body.pId;
  const gId = req.body.gId;
  const pRating = req.body.pRating;
  const oRating = req.body.oRating;
  const text = req.body.text;

  console.log("id", pId, gId);

  let pRatingKey = "";
  let oRatingKey = "";
  const ratingValue = 1;

  switch (pRating) {
    case 1:
      pRatingKey = "pRatings.one";
      break;
    case 2:
      pRatingKey = "pRatings.two";
      break;
    case 3:
      pRatingKey = "pRatings.three";
      break;
    case 4:
      pRatingKey = "pRatings.four";
      break;
    case 5:
      pRatingKey = "pRatings.five";
      break;
    default:
      pRatingKey = "pRatings.zero";
      pRatingValue = 0;
      break;
  }

  switch (oRating) {
    case 1:
      oRatingKey = "oRatings.one";
      break;
    case 2:
      oRatingKey = "oRatings.two";
      break;
    case 3:
      oRatingKey = "oRatings.three";
      break;
    case 4:
      oRatingKey = "oRatings.four";
      break;
    case 5:
      oRatingKey = "oRatings.five";
      break;
    default:
      oRatingKey = "oRatings.zero";
      break;
  }

  try {
    const propertyData = await Comment.findOne({ _id: pId });
    const currentRate = propertyData.rating;
    const noOfComments = propertyData.comments.length;
    const newRate = (currentRate * noOfComments + pRating) / (noOfComments + 1);
    console.log("data", propertyData);
    const pRate = {};
    pRate[pRatingKey] = ratingValue;
    pRate[oRatingKey] = ratingValue;
    console.log("rat", pRatingKey, ratingValue, pRate);
    await Comment.findByIdAndUpdate(pId, {
      $set: {
        name: "check updatessss",
        rating: newRate,
      },
      $inc: pRate,
      $push: {
        comments: [
          {
            gId: gId,
            pRating: pRating,
            oRating: oRating,
            text: text,
          },
        ],
      },
    });
    res.status(201).json({
      message: "Comment added!",
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.deleteComment = async (req, res, next) => {
  const pId = req.body.pId;
  const commentId = req.body.commentId;
  console.log("ids", pId, commentId);

  try {
    await Comment.findByIdAndUpdate(pId, {
      $pull: { comments: { _id: { $eq: commentId } } },
    });
    res.status(201).json({
      message: "Comment deleted!",
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.addReply = async (req, res, next) => {
  const mongoose = require('mongoose');
  const pId = req.body.pId;
  const commentId = req.body.commentId;
  const reply = req.body.reply;

  try {
    await Comment.updateOne(
      {comments: { $elemMatch: { _id: commentId } }},
      {$push: { "comments.$.replies": reply }},
    );
    const commentsData = await Comment.findById(pId).select("comments");
    res.status(201).json({
      message: "Comment added!",
      data: commentsData,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
  
};