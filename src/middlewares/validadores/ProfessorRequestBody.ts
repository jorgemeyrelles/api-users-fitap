import { Response, Request, NextFunction } from "express";
import * as yup from "yup";
import { ProfessorRequestBody } from "../../types/TypeProfessor.js";
import { UsuarioRequestBody } from "../../types/TypeUsuario.js";
import { AcademiaRequestBody } from "../../types/TypeAcademia.js";
import { pt } from "yup-locale-pt";
import { regex } from "../../utils/constates.js";

yup.setLocale(pt);

const schemaUsuarioRequestBody: yup.ObjectSchema<UsuarioRequestBody> =
  yup.object({
    id: yup.string().optional(),
    nome: yup.string().defined().required(),
    email: yup.string().defined().email().required(),
    celular: yup
      .string()
      .defined()
      .matches(regex.celular.code, regex.celular.message)
      .required(),
    perfil: yup.number().defined().required(),
    senha: yup
      .string()
      .matches(regex.senha.code, regex.senha.message)
      .required(),
  });

const schemaAcdemiaRequestBody: yup.ObjectSchema<AcademiaRequestBody> =
  yup.object({
    nome: yup.string().defined().required(),
    estado: yup.string().defined().required(),
    cidade: yup.string().defined().required(),
    bairro: yup.string().defined().required(),
  });

const schemaProfessorRequestBody: yup.ObjectSchema<ProfessorRequestBody> = yup
  .object({
    usuario: schemaUsuarioRequestBody.required(),
    alunos: yup
      .array()
      .of(
        yup.object({
          usuario: schemaUsuarioRequestBody,
          academia: schemaAcdemiaRequestBody,
        })
      )
      .optional(),
  })
  .required();

const professorRequestDto = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await schemaProfessorRequestBody.validate(req.body, { abortEarly: false });
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

export { professorRequestDto };
