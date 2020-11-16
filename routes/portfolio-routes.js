const express = require("express");
const router = express.Router();
const portfolioCtrl = require("../controllers/portfolio-controller");
const { check } = require("express-validator");

router.get("/:pid", portfolioCtrl.getPortfolioById);
router.get("/user/:uid", portfolioCtrl.getUserPortfolioItemById);
router.post(
  "/",
  [check("title").not().isEmpty(), check("description").not().isEmpty()],
  portfolioCtrl.createPortfolioItem
);
router.patch(
  "/:pid",
  [check("title").not().isEmpty(), check("description").not().isEmpty()],
  portfolioCtrl.updatePlace
);
module.exports = router;
