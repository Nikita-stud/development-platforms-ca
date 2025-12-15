import { Router } from 'express';
import { pool } from '../database';
import { Article } from '../interface/interface';

const router = Router();

/**
 * @swagger
 * /articles:
 *   get:
 *     summary: Get all articles
 *     responses:
 *       200:
 *         description: List of articles ordered date of creation
 */
router.get('/', async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const [rows] = await pool.execute(
      'SELECT * FROM articles ORDER BY created_at DESC LIMIT ? OFFSET ?',
      [limit.toString(), offset.toString()]
    );
    const result = rows as Article[];

    res.status(200).json(result);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
});

export default router;
