import { Router } from "express";
import * as controller from "./hearings.controller.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import * as validator from "./hearings.validator.js";

const router = Router();

// TODO: implementar seguindo o padrão do módulo users
router.get("/", asyncHandler(controller.findAll));
router.post(
  "/",
  asyncHandler(validator.createValidator),
  asyncHandler(controller.create),
);
router.put("/:id", asyncHandler(validator.updateValidator), asyncHandler(controller.update));
//   GET    /process/:id         -> listar audiências de um processo
//   GET    /:id                 -> buscar uma audiência
//   PUT    /:id                 -> atualizar audiência
//   DELETE /:id                 -> remover audiência

export default router;
