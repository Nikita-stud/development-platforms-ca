import { Request, Response, NextFunction } from 'express';
import { requiredUserDataSchema } from './user-validation';

export function validateRequiredUserData(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const result = requiredUserDataSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: 'Email and password are required',
      details: result.error.issues.map((issue) => issue.message),
    });
  }

  next();
}
