import express from 'express';
import { login, register, sendOTP, verifyOTP} from './authController.js';
import { authenticateToken, getProfileMentee, getProfileMentor, getDashboardMentor, getEdit, getDashboardMentee } from './profileController.js';

const router = express.Router();

router.route('/login').post(login);
router.route('/register').post(register);

router.route('/sendOTP').post(sendOTP);
router.route('/verify-otp').post(verifyOTP);

router.route('/dashboard-mentee').get(authenticateToken, getDashboardMentee);
router.route('/dashboard-mentor').get(authenticateToken, getDashboardMentor);
router.route('/profile-mentee').get(authenticateToken, getProfileMentee);
router.route('/profile-mentor').get(authenticateToken, getProfileMentor);

router.route('/edit').post(authenticateToken, getEdit);

// router.route('/auth').get(auth);
// router.route('/auth/callback').get(callback);
// router.route('/add-event').post(addevent);

export default router;
