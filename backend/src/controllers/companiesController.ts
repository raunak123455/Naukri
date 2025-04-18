import { Request, Response } from "express";
import Company from "../models/Company";

// Get all companies
export const getCompanies = async (req: Request, res: Response) => {
  try {
    const companies = await Company.find();
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ message: "Error fetching companies", error });
  }
};

// Create a new company
export const createCompany = async (req: Request, res: Response) => {
  try {
    const company = new Company(req.body);
    await company.save();
    res.status(201).json(company);
  } catch (error) {
    res.status(400).json({ message: "Error creating company", error });
  }
};

// Get company by ID
export const getCompanyById = async (req: Request, res: Response) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ message: "Error fetching company", error });
  }
};

// Update company
export const updateCompany = async (req: Request, res: Response) => {
  try {
    const company = await Company.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    res.status(200).json(company);
  } catch (error) {
    res.status(400).json({ message: "Error updating company", error });
  }
};

// Delete company
export const deleteCompany = async (req: Request, res: Response) => {
  try {
    const company = await Company.findByIdAndDelete(req.params.id);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    res.status(200).json({ message: "Company deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting company", error });
  }
};
