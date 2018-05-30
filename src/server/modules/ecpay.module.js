import httpStatus from 'http-status';
import nodemailer from 'nodemailer';
import urlencode from 'urlencode';
import sha256 from 'sha256';
import moment from 'moment';
import request from 'request';

import APPError from '../helper/AppError';

require('dotenv').config();

/** 付款完成寄送結帳資訊 */
const sendPaymentResult = (data) => {
  // 寄件者 config 設定
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    auth: {
      type: 'OAuth2',
      user: process.env.EMAIL,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SERECT,
      refreshToken: process.env.REFLESH_TOKEN
    }
  });
  // 信件內容
  const mailOptions = {
    from: `綠界金流測試 <${process.env.EMAIL}>`,
    to: data.CustomField2,
    subject: '[測試]訂單付款成功通知',
    html: `<b>您的訂單已付款完成！</b><br/>
${data.CustomField1} 先生/小姐您好，感謝您的訂購，我們已收到您的付款資料，待訂單確認後，盡快為您安排出貨！<br/>
您可以至<a href="https://quapni.com/" target="_blank">訂單查詢</a>瞭解訂單詳情與處理進度。<br/><br/> 
交易金額: ${data.TradeAmt}<br/>
訂單編號: ${data.MerchantTradeNo}<br/>
購買商品: ${data.ItemName}<br/>
宅配地址: ${data.CustomField3}<br/>備註: ${data.CustomField4}<br/><br/>
<span style="color:red;">[防詐騙提醒]</span> 若您接獲任何電話要您依照指示操作ATM，提供剩額、變更付款方式或更改分期設定等，請不要依電話指示操作，建議您直接與本公司客服中心聯繫確認，謝謝您！<br/><br/><br/>
    
<span style="color:red;font-size:13px;">請注意：此郵件是系統自動傳送，請勿直接回覆！</span>
`
  };
  // 傳送 Email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });
};

const tableContext = (orderInfo, data) => {
  if (orderInfo.PaymentType === 'CVS_CVS') {
    return `<table border="0" align="center" cellpadding="0" cellspacing="0" style="border-radius: 5px;line-height: 2em;border-top: 3px solid #CCC;border-bottom: 3px solid #CCC;">
   <colgroup>
      <col width="30%">
      <col width="60%">
   </colgroup>
   <tbody>
      <tr>
         <td style="color:#b28045;">
            訂單編號
         </td>
         <td>
            ${data.MerchantTradeNo}
         </td>
      </tr>
      <tr>
         <td style="color:#b28045;">
            商店名稱
         </td>
         <td>
            綠界金流測試
         </td>
      </tr>
      <tr>
         <td style="color:#b28045;">
            商品明細
         </td>
         <td>
            ${data.ItemName}<br>                            
         </td>
      </tr>
      <tr>
         <td style="color:#b28045;">
            訂單金額<br>
         </td>
         <td>
            ${data.TradeAmt} 元 <br>
         </td>
      </tr>
      <tr>
         <td style="color:#b28045;">
            付款方式
         </td>
         <td>
            超商代碼
         </td>
      </tr>
      <tr>
         <td style="color:#b28045;">
            繳費截止日期
         </td>
         <td style="color:red;">
            ${orderInfo.ExpireDate}
         </td>
      </tr>
      <tr>
         <td style="color:#b28045;">
            超商繳費代碼<br/>
            <a href="https://www-stage.ecpay.com.tw/Service/pay_way_cvpay" style="color:red;cursor: pointer;font-size=8px;">(繳費流程說明)</a>
         </td>
         <td style="font-weight: bold;">
            ${orderInfo.PaymentNo}
         </td>
      </tr>
   </tbody>
</table>
<br/>
<h4 style="color:red;">
      注意事項：
   </h4>
超商代收-代碼的繳費期限為7天，請務必於期限內進行繳款。 <br/>
例：08/01的20:15分購買商品，繳費期限為7天，表示8/08的20:15分前您必須前往繳費。<br/><br/>`;
  }
  return `<table border="0" align="center" cellpadding="0" cellspacing="0" style="border-radius: 5px;line-height: 2em;border-top: 3px solid #CCC;border-bottom: 3px solid #CCC;">
   <colgroup>
      <col width="30%">
      <col width="60%">
   </colgroup>
   <tbody>
      <tr>
         <td style="color:#b28045;">
            訂單編號
         </td>
         <td>
            ${data.MerchantTradeNo}
         </td>
      </tr>
      <tr>
         <td style="color:#b28045;">
            商店名稱
         </td>
         <td>
            綠界金流測試
         </td>
      </tr>
      <tr>
         <td style="color:#b28045;">
            商品明細
         </td>
         <td>
            ${data.ItemName}<br>                            
         </td>
      </tr>
      <tr>
         <td style="color:#b28045;">
            訂單金額<br>
         </td>
         <td>
            ${data.TradeAmt} 元 <br>
         </td>
      </tr>
      <tr>
         <td style="color:#b28045;">
            付款方式
         </td>
         <td>
            ATM 櫃員機
         </td>
      </tr>
      <tr>
         <td style="color:#b28045;">
            銀行代碼
         </td>
         <td>
            ${orderInfo.BankCode}
         </td>
      </tr>
      <tr>
         <td style="color:#b28045;">
            ATM繳費帳號
         </td>
         <td style="font-weight: bold;">
            ${orderInfo.vAccount}
         </td>
      </tr>
      <tr>
         <td style="color:#b28045;">
            繳費截止日期
         </td>
         <td style="color:red;">
            ${orderInfo.ExpireDate} 23:59:59
         </td>
      </tr>
   </tbody>
</table>
<!-- 注意事項 -->
<div class="message margin_t30">
   <h4 style="color:red;">
      注意事項：
   </h4>
   <ol>
      <li>轉帳成功後，系統將於成功後的1至2個小時，發送繳款成功通知至收款方。</li>
      <li>若您於此段時間未收到「繳款成功通知」，請於上班時間來電或利用官網的線上回報通報客服。</li>
      <li>晚上 12 點至凌晨 1 點之間為銀行固定維護時間，如於此期間進行轉帳，將於凌晨 1 點後入帳。</li>
      <li>若使用ATM櫃員機，可選擇轉帳 / 轉出 ( 繳費單筆上限3萬元 ) 或繳費 ( 無上限3萬元限制 ) 之功能按鈕；若為使用第一銀行ATM櫃員機，請選擇「繳費」按鈕。<a style="cursor: pointer" href="https://payment-stage.ecpay.com.tw/Content/themes/WebStyle/images/firstbank_atm.png" target="_blank" >(示意圖)</a></li>
      <li>適用【繳費】功能之銀行ATM櫃員機：台新銀行、玉山銀行、中國信託、華南銀行、第一銀行、富邦銀行、台灣銀行、土地銀行、彰化銀行、永豐銀行、國泰世華、大眾銀行。(無上限3萬元限制)</li>
      <li>各銀行ATM繳款帳號，若金額錯誤、逾期繳費、重覆繳款，是經由銀行端機制進行檢核ATM繳款帳號資訊，綠界科技無法進行金額錯誤、逾期繳費、重覆繳款的訂單阻擋。</li>
   </ol>
</div><br/><br/>`;
};

