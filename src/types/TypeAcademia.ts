import { UUID } from "crypto";

type TipoAcademia = {
  id: UUID;
  estado: string;
  cidade: string;
  bairro: string;
  nome: string;
};

export default TipoAcademia;
