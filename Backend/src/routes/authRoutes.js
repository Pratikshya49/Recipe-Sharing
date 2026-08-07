import * as AuthController from '../controllers/authController.js'
import {Router} from 'express'
import authenticate from '../middleware/authenticate.js'

const router = Router ()

router.post('/register',AuthController.registerUser)
router.post('/login',AuthController.loginUser)
router.get('/me', authenticate, AuthController.getCurrentUser)
router.get('/bookmarks', authenticate, AuthController.getBookmarks)
router.post('/bookmarks/toggle', authenticate, AuthController.toggleBookmark)
router.post('/logout', AuthController.logoutUser)

export default router
