import { Request, Response } from "express";
import * as usersService from "./users.service.js";

export async function list(req: Request, res: Response) {
  const users = await usersService.findAll();
  res.json(users);
}

export async function getOne(req: Request, res: Response) {
  const user = await usersService.findById(Number(req.params.id));
  if (!user) return res.status(404).json({ error: "Usuário não encontrado" });
  res.json(user);
}

export async function create(req: Request, res: Response) {
  const user = await usersService.create(req.body);
  res.status(201).json(user);
}

export async function update(req: Request, res: Response) {
  const user = await usersService.update(Number(req.params.id), req.body);
  if (!user) return res.status(404).json({ error: "Usuário não encontrado" });
  res.json(user);
}

export async function remove(req: Request, res: Response) {
  const removed = await usersService.remove(Number(req.params.id));
  if (!removed) return res.status(404).json({ error: "Usuário não encontrado" });
  res.status(204).send();
}
