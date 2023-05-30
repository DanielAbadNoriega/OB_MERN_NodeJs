import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

/**
 *
 * @param { Request }req Original request previous middleware of verification JWT
 * @param { Response } res Response of verification JWT
 * @param { NextFunction } next Next function to be executed
 * @returns Error of verification or next execution
 */
export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Check HEDER from Request for 'x-access-token'
  let token: any = req.headers['x-access-token'];

  // Verify if token is present
  if (!token) {
    return res.status(403).send({
      authenticationError: 'Missing JWT in request',
      message: 'Not authorised to consume this endpoint',
    });
  }

  // Verify the token
  jwt.verify(token, '', (err: any, decoded: any) => {
    if (err) {
      return res.status(500).send({
        authenticationError: 'JWT verification faiiled',
        message: 'Failed to verify JWT token in request',
      });
    }

    // Pass something to next request (id of user || other info)

    // Execute Next Functino -> Protected Routes will be executed
    next();
  });
};
