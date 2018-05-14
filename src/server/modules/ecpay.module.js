const nodemailer = require('nodemailer');
require('dotenv').config();


const sendMail = (body, data) => {
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
  // Setup mail configuration
  const mailOptions = {
    from: `Quapni-康迪薾戶外 <${process.env.EMAIL}>`,
    to: data.email,
    subject: 'Quapni測試信件',
    text: `${data.name} (先生/小姐)您好！ 此封郵件是購買信件測試寄送，「故此交易作廢」。 \r\n\r\n 交易金額: ${data.total}
訂單編號: ${body.MerchantTradeNo} \r\n 購買商品: ${data.item} \r\n 宅配地址: ${data.address} \r\n
    
如有任何問題，也歡迎使用客服信箱聯絡我們，我們將竭誠為您服務。
客服信箱： service@quapni.com.tw
聯絡電話： 04-25605778
官網: https://quapni.com/
FB粉絲團: https://www.facebook.com/quapni

Quapni-康迪薾戶外 小組敬上`
  };
  // send mail
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });
};


export default { sendMail };
