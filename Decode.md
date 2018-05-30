# 綠界金流串接服務

## 產生訂單
### 應用場景：
- 消費者在特店進行購物後送出訂單。
**Step 1.** 特店：將訂單資料以 SERVER POST(HTTP Method)傳送至綠界，取該筆訂單 SPToken。
**Step 2.** 特店：根據 MerchantID、SPToken 完成付款步驟。
- 介接路徑：
    正式環境=> https://payment.ecpay.com.tw/SP/CreateTrade
    測試環境=> https://payment-stage.ecpay.com.tw/SP/CreateTrade
    
以下為舉例待加密的字串：
```
TradeDesc=促銷方案&PaymentType=aio&MerchantTradeDate=2018/05/04 09:50:23&MerchantTradeNo=ecpay20180504110723&MerchantID=2000132&ReturnURL=https://www.ecpay.com.tw/receive.php&ItemName=Apple iphone 7 手機殼&TotalAmount=1000&ChoosePayment=ALL&EncryptType=1
```

1. 將傳遞參數依照第一個英文字母，由 A 到 Z 的順序來排序(遇到第一個英名字母相同時，以第二個英名字母來比較，以此類推)，並且以&方式將所有參數串連。

```
ChoosePayment=ALL&EncryptType=1&ItemName=Apple iphone 7 手機殼&MerchantID=2000132&MerchantTradeDate=2018/05/04 11:07:23&MerchantTradeNo=ecpay20180504110723&PaymentType=aio&ReturnURL=https://www.ecpay.com.tw/receive.php&TotalAmount=1000&TradeDesc=促銷方案
```

2. 參數最前面加上 HashKey、最後面加上 HashIV

```
HashKey=5294y06JbISpM5x9&ChoosePayment=ALL&EncryptType=1&ItemName=Apple iphone 7 手機殼&MerchantID=2000132&MerchantTradeDate=2018/05/04 11:07:23&MerchantTradeNo=ecpay20180504110723&PaymentType=aio&ReturnURL=https://www.ecpay.com.tw/receive.php&TotalAmount=1000&TradeDesc=促銷方案&HashIV=v77hoKGq4kWxNNIS
```

3. 將整串字串進行 URL encode

