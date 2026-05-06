import { Router } from 'express';
import * as headerController from '../controllers/headerController';
import * as educationController from '../controllers/educationController';
import * as workExperienceController from '../controllers/workExperienceController';
import * as skillController from '../controllers/skillController';
import * as languageController from '../controllers/languageController';
import * as interestController from '../controllers/interestController';
import * as certificateController from '../controllers/certificateController';

const router = Router();

// Header Routes
router.get('/api/headers', headerController.getAllHeaders);
router.get('/api/headers/:id', headerController.getHeaderById);
router.post('/api/headers', headerController.createHeader);
router.put('/api/headers/:id', headerController.updateHeader);
router.delete('/api/headers/:id', headerController.deleteHeader);

// Education Routes
router.get('/api/education', educationController.getAllEducation);
router.get('/api/education/:id', educationController.getEducationById);
router.post('/api/education', educationController.createEducation);
router.put('/api/education/:id', educationController.updateEducation);
router.delete('/api/education/:id', educationController.deleteEducation);

// Work Experience Routes
router.get('/api/work-experience', workExperienceController.getAllWorkExperience);
router.get('/api/work-experience/:id', workExperienceController.getWorkExperienceById);
router.post('/api/work-experience', workExperienceController.createWorkExperience);
router.put('/api/work-experience/:id', workExperienceController.updateWorkExperience);
router.delete('/api/work-experience/:id', workExperienceController.deleteWorkExperience);

// Skills Routes
router.get('/api/skills', skillController.getAllSkills);
router.get('/api/skills/:id', skillController.getSkillById);
router.post('/api/skills', skillController.createSkill);
router.put('/api/skills/:id', skillController.updateSkill);
router.delete('/api/skills/:id', skillController.deleteSkill);

// Languages Routes
router.get('/api/languages', languageController.getAllLanguages);
router.get('/api/languages/:id', languageController.getLanguageById);
router.post('/api/languages', languageController.createLanguage);
router.put('/api/languages/:id', languageController.updateLanguage);
router.delete('/api/languages/:id', languageController.deleteLanguage);

// Interests Routes
router.get('/api/interests', interestController.getAllInterests);
router.get('/api/interests/:id', interestController.getInterestById);
router.post('/api/interests', interestController.createInterest);
router.put('/api/interests/:id', interestController.updateInterest);
router.delete('/api/interests/:id', interestController.deleteInterest);

// Certificates Routes
router.get('/api/certificates', certificateController.getAllCertificates);
router.get('/api/certificates/:id', certificateController.getCertificateById);
router.post('/api/certificates', certificateController.createCertificate);
router.put('/api/certificates/:id', certificateController.updateCertificate);
router.delete('/api/certificates/:id', certificateController.deleteCertificate);

export default router;
