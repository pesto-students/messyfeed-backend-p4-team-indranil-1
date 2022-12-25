import express from "express";

import { search } from "../controllers/home.js";

const router = express.Router();

//Search for messes in the area
router.get("/search", search);

//Give a review for the mess
router.post("/review");

export default router;
