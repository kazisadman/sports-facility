import express from 'express';
import { loginUser } from './auth.controller';
import { createUser } from '../user/user.controller';

const router = express.Router();

router.post('/login', loginUser);
router.post('/signup', createUser);


export const AuthRouter = router;
