const express = require("express");
const router = express.Router();
const {
  getCompanies,
  createCompany,
  getCompanyById,
  updateCompany,
  deleteCompany,
} = require("../controllers/companiesController");

// Company routes
router.get("/", getCompanies);
router.post("/", createCompany);
router.get("/:id", getCompanyById);
router.put("/:id", updateCompany);
router.delete("/:id", deleteCompany);

module.exports = router;
