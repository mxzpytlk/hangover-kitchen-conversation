import { GraphQLExecutionContext } from '@nestjs/graphql';
import { Request, Response } from 'express';
import { UserEntity } from 'src/domain/users/entities/user.entity';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type JSObject = Record<string, any>;
export type RedirectType = {
  url: string;
};

type Context = {
  res: Response;
  req: Request;
  user?: UserEntity;
};

export type GQLContext = GraphQLExecutionContext & Context;
