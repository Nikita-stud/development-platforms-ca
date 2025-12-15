import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';

export const articleSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title is too long'),
  body: z.string().min(1, 'Body is required'),
  category: z.string().max(100, 'Category is too long'),
});

export function validateArticleData(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const result = articleSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: 'Validation failed',
      details: result.error.issues.map((issue) => issue.message),
    });
  }

  next();
}
