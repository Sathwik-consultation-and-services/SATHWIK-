import express from "express";
import {
  createAssociate,
  createSection,
  deleteAssociate,
  deleteSection,
  getAboutAdmin,
  getAboutPublic,
  reorderAbout,
  updateAboutPage,
  updateAssociate,
  updateSection,
  updateVisibility,
} from "./controllers.js";

const router = express.Router();

router.get("/get", getAboutPublic);
router.get("/admin", getAboutAdmin);
router.put("/update", updateAboutPage);
router.put("/reorder", reorderAbout);
router.post("/sections", createSection);
router.put("/sections/:id", updateSection);
router.delete("/sections/:id", deleteSection);
router.put("/sections/:id/visibility", updateVisibility);
router.post("/associates", createAssociate);
router.put("/associates/:id", updateAssociate);
router.delete("/associates/:id", deleteAssociate);

export default router;
