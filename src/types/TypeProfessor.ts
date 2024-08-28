import ProfessorEntity from "../entities/ProfessorEntity.js";
import UsuarioEntity from "../entities/UsuarioEntity.js";
import { Aluno } from "./TypeAluno.js";
import { Usuario } from "./TypeUsuario.js";

type Professor = {
  id: ProfessorEntity["id"];
  usuario?: Usuario;
  usuarios?: Usuario[];
};

type ProfessorRequestBody = Omit<ProfessorEntity, "id" | "alunos">;
type ProfessorRequestParams = {
  id?: String;
  idProfessor?: String;
};
type ProfessorResponse = {
  data?: Professor;
  error?: unknown;
};

export {
  Professor,
  ProfessorResponse,
  ProfessorRequestBody,
  ProfessorRequestParams,
};
