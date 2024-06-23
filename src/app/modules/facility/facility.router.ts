import express from 'express';
import {
  createFacility,
  deleteFacility,
  getAllFacility,
  updateFacility,
} from './facility.controller';
import verifyJWT from '../../middlewares/auth';

const router = express.Router();

router.post('/', verifyJWT('admin'), createFacility);
router.put('/:id', verifyJWT('admin'), updateFacility);
router.delete('/:id', verifyJWT('admin'), deleteFacility);
router.get('/', getAllFacility);

export const FacilityRouter = router;
