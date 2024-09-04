import { UUID } from "crypto";
import AcademiaEntity from "../entities/AcademiaEntity.js";

type TipoAcademia = {
  id: UUID;
  estado: string;
  cidade: string;
  bairro: string;
  nome: string;
};

type Academia = Pick<
  AcademiaEntity,
  "id" | "nome" | "estado" | "cidade" | "bairro"
>;
type AcademiaRequestBody = Pick<
  AcademiaEntity,
  "nome" | "estado" | "cidade" | "bairro"
>;
type AcademiaResponse = {
  data?: Pick<AcademiaEntity, "id" | "nome" | "estado" | "cidade" | "bairro">;
};

export { TipoAcademia, Academia, AcademiaResponse, AcademiaRequestBody };
