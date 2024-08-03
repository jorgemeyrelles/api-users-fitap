import { UUID } from "crypto";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class AcademiaEntity {
  constructor(nome: string, estado: string, cidade: string, bairro: string) {
    this.nome = nome;
    this.estado = estado;
    this.cidade = cidade;
    this.bairro = bairro;
  }
  @PrimaryGeneratedColumn("uuid")
  id!: UUID;
  @Column()
  nome: string;
  @Column()
  estado: string;
  @Column()
  cidade: string;
  @Column()
  bairro: string;
}