- [線上Url Encode / Decode](https://www.ez2o.com/App/Web/UrlEncodeDecode)

```
HashKey%3d5294y06JbISpM5x9%26ChoosePayment%3dALL%26EncryptType%3d1%26ItemName%3dApple+iphone+7+%e6%89%8b%e6%a9%9f%e6%ae%bc%26MerchantID%3d2000132%26MerchantTradeDate%3d2018%2f05%2f04+11%3a07%3a23%26MerchantTradeNo%3decpay20180504110723%26PaymentType%3daio%26ReturnURL%3dhttps%3a%2f%2fwww.ecpay.com.tw%2freceive.php%26TotalAmount%3d1000%26TradeDesc%3d%e4%bf%83%e9%8a%b7%e6%96%b9%e6%a1%88%26HashIV%3dv77hoKGq4kWxNNIS
```

4. 轉為小寫

- [線上英文轉為小寫](https://www.ifreesite.com/abc/)

```
hashkey%3d5294y06jbispm5x9%26choosepayment%3dall%26encrypttype%3d1%26itemname%3dapple+iphone+7+%e6%89%8b%e6%a9%9f%e6%ae%bc%26merchantid%3d2000132%26merchanttradedate%3d2018%2f05%2f04+11%3a07%3a23%26merchanttradeno%3decpay20180504110723%26paymenttype%3daio%26returnurl%3dhttps%3a%2f%2fwww.ecpay.com.tw%2freceive.php%26totalamount%3d1000%26tradedesc%3d%e4%bf%83%e9%8a%b7%e6%96%b9%e6%a1%88%26hashiv%3dv77hokgq4kwxnnis
```

5. 以 SHA256 加密方式來產生雜凑值(大寫)

- [線上轉SHA256](https://www.ez2o.com/App/Coder/SHA)

```
B4A5010C622CC8710182465D1A8CFFF29B9212264E679C8468893C4A6EBB716B
```


6. Postman 模擬訂單
:::info
__<font color=#000088>POST</font>__ https://payment-stage.ecpay.com.tw/SP/CreateTrade
:::

+ Body parameters

|Body參數|傳輸格式|描述|
|:------:|:--:|:--:|
|ChoosePayment<font color=red>(必填)</font>|form-data|選擇預設付款方式|
|EncryptType<font color=red>(必填)</font>|form-data|CheckMacValue 加密類型|
|ItemName<font color=red>(必填)</font>|form-data|商品名稱|
|MerchantID<font color=red>(必填)</font>|form-data|特店編號|
|MerchantTradeDate<font color=red>(必填)</font>|form-data|特店交易時間|
|MerchantTradeNo<font color=red>(必填)</font>|form-data|特店交易編號|
|PaymentType<font color=red>(必填)</font>|form-data|交易類型|
|ReturnURL<font color=red>(必填)</font>|form-data|付款完成通知回傳網址|
|TotalAmount<font color=red>(必填)</font>|form-data|交易金額|
|TradeDesc<font color=red>(必填)</font>|form-data|交易描述|
|CheckMacValue<font color=red>(必填)</font>|form-data|檢查碼|

---

:::warning
Request
Content-Type: form-data

|key|value|
|:------:|:--|
|ChoosePayment|ALL|
|EncryptType|1|
|ItemName|Apple iphone 7 手機殼|
|MerchantID|2000132|
|MerchantTradeDate|2018/05/04 11:07:23|
|MerchantTradeNo|ecpay20180504110723|
|PaymentType|aio|
|ReturnURL|https://www.ecpay.com.tw/receive.php|
|TotalAmount|1000|
|TradeDesc|促銷方案|
|CheckMacValue|B4A5010C622CC8710182465D1A8CFFF29B9212264E679C8468893C4A6EBB716B|
:::
![新增訂單](https://i.imgur.com/RJqHPio.png)


<font color=green>

#### Success 200
</font>

:::success
Response
Content-Type: application/json

```javascript=
{"RtnCode":"1","RtnMsg":"成功","SPToken":"0182A83944344D96817ABE1EF4176BB4","MerchantID":"2000132","MerchantTradeNo":"ecpay20180504110723","CheckMacValue":"262CFB85115E454900990E9C12DD1F9715340F8073006B6B896DC670FB62DA2E"}
```
:::

## 進行交易訂單

- [交易訂單 (Demo)](https://codepen.io/andy6804tw/pen/dezpxX)

- 應用場景：
根據回傳 SPToken 完成後續付款步驟，特店可利用以下程式碼，進行後續交易。
**Step 1.** 特店：依收到的特店交易識別碼 SPToken 設定到前端的 JS 交易參數中。
**Step 2.** 消費者：選擇付款方式進行付款。
- 介接路徑：
     正式環境=> https://payment.ecpay.com.tw/Scripts/SP/ECPayPayment_1.0.0.js
     測試環境=> https://payment-stage.ecpay.com.tw/Scripts/SP/ECPayPayment_1.0.0.js
     
     
---

:::warning
前端付款按鈕
```js
<script src="https://payment-stage.ecpay.com.tw/Scripts/SP/ECPayPayment_1.0.0.js"
 data-MerchantID="2000132"
 data-SPToken="E1AEEC8F56EA4A07B49008BD1462BD2E"
 data-PaymentType="CREDIT "
 data-PaymentName="信用卡"
 data-CustomerBtn="0" >
</script>
```
:::
     
     
![](https://i.imgur.com/e1rLfFv.png)

![](https://i.imgur.com/aciJK7C.png)


## 查詢訂單
- 應用場景：
提供特店查詢訂單資訊，可透過此 API 來過濾是否為有效訂單。
**Step 1.** 特店：以 Server POST 方式傳送以下參數至 API 網址
**Step 2.** 綠界：接受並檢核正確後，回傳訂單資訊參數。
- 介接路徑：
    正式環境：https://payment.ecpay.com.tw/Cashier/QueryTradeInfo/V5
    測試環境：https://payment-stage.ecpay.com.tw/Cashier/QueryTradeInfo/V5
    

以下為舉例待加密的字串：
```
MerchantID=2000132&MerchantTradeNo=ecpay20180504112423&TimeStamp=1525410372
```

1. 將傳遞參數依照第一個英文字母，由 A 到 Z 的順序來排序(遇到第一個英名字母相同時，以第二個英名字母來比較，以此類推)，並且以&方式將所有參數串連。

```
MerchantID=2000132&MerchantTradeNo=ecpay20180504112423&TimeStamp=1525410372
```

2. 參數最前面加上 HashKey、最後面加上 HashIV

```
HashKey=5294y06JbISpM5x9&MerchantID=2000132&MerchantTradeNo=ecpay20180504112423&TimeStamp=1525410372&HashIV=v77hoKGq4kWxNNIS
```

3. 將整串字串進行 URL encode

- [線上Url Encode / Decode](https://www.ez2o.com/App/Web/UrlEncodeDecode)

```
HashKey%3d5294y06JbISpM5x9%26MerchantID%3d2000132%26MerchantTradeNo%3decpay20180504112423%26TimeStamp%3d1525410372%26HashIV%3dv77hoKGq4kWxNNIS
```

4. 轉為小寫

- [線上英文轉為小寫](https://www.ifreesite.com/abc/)

```
hashkey%3d5294y06jbispm5x9%26merchantid%3d2000132%26merchanttradeno%3decpay20180504112423%26timestamp%3d1525410372%26hashiv%3dv77hokgq4kwxnnis
```

5. 以 SHA256 加密方式來產生雜凑值(大寫)

- [線上轉SHA256](https://www.ez2o.com/App/Coder/SHA)

```
48ABB4DBF2365897B2A17C48EBCBA82274E7D7DE79F1F955115C4258482A045B
```


6. Postman 查詢訂單
:::info
__<font color=#000088>POST</font>__ https://payment-stage.ecpay.com.tw/Cashier/QueryTradeInfo/V5
:::

+ Body parameters

|Body參數|傳輸格式|描述|
|:------:|:--:|:--:|
|MerchantID<font color=red>(必填)</font>|form-data|特店編號|
|MerchantTradeNo<font color=red>(必填)</font>|form-data|特店交易編號|
|TimeStamp<font color=red>(必填)</font>|form-data|驗證時間|
|CheckMacValue<font color=red>(必填)</font>|form-data|檢查碼|

> [線上取得時間戳記](http://www.textdiff.com/)

---

:::warning
Request
Content-Type: form-data

|key|value|
|:------:|:--|
|MerchantID|2000132|
|MerchantTradeNo|ecpay20180504112423|
|TimeStamp|1525406240|
|CheckMacValue|48ABB4DBF2365897B2A17C48EBCBA82274E7D7DE79F1F955115C4258482A045B|
:::
![查詢訂單](https://i.imgur.com/Lm4xaTm.png)


<font color=green>

#### Success 200
</font>

:::success
Response
Content-Type: text

```javascript=
CustomField1=&CustomField2=&CustomField3=&CustomField4=&HandlingCharge=1&ItemName=Apple iphone 7 手機殼&MerchantID=2000132&MerchantTradeNo=ecpay20180504112423&PaymentDate=2018/05/04 11:27:39&PaymentType=Credit_CreditCard&PaymentTypeChargeFee=1&StoreID=&TradeAmt=1000&TradeDate=2018/05/04 11:24:57&TradeNo=1805041124578172&TradeStatus=1&CheckMacValue=7FED9171711B628633FDBA39EBEE159E2E9A1A6AEB9ACD87B105778EECE2FB06
```
:::
