import express from "express";
import { getDucks, addDuck } from "./duckController";

const router = express.Router();

router.get("/", getDucks);
router.post("/", addDuck);

export default router;
