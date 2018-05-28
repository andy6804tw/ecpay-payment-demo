import ecpayCtrl from '../modules/ecpay.module';

const random = require('crypto-string-module');
const moment = require('moment');

// 交易訊息
let bodyData;

/**
 * Created by ying.wu on 2017/6/27.
 */
const EcpayPayment = require('ecpay-payment');
// 參數值為[PLEASE MODIFY]者，請在每次測試時給予獨特值
// 若要測試非必帶參數請將base_param內註解的參數依需求取消註解 //
let baseParam = {};
// 若要測試開立電子發票，請將inv_params內的"所有"參數取消註解 //
const invParams = {};
// 時間
const currentDateTime = moment().format('YYYY/MM/DD HH:mm:ss');
const initParm = (data) => {
  // 亂數產生訂單編號
  const merchantTradeNo = random.RandomChar(20);
  baseParam = {
    MerchantTradeNo: merchantTradeNo, // 請帶20碼uid, ex: f0a0d7e9fae1bb72bc93
    MerchantTradeDate: currentDateTime, // ex: YYYY/MM/DD HH:mm:ss
    TotalAmount: data.total,
    TradeDesc: 'Quapni前打輪系列',
    ItemName: data.item,
    ReturnURL: 'https://ecpay-payment.herokuapp.com/api/ecpay/results', // 當消費者付款完成後，綠界會將付款結果參數以幕後(Server POST)回傳到該網址。
    InvoiceMark: 'Y', // 電子發票開立註記
    // ChoosePayment: 'ALL', // 選擇預設付款方式
    // IgnorePayment: 'CVS#BARCODE', // 隱藏付款方式
    // OrderResultURL: 'https://77733700.ngrok.io/api/ecpay/test', // 付款完成渲染頁面
    // NeedExtraPaidInfo: '1',
    ClientBackURL: `https://quapni.com/payment/${merchantTradeNo}`, // 付款完成頁面button返回商店網址
    // ItemURL: 'http://item.test.tw',
    Remark: '交易備註',
    // HoldTradeAMT: '1',
    // StoreID: '',
    CustomField1: data.name,
    CustomField2: data.email,
    CustomField3: data.address,
    // CustomField4: data.item,
    EncryptType: '1', // CheckMacValue 加密類型
    ExpireDate: '7' // 允許繳費有效天數
  };
};


const payment = (req, res) => {
  // initParm(req.query.total, req.query.item);
  bodyData = req.body;
  initParm(bodyData);
  const create = new EcpayPayment();
  const htm = create.payment_client.aio_check_out_all(baseParam, invParams);
  // console.log(htm)
  res.send(htm);
};

const getPayment = (req, res) => {
  initParm(req.query);
  const create = new EcpayPayment();
  const htm = create.payment_client.aio_check_out_all(baseParam, invParams);
  res.send(htm);
};

const results = (req, res) => {
  console.log('完成');
  // 交易結果, 取得顧客交易詳細資料
  ecpayCtrl.queryTradeInfo(req.body.MerchantTradeNo).then((result) => {
    // 寄送Email
    ecpayCtrl.sendMail(result);
  });
  res.send('1|OK');
};

const tradeInfo = (req, res, next) => {
  // 取得訂單資訊
  ecpayCtrl.queryTradeInfo(req.query.merchantTradeNo).then((result) => {
    res.send(result);
  }).catch((error) => { next(error); }); // 失敗回傳錯誤訊息
};

const test = (req, res) => {
  res.location('http://192.168.11.5:3000/checkout');
  res.sendStatus(302);
};

export default {
  payment,
  getPayment,
  results,
  tradeInfo,
  test
};
