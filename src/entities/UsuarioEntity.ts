import { UUID } from "crypto";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import EnumPerfil from "../enums/EnumPerfil.js";

@Entity()
export default class UsuarioEntity {
  constructor(
    nome: string,
    email: string,
    celular: string,
    perfil: EnumPerfil,
    senha: string
  ) {
    this.nome = nome;
    this.email = email;
    this.celular = celular;
    this.senha = senha;
    this.perfil = perfil;
  }
  @PrimaryGeneratedColumn("uuid")
  id!: UUID;
  @Column({ nullable: false })
  nome: string;
  @Column({ unique: true })
  email: string;
  @Column({ unique: true })
  celular: string;
  @Column({ nullable: false })
  perfil: EnumPerfil;
  @Column({ nullable: false })
  senha: string;
  @CreateDateColumn({ type: "date" })
  created_at!: Date;
  @UpdateDateColumn({ type: "date" })
  updated_at!: Date;
  @DeleteDateColumn({ type: "date" })
  deleted_at!: Date;
}
