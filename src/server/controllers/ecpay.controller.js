import random from 'crypto-string-module';
import moment from 'moment';
import EcpayPayment from 'ecpay-payment';

import ecpayCtrl from '../modules/ecpay.module';


let baseParam = {}; // 訂單資訊初始化
const invParams = {}; // 若要測試開立電子發票，請將inv_params內的"所有"參數取消註解

const initParm = (data) => {
  const merchantTradeNo = random.RandomChar(20); // 亂數產生訂單編號
  const currentDateTime = moment().format('YYYY/MM/DD HH:mm:ss'); // 取得交易時間
  baseParam = {
    MerchantTradeNo: merchantTradeNo, // 請帶20碼uid, ex: f0a0d7e9fae1bb72bc93
    MerchantTradeDate: currentDateTime, // ex: YYYY/MM/DD HH:mm:ss
    TotalAmount: data.total,
    TradeDesc: '綠界第三方支付',
    ItemName: data.item,
    ReturnURL: 'https://ecpay-payment.herokuapp.com/ecpay/payment/result',
    PaymentInfoURL: 'https://ecpay-payment.herokuapp.com/ecpay/order/result', // 當消費者付款完成後，綠界會將付款結果參數以幕後(Server POST)回傳到該網址。
    InvoiceMark: 'Y', // 電子發票開立註記
    // ChoosePayment: 'ALL', // 選擇預設付款方式
    // IgnorePayment: 'CVS#BARCODE', // 隱藏付款方式
    // OrderResultURL: 'https://77733700.ngrok.io/api/ecpay/test', // 付款完成渲染頁面
    // NeedExtraPaidInfo: '1',
    ClientBackURL: `http://localhost:3000/payment/${merchantTradeNo}`, // 付款完成頁面button返回商店網址
    // ItemURL: 'http://item.test.tw',
    Remark: data.note,
    // HoldTradeAMT: '1',
    // StoreID: '',
    CustomField1: data.name,
    CustomField2: data.email,
    CustomField3: data.address,
    CustomField4: data.note,
    EncryptType: '1', // CheckMacValue 加密類型
    ExpireDate: '7' // 允許繳費有效天數
  };
};

// POST 表單建立訂單資訊
const payment = (req, res) => {
  initParm(req.body);
  const create = new EcpayPayment();
  const htm = create.payment_client.aio_check_out_all(baseParam, invParams);
  res.send(htm);
};

// URL GET 建立訂單資訊
const getPayment = (req, res) => {
  initParm(req.query);
  const create = new EcpayPayment();
  const htm = create.payment_client.aio_check_out_all(baseParam, invParams);
  res.send(htm);
};

const paymentResult = (req, res) => {
  console.log('完成');
  // 交易結果, 取得顧客交易詳細資料
  ecpayCtrl.queryTradeInfo(req.body.MerchantTradeNo).then((result) => {
    // 寄送Email
    ecpayCtrl.sendPaymentResult(result);
  });
  res.send('1|OK');
};

const orderResult = (req, res) => {
  // 取得交易資訊
  const orderInfo = req.body;
  // 交易結果, 取得顧客交易詳細資料
  ecpayCtrl.queryTradeInfo(req.body.MerchantTradeNo).then((result) => {
    // 寄送Email
    ecpayCtrl.sendOrderResult(orderInfo, result);
  });
  res.send('1|OK');
};

const tradeInfo = (req, res, next) => {
  // 取得訂單資訊
  ecpayCtrl.queryTradeInfo(req.params.merchantTradeNo).then((result) => {
    res.send(result);
  }).catch((error) => { next(error); }); // 失敗回傳錯誤訊息
};


export default {
  payment,
  getPayment,
  paymentResult,
  orderResult,
  tradeInfo
};
