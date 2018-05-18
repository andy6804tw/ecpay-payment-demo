
const urlencode = require('urlencode');
const sha256 = require('sha256');
const moment = require('moment');
const request = require('request');

const timestamp = moment().valueOf().toString().substring(0, 10);
const merchantTradeNo = '28geeks6rb6zv5niycwy'; // 訂單編號
console.log(timestamp);
const originString = `HashKey=5294y06JbISpM5x9&MerchantID=2000132&MerchantTradeNo=${merchantTradeNo}&TimeStamp=${timestamp}&HashIV=v77hoKGq4kWxNNIS`;

// 將整串字串進行 URL encode (UTF-8小寫)
const encodeString = urlencode(originString).toLowerCase();
console.log(encodeString);

// 以 SHA256 加密方式來產生雜凑值(大寫)
const sh256String = sha256(encodeString).toUpperCase();
console.log(sh256String);

// const str = 'CustomField1=王小明&CustomField2=andy6804tw@yahoo.com.tw&CustomField3=台中市&CustomField4=&HandlingCharge=5&ItemName=山茶 CAMELLA 85T 前打捲線器&MerchantID=2000132&MerchantTradeNo=28geeks6rb6zv5niycwy&PaymentDate=2018/05/17 12:17:52&PaymentType=WebATM_LAND&PaymentTypeChargeFee=5&StoreID=&TradeAmt=4200&TradeDate=2018/05/17 12:17:36&TradeNo=1805171217369543&TradeStatus=1&CheckMacValue=402188ADD3AEC66431F06CCADE69AAF73A0DEA9EE4EDB48617860233C19541D3';
// console.log(...str.split('&'));


const formData = {
  MerchantID: 2000132,
  MerchantTradeNo: '28geeks6rb6zv5niycwy',
  TimeStamp: timestamp,
  CheckMacValue: sh256String
};
request.post({ url: 'https://payment-stage.ecpay.com.tw/Cashier/QueryTradeInfo/V5', form: formData }, (err, httpResponse, body) => {
  if (err) {
    console.error('login failed:', err);
  }
  // 登入成功並取得 access_token 回傳
  console.log(...body.split('&'));
});