/** 付款完成寄送結帳資訊 */
const sendOrderResult = (orderInfo, data) => {
  // 寄件者 config 設定
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    auth: {
      type: 'OAuth2',
      user: process.env.EMAIL,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SERECT,
      refreshToken: process.env.REFLESH_TOKEN
    }
  });
  // 取得表格內容
  const TABLE = tableContext(orderInfo, data);
  // 信件內容
  const mailOptions = {
    from: `綠界金流測試 <${process.env.EMAIL}>`,
    to: data.CustomField2,
    subject: `[測試]購買清單(訂單編號: ${data.MerchantTradeNo})`,
    html: `親愛的 顧客 您好：<br/>

已收到您的訂購資訊，感謝您訂購產品！本通知函只是通知您本系統已收到您的訂購訊息、並供您再次自行核對之用，不代表交易已完成。<br/>
<span style="color:red;">[防詐騙提醒]</span> 若您接獲任何電話要您依照指示操作ATM，提供剩額、變更付款方式或更改分期設定等，請不要依電話指示操作，建議您直接與本公司客服中心聯繫確認，謝謝您！<br/><br/><br/>
<!-- table表單 -->
${TABLE}
<span style="color:red;font-size:13px;">請注意：此郵件是系統自動傳送，請勿直接回覆！</span>
`
  };
  // 傳送 Email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });
};

/** 訂單編號查詢綠界訂單資訊 */
const queryTradeInfo = (merchantTradeNo) => {
  return new Promise((resolve, reject) => {
    // 取得目前時間戳記
    const timestamp = moment().valueOf().toString().substring(0, 10);
    const originString = `HashKey=5294y06JbISpM5x9&MerchantID=2000132&MerchantTradeNo=${merchantTradeNo}&TimeStamp=${timestamp}&HashIV=v77hoKGq4kWxNNIS`;

    // 將整串字串進行 URL encode (UTF-8小寫)
    const encodeString = urlencode(originString).toLowerCase();

    // 以 SHA256 加密方式來產生雜凑值(大寫)
    const sh256String = sha256(encodeString).toUpperCase();

    const formData = {
      MerchantID: '2000132',
      MerchantTradeNo: merchantTradeNo,
      TimeStamp: timestamp,
      CheckMacValue: sh256String
    };
    // 測試 https://payment-stage.ecpay.com.tw/Cashier/QueryTradeInfo/V5
    // 上線 https://payment.ecpay.com.tw/Cashier/QueryTradeInfo/V5
    request.post({ url: 'https://payment-stage.ecpay.com.tw/Cashier/QueryTradeInfo/V5', form: formData }, (err, httpResponse, body) => {
      // 解析訂單資料(字串轉JSON)
      const result = body.split('&');
      const resultObject = result.reduce((acc, item) => {
        const key = item.split('=')[0];
        const value = item.split('=')[1];
        acc[key] = value;
        return acc;
      }, {});
      if (err) {
        console.error('login failed:', err);
      } else if (resultObject.TradeStatus === '10200047' || resultObject.TradeStatus === '10200073') {
        // 查無此訂單
        reject(new APPError.APIError(httpStatus.BAD_REQUEST, '查無此訂單編號資料', '綠界訂單查詢', resultObject.TradeStatus));
      } else {
        // 查詢成功回傳資訊
        resolve(resultObject);
      }
    });
  });
};


export default { sendPaymentResult, sendOrderResult, queryTradeInfo };
