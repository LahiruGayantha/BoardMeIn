const express = require('express');
const router = express.Router();

const {
  getGuestById,
  updateGuestPic,
  updateGuestUName,
  updateGuestBio,
  updateGuestLocation,
  updatePassword,
} = require('../controllers/guestProfile');

router.get("/profile", getGuestById);
router.put("/updatepic", updateGuestPic);
router.put("/username", updateGuestUName);
router.put("/bio",updateGuestBio);
router.put("/location",updateGuestLocation);
router.put("/password",updatePassword);

module.exports = router;