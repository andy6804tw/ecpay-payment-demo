import express from 'express';
import ecpayCtrl from '../controllers/ecpay.controller';

const router = express.Router();

router.route('/')
  .get(ecpayCtrl.payment);


export default router;
