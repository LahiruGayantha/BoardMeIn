const express = require('express');
const router = express.Router();

const {
  getOwnerById,
  updateOwnerPic,
  updateOwnerUName,
  updateOwnerBio,
  updateOwnerLocation,
  updatePassword,
} = require('../controllers/ownerProfileCtrl');

router.get("/ownerprofile/:id", getOwnerById);
router.put("/ownerupdatepic", updateOwnerPic);
router.put("/ownerusername", updateOwnerUName);
router.put("/ownerbio",updateOwnerBio);
router.put("/ownerlocation",updateOwnerLocation);
router.put("/ownerpassword",updatePassword);

module.exports = router;