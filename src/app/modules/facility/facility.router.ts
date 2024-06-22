import express from 'express';
import { createFacility, updateFacility } from './facility.controller';
import verifyJWT from '../../middlewares/auth';

const router = express.Router();

router.post('/facility',verifyJWT, createFacility);
router.put('/facility/:id',verifyJWT, updateFacility);

export const FacilityRouter = router;
