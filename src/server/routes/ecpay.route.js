import express from 'express';
import ecpayCtrl from '../controllers/ecpay.controller';

const router = express.Router();

router.route('/')
  .post(ecpayCtrl.payment);

router.route('/get')
  .get(ecpayCtrl.getPayment);

router.route('/results')
  .post(ecpayCtrl.results);

router.route('/queryTradeInfo/:merchantTradeNo')
  .get(ecpayCtrl.tradeInfo);

router.route('/queryTradeInfo/:merchantTradeNo')
  .post(ecpayCtrl.tradeInfo);

router.route('/test')
  .post(ecpayCtrl.test);


export default router;
