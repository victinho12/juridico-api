import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import * as usersController from "./users.controller.js";

const router = Router();

router.get("/", usersController.list);
router.get("/:id", asyncHandler(usersController.getOne));
router.post("/", asyncHandler(usersController.create));
router.put("/:id", asyncHandler(usersController.update));
router.delete("/:id", asyncHandler(usersController.remove));

export default router;
