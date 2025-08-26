
import { Router } from 'express';
import UserController from '../controllers/UserController';
import { body } from 'express-validator';

const router = Router();

router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);
/**
 * @openapi
 * /users:
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created
 *       400:
 *         description: Validation error
 */
router.post(
	'/',
	[
		body('name').isString().notEmpty(),
		body('email').isEmail(),
		body('password').isLength({ min: 6 })
	],
	UserController.createUser
);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

export default router;
