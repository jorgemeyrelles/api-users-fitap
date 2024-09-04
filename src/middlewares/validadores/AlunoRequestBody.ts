import { Response, Request, NextFunction } from "express";
import * as yup from "yup";
import { Professor, ProfessorRequestBody } from "../../types/TypeProfessor.js";
import { Usuario, UsuarioRequestBody } from "../../types/TypeUsuario.js";
import { Academia, AcademiaRequestBody } from "../../types/TypeAcademia.js";
import { AlunoRequestBody } from "../../types/TypeAluno.js";

const schemaUsuarioRequestBody: yup.ObjectSchema<UsuarioRequestBody> =
  yup.object({
    id: yup.string().optional(),
    nome: yup.string().defined().required(),
    email: yup.string().defined().email().required(),
    celular: yup.string().defined().required(),
    perfil: yup.number().defined().required(),
    senha: yup.string().required(),
  });

const schemaAcdemiaRequestBody: yup.ObjectSchema<AcademiaRequestBody> =
  yup.object({
    nome: yup.string().defined().required(),
    estado: yup.string().defined().required(),
    cidade: yup.string().defined().required(),
    bairro: yup.string().defined().required(),
  });

const schemaAlunoRequestBody: yup.ObjectSchema<AlunoRequestBody> = yup
  .object({
    usuario: schemaUsuarioRequestBody.required(),
    professor: yup
      .object({
        id: yup.string().required(),
      })
      .required(),
    academia: schemaAcdemiaRequestBody.optional(),
  })
  .required();

const alunoRequestDto = async (
  res: Response,
  req: Request,
  next: NextFunction
) => {
  try {
    await schemaAlunoRequestBody.validate(req.body, { abortEarly: false });
    return next();
  } catch (error) {
    const yupErrors = <yup.ValidationError>error;

    const validationError: Record<string, string> = {};

    yupErrors.inner.forEach((err) => {
      if (!err.path) return;
      validationError[err.path] = err.message;
    });
    return res.status(400).json({ error: validationError });
  }
};

export { alunoRequestDto };
