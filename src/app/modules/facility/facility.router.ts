import express from 'express';
import {
  createFacility,
  deleteFacility,
  getAllFacility,
  updateFacility,
} from './facility.controller';
import verifyJWT from '../../middlewares/auth';

const router = express.Router();

router.post('/', verifyJWT, createFacility);
router.put('/:id', verifyJWT, updateFacility);
router.delete('/:id', verifyJWT, deleteFacility);
router.get('/', getAllFacility);

export const FacilityRouter = router;
