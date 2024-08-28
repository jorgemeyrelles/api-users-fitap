import { UUID } from "crypto";
import { TipoAcademia, Academia } from "./TypeAcademia.js";
import AlunoEntity from "../entities/AlunoEntity.js";
import { Usuario } from "./TypeUsuario.js";
import { Professor } from "./TypeProfessor.js";
import ProfessorEntity from "../entities/ProfessorEntity.js";
import UsuarioEntity from "../entities/UsuarioEntity.js";

type TipoAluno = {
  id: UUID;
  professor_id: UUID;
  academia: TipoAcademia;
};

type AlunoRequestBody = Omit<AlunoEntity, "id" | "professor">;
type AlunoResponse = {
  data?: {
    id: AlunoEntity["id"];
    usuario?: Usuario;
    professor?: Professor;
    academia?: Academia;
  };
  error?: unknown;
};

type Aluno = {
  id: AlunoEntity["id"];
  usuario: Usuario;
  professor: Professor;
  academia: Academia;
};

export { TipoAluno, AlunoRequestBody, AlunoResponse, Aluno };
