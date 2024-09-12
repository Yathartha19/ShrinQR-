import express from "express";
import { createShort, deleteShort, getShort, updateShort, getUnShort, getCheck } from "../controllers/shortnener.controller.js";

const router = express.Router();

router.post("/api/short/create", createShort);

router.delete("/api/short/delete/:id", deleteShort);

router.put("/api/short/update/:id", updateShort);

router.post("/api/short/checker", getCheck);

router.get("/api/short/unshort/:id", getUnShort);

router.get("/:id", getShort)

export default router