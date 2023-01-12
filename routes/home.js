import express from "express";

import { addReview, getReviews, search } from "../controllers/home.js";

import { verifyToken } from "../verifyToken.js";

const router = express.Router();

//Search for messes in the area
router.get("/search", search);

//Give a review for the mess
router.post("/review", addReview);

//Get all reviews
router.get("/reviews/:id", getReviews);

export default router;
