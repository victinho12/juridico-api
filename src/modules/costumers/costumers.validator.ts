import {RequestHandler} from "express";
import { StatusCodes } from "http-status-codes";
import {bodyValidationUpdate, bodyValidationCreate} from './costumers.squema.js'
import * as yup from "yup";
import { YupErrors } from "../../middlewares/yupError.js";

export const createValidator: RequestHandler = async (req, res, next) =>{
    try{
        const validatedBody = await bodyValidationCreate.validate(req.body, {
    stripUnknown: true,
    abortEarly: false,
  });
    req.body = validatedBody;
    next();
    }
    catch (err) {
    if (err instanceof yup.ValidationError) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Erro de validação",
        errors: YupErrors(err)
        ,
      });
    }
    return res.status(StatusCodes.BAD_REQUEST).json({ errors: ["Dados inválidos"] });
  }
    
}

// costumer.validator.ts
export const updateValidator: RequestHandler = async (req, res, next) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: "ID inválido" });
  }
  
  if(!req.body || Object.keys(req.body).length === 0){
    return res.status(StatusCodes.BAD_REQUEST).json({error: "Nenhum campo enviado para atualização"});
  }
  const validatedBody = await bodyValidationUpdate.validate(req.body, {
    stripUnknown: true,
    abortEarly: false,
  });

  if (Object.keys(validatedBody).length === 0) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: "Nenhum campo válido enviado para atualização" });
  }

  req.body = validatedBody; // sobrescreve com o valor limpo
  next();
};