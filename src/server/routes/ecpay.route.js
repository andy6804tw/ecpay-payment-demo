import express from 'express';
import ecpayCtrl from '../controllers/ecpay.controller';

const router = express.Router();

router.route('/')
  .post(ecpayCtrl.payment);

router.route('/get')
  .get(ecpayCtrl.getPayment);

router.route('/result')
  .post(ecpayCtrl.result);


export default router;
