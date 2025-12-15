import { Router } from 'express';
import { pool } from '../database';
import { Article } from '../interface/interface';
import { authenticateToken } from '../middleware/auth-validation';
import { validateArticleData } from '../middleware/article-validation';
import { ResultSetHeader } from 'mysql2';

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

/**
 * @swagger
 * /articles:
 *   post:
 *     summary: Create a new article (requires authentication)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               body:
 *                 type: string
 *               category:
 *                 type: string
 *     responses:
 *       201:
 *         description: Article created successfully
 *       401:
 *         description: Unauthorized
 */
router.post('/', authenticateToken, validateArticleData, async (req, res) => {
  try {
    const { title, body, category } = req.body;
    const submitted_by = req.user!.id;

    const [result]: [ResultSetHeader, any] = await pool.execute(
      'INSERT INTO articles (title, body, category, submitted_by) VALUES (?, ?, ?, ?)',
      [title, body, category, submitted_by]
    );

    const article: Article = {
      id: result.insertId,
      title,
      body,
      category,
      submitted_by,
      created_at: new Date(),
    };

    res.status(201).json({
      message: 'Article created successfully',
      article,
    });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Failed to create article' });
  }
});

export default router;
