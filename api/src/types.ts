import type { Request } from 'express';
import type { JwtPayload } from 'jsonwebtoken';

export interface GeneralReturn<T> {
  result?: Partial<T>;
}

export interface TODORequest extends Request {
  user: JwtPayload;
}
