import { UUID } from "crypto";
import TipoAcademia from "./TypeAcademia.js";

type TipoAluno = {
  id: UUID;
  professor_id: UUID;
  academia: TipoAcademia;
};

export default TipoAluno;
