import express from "express";
import * as mhs from "../controllers/mhsController.js";

const router = express.Router();

router.get("/", mhs.getMhs);
router.get("/npm/:npm", mhs.getMhsByNpm);
router.post("/", mhs.createMhs);
router.patch("/:npm", mhs.updateMhs);
router.delete("/:npm", mhs.deleteMhs);

export default router;
