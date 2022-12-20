import express from "express";

const router = express.Router();

//Search for messes in the area
router.get("/search");

//Give a review
router.post("/review");

export default router;
