import { UUID } from "crypto";
import EnumPerfil from "../enums/EnumPerfil.js";
import UsuarioEntity from "../entities/UsuarioEntity.js";

type UsuarioRequestParams = {
  idAluno?: String;
  id?: String;
};

type Usuario = Pick<
  UsuarioEntity,
  "id" | "nome" | "email" | "celular" | "perfil"
>;

type UsuarioRequestBody = Pick<
  UsuarioEntity,
  "id" | "nome" | "email" | "celular" | "perfil"
>;

export { UsuarioRequestParams, Usuario, UsuarioRequestBody };
