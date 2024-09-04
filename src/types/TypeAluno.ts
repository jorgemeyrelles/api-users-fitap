import { UUID } from "crypto";
import { TipoAcademia, Academia, AcademiaRequestBody } from "./TypeAcademia.js";
import AlunoEntity from "../entities/AlunoEntity.js";
import { Usuario, UsuarioRequestBody } from "./TypeUsuario.js";
import { Professor } from "./TypeProfessor.js";

type TipoAluno = {
  id: UUID;
  professor_id: UUID;
  academia: TipoAcademia;
};

type AlunoRequestBody = {
  usuario?: UsuarioRequestBody;
  professor?: Pick<Professor, "id" | "usuario"> | { id: String };
  academia?: AcademiaRequestBody;
};
type AlunoResponse = {
  data?: Aluno;
  error?: unknown;
};

type Aluno = {
  id: AlunoEntity["id"];
  usuario: Usuario;
  professor?: Omit<Professor, "alunos">;
  academia: Academia;
};

export { TipoAluno, AlunoRequestBody, AlunoResponse, Aluno };
