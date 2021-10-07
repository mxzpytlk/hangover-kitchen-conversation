/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { GraphQLExecutionContext } from '@nestjs/graphql';
import { Request, Response } from 'express';
import { UserEntity } from 'src/domain/users/entities/user.entity';

type JSObjectValue = JSObject | boolean | string | number | undefined | null;
export interface JSObject {
  [key: string]: JSObjectValue;
}

export type RedirectType = {
  url: string;
};

type Context = {
  res: Response;
  req: Request;
  connectionParams: {
    authorization: string;
  };
  user?: UserEntity;
};

export type GQLContext = GraphQLExecutionContext & Context;

export type JsTypeMapping = {
  string: string;
  object: object;
  number: number;
  bigint: BigInt;
  boolean: boolean;
  symbol: Symbol;
  undefined: undefined;
  function: (...args: any[]) => any;
};

export type JsTypeName = keyof JsTypeMapping;
export type JsType = JsTypeMapping[JsTypeName];
