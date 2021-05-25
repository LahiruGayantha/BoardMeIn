const express = require('express');
const router = express.Router();

const {
  getGuestById,
  updateGuest,
  updateGuestPic,
  updateGuestUName,
  updateGuestBio,
  updateGuestLocation,
  updatePassword,
} = require('../controllers/guestProfile');

router.get("/:id", getGuestById);
router.put("/update/:id", updateGuest)
router.put("/updatepic", updateGuestPic);
router.put("/username", updateGuestUName);
router.put("/bio",updateGuestBio);
router.put("/location",updateGuestLocation);
router.put("/password",updatePassword);

module.exports = router;