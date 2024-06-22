import express from 'express';
import { createFacility } from './facility.controller';

const router = express.Router();

router.post('/facility', createFacility);

export const FacilityRouter = router;
