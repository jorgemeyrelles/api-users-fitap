import ProfessorEntity from "../entities/ProfessorEntity.js";
import UsuarioEntity from "../entities/UsuarioEntity.js";
import { Aluno, AlunoRequestBody } from "./TypeAluno.js";
import { Usuario, UsuarioRequestBody } from "./TypeUsuario.js";

type Professor = {
  id: ProfessorEntity["id"];
  usuario?: Usuario;
  alunos?: Aluno[];
};

type ProfessorRequestBody = {
  usuario?: UsuarioRequestBody;
  alunos?: AlunoRequestBody[];
};
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
