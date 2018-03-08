const random = require('crypto-string-module');

/**
 * Created by ying.wu on 2017/6/27.
 */
const EcpayPayment = require('ecpay-payment');
// 參數值為[PLEASE MODIFY]者，請在每次測試時給予獨特值
// 若要測試非必帶參數請將base_param內註解的參數依需求取消註解 //
let baseParam = {};
// 若要測試開立電子發票，請將inv_params內的"所有"參數取消註解 //
const invParams = {};

const initParm = (total, item) => {
  baseParam = {
    MerchantTradeNo: random.RandomChar(20), // 請帶20碼uid, ex: f0a0d7e9fae1bb72bc93
    MerchantTradeDate: '2017/02/13 15:45:30', // ex: 2017/02/13 15:45:30
    TotalAmount: total,
    TradeDesc: 'Quapni前打輪系列',
    ItemName: item,
    ReturnURL: 'https://55e9298f.ngrok.io/result',
    InvoiceMark: 'Y',
    // ChooseSubPayment: '',
    // OrderResultURL: 'https://f7d2cb15.ngrok.io/payment_result',
    // NeedExtraPaidInfo: '1',
    // ClientBackURL: 'https://www.google.com',
    // ItemURL: 'http://item.test.tw',
    Remark: '交易備註',
    // HoldTradeAMT: '1',
    // StoreID: '',
    CustomField1: '紅色一'
    // CustomField2: '',
    // CustomField3: '',
    // CustomField4: ''
  };
};


const payment = (req, res) => {
  initParm(req.query.total, req.query.item);
  const create = new EcpayPayment();
  const htm = create.payment_client.aio_check_out_all(baseParam, invParams);
  // console.log(htm)
  res.send(htm);
};

export default {
  payment
};
