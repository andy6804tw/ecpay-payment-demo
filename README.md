[![GitHub license][license-image]][license-url]

# 綠界金流介接測試

## API

- Currently this repo is connecting with Heroku: 
https://ecpay-payment.herokuapp.com/

- For more detail about ecpy's document: https://www.ecpay.com.tw/Content/files/ecpay_011.pdf

## 路徑(Router)
### 1. 結帳頁面
**方法:** GET

**說明:** *登入時可在 body 存放 payload*

**路徑:** *`llocalhost:1337/api/ecpay/?total=:total&item=:item`*

- [範例] URL parameter 
  - localhost:1337/api/ecpay/?total=4200&item=山茶 CAMELLA 85T 前打捲線器

## 功能(Feature)
- 付款方式
  - 信用卡
  - 網路 ATM
  - ATM 櫃員機
  - 超商條碼
  - 超商代碼

<img src="./Screenshot/img01.png">

### 信用卡付款

##### 1. 輸入信用卡資訊及手機號碼

- 信用卡測試卡號
```json
卡號: 4311-9522-2222-2222 (注意：只有此組卡號可測試交易成功流程)

安全碼: 222

有效月/年: 輸入的 MM/YYYY 值請大於現在當下時間的月年，例如在 2016/04/20 當天作測試，請設定 05/2016(含)之後的有效月年，否則回應刷卡失敗。
```

<img src="./Screenshot/img1-1.png">

##### 2. 刷卡簡訊驗證

> Note: 每組簡訊驗證碼有效期限10分鐘

<img src="./Screenshot/img1-2.png">

##### 3. 付款成功

付款成功後會顯示成功頁面，且付款驗證同時會進入 `ReturnURL` 與 `OrderResultURL` 做 callback 動作，開發者必須自定義 callback 內容。

<img src="./Screenshot/img1-3.png">

## LICENSE 
MIT


[license-image]: https://img.shields.io/npm/l/express.svg?registry_uri=https%3A%2F%2Fregistry.npmjs.com
[license-url]: https://github.com/andy6804tw/ecpay-payment-demo/blob/master/LICENSE
