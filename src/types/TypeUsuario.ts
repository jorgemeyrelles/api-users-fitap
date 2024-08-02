import { UUID } from "crypto";
import EnumPerfil from "../enums/EnumPerfil.js";

type TipoUsuario = {
  id: UUID;
  nome: string;
  senha: string;
  email: string;
  perfil: EnumPerfil;
};

export default TipoUsuario;
