import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { TokenOrmEntity } from '../token-orm/token.orm-entity';

@Entity('users', {})
export class UserOrmEntity {
  @PrimaryColumn()
  public id: string;

  @Column()
  public email: string;

  @Column()
  public activation_link: string;

  public get activationLink(): string {
    return this.activation_link;
  }

  @Column()
  public password: string;

  @Column()
  public is_activated: boolean;

  public get isActivated(): boolean {
    return this.is_activated;
  }

  @OneToMany(() => TokenOrmEntity, (token) => token.user)
  public tokens: TokenOrmEntity[];
}
