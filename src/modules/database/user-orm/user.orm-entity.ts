import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { TokenOrmEntity } from '../token-orm/token.orm-entity';

@Entity('users', {})
export class UserOrmEntity {
  @PrimaryColumn()
  public id: string;

  @Column()
  public email: string;

  @Column({
    name: 'activation_link',
  })
  public activationLink: string;

  @Column()
  public password: string;

  @OneToMany(() => TokenOrmEntity, (token) => token.user)
  public tokens: TokenOrmEntity[];
}
