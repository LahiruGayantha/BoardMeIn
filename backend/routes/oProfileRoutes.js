const express = require('express');
const router = express.Router();

const {
  getOwnerById,
  updateOwner,
  updateOwnerPic,
  updateOwnerUName,
  updateOwnerBio,
  updateOwnerLocation,
  updatePassword,
} = require('../controllers/ownerProfile');

router.get("/:id", getOwnerById);
router.put("/update",updateOwner);
router.put("/updatepic", updateOwnerPic);
router.put("/username", updateOwnerUName);
router.put("/bio",updateOwnerBio);
router.put("/location",updateOwnerLocation);
router.put("/password",updatePassword);

module.exports = router;