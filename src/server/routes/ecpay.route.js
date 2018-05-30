import express from 'express';
import ecpayCtrl from '../controllers/ecpay.controller';

const router = express.Router();

// POST表單傳送訂單路徑
router.route('/')
  .post(ecpayCtrl.payment);
// GET方法測試發送訂單路徑
router.route('/get')
  .get(ecpayCtrl.getPayment);
// 付款結果路徑
router.route('/payment/result')
  .post(ecpayCtrl.paymentResult);
// 完成訂單路徑
router.route('/order/result')
  .post(ecpayCtrl.orderResult);
// GET方法查詢訂單
router.route('/queryTradeInfo/:merchantTradeNo')
  .get(ecpayCtrl.tradeInfo);
// POST方法查詢訂單
router.route('/queryTradeInfo/:merchantTradeNo')
  .post(ecpayCtrl.tradeInfo);


export default router;
