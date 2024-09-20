import express from 'express';
import { login,loginMentee, registerMentor,registerMentee, sendOTP, verifyOTP} from './authController.js';
import { authenticateToken, getProfileMentee, getProfileMentor, getDashboardMentor, getEditMentor, getDashboardMentee ,registersession,createSession,getSession} from './profileController.js';
import { create } from 'zustand';

const router = express.Router();

router.route('/login').post(login);
router.route('/login-Mentee').post(loginMentee);
router.route('/register-mentor').post(registerMentor);
router.route('/register-mentee').post(registerMentee);

router.route('/sendOTP').post(sendOTP);
router.route('/verify-otp').post(verifyOTP);

router.route('/dashboard-mentee').get(authenticateToken, getDashboardMentee);
router.route('/dashboard-mentor').get(authenticateToken, getDashboardMentor);
router.route('/profile-mentee').get(authenticateToken, getProfileMentee);
router.route('/profile-mentor').get(authenticateToken, getProfileMentor);

router.route('/edit-mentor-profile').post(authenticateToken, getEditMentor);

router.route('/create-session').post(authenticateToken, createSession);
router.route('/get-session').get(authenticateToken, getSession);
router.route('/PostMenteeUsersession').post(registersession);

// router.route('/auth').get(auth);
// router.route('/auth/callback').get(callback);
// router.route('/add-event').post(addevent);

export default router;
