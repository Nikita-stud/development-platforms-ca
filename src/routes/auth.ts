import { Router } from 'express';
import { pool } from '../database';
import { ResultSetHeader } from 'mysql2';
import { UserResponse, User } from '../interface/interface';
import { validateRequiredUserData } from '../middleware/validation';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/jwt';

const router = Router();

router.post('/register', validateRequiredUserData, async (req, res) => {
  try {
    const { email, password } = req.body;

    const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [
      email,
    ]);
    const existingUsers = rows as User[];

    if (existingUsers.length > 0) {
      return res.status(400).json({
        error: 'User already exists with that email or username',
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const [result]: [ResultSetHeader, any] = await pool.execute(
      'INSERT INTO users (email, password_hash) VALUES (?,?)',
      [email, hashedPassword]
    );

    const userResponse: UserResponse = {
      id: result.insertId,
      email,
      created_at: new Date(),
    };
    res.status(201).json({
      message: 'User registered successfully',
      user: userResponse,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to register' });
  }
});

router.post('/login', validateRequiredUserData, async (req, res) => {
  try {
    const { email, password } = req.body;

    const [rows] = await pool.execute(
      'SELECT id, email, password_hash, created_at FROM users WHERE email = ?',
      [email]
    );

    const users = rows as User[];

    if (users.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = users[0];
    const validPassword = await bcrypt.compare(password, user.password_hash);

    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const token = generateToken(user.id);

    const userResponse: UserResponse = {
      id: user.id,
      email: user.email,
      created_at: user.created_at,
    };

    res.json({
      message: 'Login successful',
      user: userResponse,
      token,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to log in' });
  }
});

export default router;
