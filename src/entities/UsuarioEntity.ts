import { UUID } from "crypto";
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import EnumPerfil from "../enums/EnumPerfil.js";

@Entity("usuario")
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
  @CreateDateColumn({ type: "datetime", nullable: false })
  created_at!: Date;

  @UpdateDateColumn({ type: "datetime", nullable: false })
  updated_at!: Date;

  @DeleteDateColumn({ type: "datetime", nullable: true })
  deleted_at?: Date;

  @BeforeInsert()
  setCreateDate() {
    this.created_at = new Date();
    this.updated_at = new Date();
  }

  @BeforeUpdate()
  setUpdateDate() {
    this.updated_at = new Date();
  }
}
