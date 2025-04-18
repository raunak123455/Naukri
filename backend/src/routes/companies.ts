import { Router } from "express";
import {
  getCompanies,
  createCompany,
  getCompanyById,
  updateCompany,
  deleteCompany,
} from "../controllers/companiesController";

const router = Router();

// Company routes
router.get("/", getCompanies);
router.post("/", createCompany);
router.get("/:id", getCompanyById);
router.put("/:id", updateCompany);
router.delete("/:id", deleteCompany);

export default router;
