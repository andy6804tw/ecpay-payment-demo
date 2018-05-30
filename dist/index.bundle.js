module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_joi__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_joi___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_joi__);


// require and configure dotenv, will load vars in .env in process.env
__webpack_require__(3).config();

const envVarSchema = __WEBPACK_IMPORTED_MODULE_0_joi___default.a.object().keys({
  NODE_ENV: __WEBPACK_IMPORTED_MODULE_0_joi___default.a.string().default('development').allow(['development', 'production']), // 字串且預設值為development 並只允許兩種參數
  PORT: __WEBPACK_IMPORTED_MODULE_0_joi___default.a.number().default(8080), // 數字且預設值為 8080
  MYSQL_PORT: __WEBPACK_IMPORTED_MODULE_0_joi___default.a.number().default(3306), //數字且預設值為3306
  MYSQL_HOST: __WEBPACK_IMPORTED_MODULE_0_joi___default.a.string().default('127.0.0.1'), //字串取預設值為127.0.0.1
  MYSQL_USER: __WEBPACK_IMPORTED_MODULE_0_joi___default.a.string(), // 字串
  MYSQL_PASS: __WEBPACK_IMPORTED_MODULE_0_joi___default.a.string(), // 字串
  MYSQL_NAME: __WEBPACK_IMPORTED_MODULE_0_joi___default.a.string(), // 字串
  VERSION: __WEBPACK_IMPORTED_MODULE_0_joi___default.a.string() // 字串
}).unknown().required();

// process.env 撈取 .env 內的變數做 joi 驗證
const { error, value: envVars } = __WEBPACK_IMPORTED_MODULE_0_joi___default.a.validate(process.env, envVarSchema);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  version: envVars.VERSION, // API版本
  env: envVars.NODE_ENV, // 開發模式(development、production)
  port: envVars.PORT, // API 阜號
  mysqlPort: envVars.MYSQL_PORT, // 連接阜號(MYSQL_PORT)
  mysqlHost: envVars.MYSQL_HOST, // 主機名稱 (MYSQL_HOST)
  mysqlUserName: envVars.MYSQL_USER, // 用戶名稱 (MYSQL_USER)
  mysqlPass: envVars.MYSQL_PASS, // 資料庫密碼(MYSQL_PASS)
  mysqlDatabase: envVars.MYSQL_DATABASE // 資料庫名稱(MYSQL_DATABASE)
};

/* harmony default export */ __webpack_exports__["a"] = (config); // 匯出共用

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("http-status");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_http_status__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_http_status___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_http_status__);


/**
 * @extends Error
 */
class ExtendableError extends Error {
  constructor(status, message, tag, code) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.status = status;
    this.tag = tag;
    this.code = code;
    this.isOperational = true; // This is required since bluebird 4 doesn't append it anymore.
    Error.captureStackTrace(this, this.constructor.name);
  }
}

/**
 * Class representing an API error.
 * @extends ExtendableError
 */
class APIError extends ExtendableError {
  /**
   * Creates an instance of APIError.
   * @param {number} [status=httpStatus.INTERNAL_SERVER_ERROR]
   * @param {string} message 錯誤訊息
   * @param {string} tag 英文錯誤代號
   * @param {number} code 錯誤代碼
   * @memberof APIError
   */
  constructor(status = __WEBPACK_IMPORTED_MODULE_0_http_status___default.a.INTERNAL_SERVER_ERROR, message, tag, code) {
    super(status, message, tag, code);
    this.name = 'APIError';
  }
}

/**
 * Class representing an MySQL error.
 * @extends ExtendableError
 */
class MySQLError extends ExtendableError {
  /**
   * Creates an instance of MySQLError.
   * @param {numner} [status=httpStatus.INTERNAL_SERVER_ERROR]
   * @param {string} [message='Mysql 發生錯誤']
   * @param {string} [tag='SERVER_ERROR']
   * @param {number} [code=500]
   * @memberof MySQLError
   */
  constructor(status = __WEBPACK_IMPORTED_MODULE_0_http_status___default.a.INTERNAL_SERVER_ERROR, message = '網路連線不穩，請稍後再試', tag = 'SERVER_ERROR', code = 500) {
    super(status, message, tag, code);
    this.name = 'MySQLError';
  }
}

/* harmony default export */ __webpack_exports__["a"] = ({
  APIError,
  MySQLError
});

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("moment");

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config_config__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config_express__ = __webpack_require__(9);



if (!module.parent) {
  // listen on port config.port
  __WEBPACK_IMPORTED_MODULE_1__config_express__["a" /* default */].listen(__WEBPACK_IMPORTED_MODULE_0__config_config__["a" /* default */].port, () => {
    console.log(`server started on  port http://127.0.0.1:${__WEBPACK_IMPORTED_MODULE_0__config_config__["a" /* default */].port} (${__WEBPACK_IMPORTED_MODULE_0__config_config__["a" /* default */].env})`);
  });
}

/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_1__config_express__["a" /* default */]);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(7)(module)))

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = function(originalModule) {
	if(!originalModule.webpackPolyfill) {
		var module = Object.create(originalModule);
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		Object.defineProperty(module, "exports", {
			enumerable: true,
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("joi");

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_body_parser__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_body_parser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_body_parser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_cors__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_cors___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_cors__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_morgan__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_morgan___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_morgan__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_http_status__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_http_status___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_http_status__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_express_validation__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_express_validation___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_express_validation__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__server_helper_AppError__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__config__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__server_routes_index_route__ = __webpack_require__(14);











const app = __WEBPACK_IMPORTED_MODULE_0_express___default()();

// parse body params and attache them to req.body
app.use(__WEBPACK_IMPORTED_MODULE_1_body_parser___default.a.json());
app.use(__WEBPACK_IMPORTED_MODULE_1_body_parser___default.a.urlencoded({ extended: true }));

// enable CORS - Cross Origin Resource Sharing
app.use(__WEBPACK_IMPORTED_MODULE_2_cors___default()());

// HTTP request logger middleware for node.js
if (__WEBPACK_IMPORTED_MODULE_7__config__["a" /* default */].env === 'development') {
  app.use(__WEBPACK_IMPORTED_MODULE_3_morgan___default()('dev'));
}

// prevent GET /favicon.ico
app.use((req, res, next) => {
  if (req.originalUrl === '/favicon.ico') {
    res.status(204).json({ nope: true });
  } else {
    next();
  }
});

// mount all routes on /api path
app.use('/', __WEBPACK_IMPORTED_MODULE_8__server_routes_index_route__["a" /* default */]);

// if error is not an instanceOf APIError, convert it.
app.use((err, req, res, next) => {
  let errorMessage;
  let errorTag;
  let errorCode;
  let errorStatus;
  // express validation error 所有傳入參數驗證錯誤
  if (err instanceof __WEBPACK_IMPORTED_MODULE_5_express_validation___default.a.ValidationError) {
    if (err.errors[0].location === 'query' || err.errors[0].location === 'body') {
      errorTag = 'REQUEST_ERROR';
      errorMessage = err.errors.map(error => {
        return error.messages.join('. ');
      }).join(' and ');
      errorCode = 400;
      errorStatus = __WEBPACK_IMPORTED_MODULE_4_http_status___default.a.BAD_REQUEST;
    }
    const error = new __WEBPACK_IMPORTED_MODULE_6__server_helper_AppError__["a" /* default */].APIError(errorStatus, errorMessage, errorTag, errorCode);
    return next(error);
  }
  return next(err);
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new __WEBPACK_IMPORTED_MODULE_6__server_helper_AppError__["a" /* default */].APIError(__WEBPACK_IMPORTED_MODULE_4_http_status___default.a.NOT_FOUND, 'API not found', 'API_NOT_FOUND', 404);
  return next(err);
});

// error handler, send stacktrace only during development
app.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  res.status(err.status).json({
    code: err.code,
    tag: __WEBPACK_IMPORTED_MODULE_7__config__["a" /* default */].env === 'development' ? err.tag : '',
    message: __WEBPACK_IMPORTED_MODULE_7__config__["a" /* default */].env === 'development' ? err.message : '',
    stack: __WEBPACK_IMPORTED_MODULE_7__config__["a" /* default */].env === 'development' ? err.stack : {}
  });
});

/* harmony default export */ __webpack_exports__["a"] = (app);

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("express-validation");

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ecpay_route__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config_config__ = __webpack_require__(0);

// Router




const router = __WEBPACK_IMPORTED_MODULE_0_express___default.a.Router();

/* GET localhost:[port]/api page. */
router.get('/', (req, res) => {
  res.send(`此路徑是: localhost:${__WEBPACK_IMPORTED_MODULE_2__config_config__["a" /* default */].port}/api`);
});

/** User Router */
router.use('/ecpay', __WEBPACK_IMPORTED_MODULE_1__ecpay_route__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__controllers_ecpay_controller__ = __webpack_require__(16);



const router = __WEBPACK_IMPORTED_MODULE_0_express___default.a.Router();

// POST表單傳送訂單路徑
router.route('/').post(__WEBPACK_IMPORTED_MODULE_1__controllers_ecpay_controller__["a" /* default */].payment);
// GET方法測試發送訂單路徑
router.route('/get').get(__WEBPACK_IMPORTED_MODULE_1__controllers_ecpay_controller__["a" /* default */].getPayment);
// 付款結果路徑
router.route('/payment/result').post(__WEBPACK_IMPORTED_MODULE_1__controllers_ecpay_controller__["a" /* default */].paymentResult);
// 完成訂單路徑
router.route('/order/result').post(__WEBPACK_IMPORTED_MODULE_1__controllers_ecpay_controller__["a" /* default */].orderResult);
// GET方法查詢訂單
router.route('/queryTradeInfo/:merchantTradeNo').get(__WEBPACK_IMPORTED_MODULE_1__controllers_ecpay_controller__["a" /* default */].tradeInfo);
// POST方法查詢訂單
router.route('/queryTradeInfo/:merchantTradeNo').post(__WEBPACK_IMPORTED_MODULE_1__controllers_ecpay_controller__["a" /* default */].tradeInfo);

/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_crypto_string_module__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_crypto_string_module___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_crypto_string_module__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ecpay_payment__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ecpay_payment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ecpay_payment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_ecpay_module__ = __webpack_require__(17);






let baseParam = {}; // 訂單資訊初始化
const invParams = {}; // 若要測試開立電子發票，請將inv_params內的"所有"參數取消註解
const currentDateTime = __WEBPACK_IMPORTED_MODULE_1_moment___default()().format('YYYY/MM/DD HH:mm:ss'); // 取得交易時間

const initParm = data => {
  const merchantTradeNo = __WEBPACK_IMPORTED_MODULE_0_crypto_string_module___default.a.RandomChar(20); // 亂數產生訂單編號
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
  const create = new __WEBPACK_IMPORTED_MODULE_2_ecpay_payment___default.a();
  const htm = create.payment_client.aio_check_out_all(baseParam, invParams);
  res.send(htm);
};

// URL GET 建立訂單資訊
const getPayment = (req, res) => {
  initParm(req.query);
  const create = new __WEBPACK_IMPORTED_MODULE_2_ecpay_payment___default.a();
  const htm = create.payment_client.aio_check_out_all(baseParam, invParams);
  res.send(htm);
};

const paymentResult = (req, res) => {
  console.log('完成');
  // 交易結果, 取得顧客交易詳細資料
  __WEBPACK_IMPORTED_MODULE_3__modules_ecpay_module__["a" /* default */].queryTradeInfo(req.body.MerchantTradeNo).then(result => {
    // 寄送Email
    __WEBPACK_IMPORTED_MODULE_3__modules_ecpay_module__["a" /* default */].sendPaymentResult(result);
  });
  res.send('1|OK');
};

const orderResult = (req, res) => {
  // 取得交易資訊
  const orderInfo = req.body;
  // 交易結果, 取得顧客交易詳細資料
  __WEBPACK_IMPORTED_MODULE_3__modules_ecpay_module__["a" /* default */].queryTradeInfo(req.body.MerchantTradeNo).then(result => {
    // 寄送Email
    __WEBPACK_IMPORTED_MODULE_3__modules_ecpay_module__["a" /* default */].sendOrderResult(orderInfo, result);
  });
  res.send('1|OK');
};

const tradeInfo = (req, res, next) => {
  // 取得訂單資訊
  __WEBPACK_IMPORTED_MODULE_3__modules_ecpay_module__["a" /* default */].queryTradeInfo(req.params.merchantTradeNo).then(result => {
    res.send(result);
  }).catch(error => {
    next(error);
  }); // 失敗回傳錯誤訊息
};

/* harmony default export */ __webpack_exports__["a"] = ({
  payment,
  getPayment,
  paymentResult,
  orderResult,
  tradeInfo
});

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_http_status__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_http_status___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_http_status__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_nodemailer__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_nodemailer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_nodemailer__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_urlencode__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_urlencode___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_urlencode__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_sha256__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_sha256___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_sha256__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_request__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_request___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_request__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__config_config__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__helper_AppError__ = __webpack_require__(4);










__webpack_require__(3).config();

/** 付款完成寄送結帳資訊 */
const sendPaymentResult = data => {
   // 寄件者 config 設定
   const transporter = __WEBPACK_IMPORTED_MODULE_1_nodemailer___default.a.createTransport({
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
   const transporter = __WEBPACK_IMPORTED_MODULE_1_nodemailer___default.a.createTransport({
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
const queryTradeInfo = merchantTradeNo => {
   return new Promise((resolve, reject) => {
      // 取得目前時間戳記
      const timestamp = __WEBPACK_IMPORTED_MODULE_4_moment___default()().valueOf().toString().substring(0, 10);
      const originString = `HashKey=5294y06JbISpM5x9&MerchantID=2000132&MerchantTradeNo=${merchantTradeNo}&TimeStamp=${timestamp}&HashIV=v77hoKGq4kWxNNIS`;

      // 將整串字串進行 URL encode (UTF-8小寫)
      const encodeString = __WEBPACK_IMPORTED_MODULE_2_urlencode___default()(originString).toLowerCase();

      // 以 SHA256 加密方式來產生雜凑值(大寫)
      const sh256String = __WEBPACK_IMPORTED_MODULE_3_sha256___default()(encodeString).toUpperCase();

      const formData = {
         MerchantID: '2000132',
         MerchantTradeNo: merchantTradeNo,
         TimeStamp: timestamp,
         CheckMacValue: sh256String
      };
      // 測試 https://payment-stage.ecpay.com.tw/Cashier/QueryTradeInfo/V5
      // 上線 https://payment.ecpay.com.tw/Cashier/QueryTradeInfo/V5
      __WEBPACK_IMPORTED_MODULE_5_request___default.a.post({ url: 'https://payment-stage.ecpay.com.tw/Cashier/QueryTradeInfo/V5', form: formData }, (err, httpResponse, body) => {
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
            reject(new __WEBPACK_IMPORTED_MODULE_7__helper_AppError__["a" /* default */].APIError(__WEBPACK_IMPORTED_MODULE_0_http_status___default.a.BAD_REQUEST, '查無此訂單編號資料', '綠界訂單查詢', resultObject.TradeStatus));
         } else {
            // 查詢成功回傳資訊
            resolve(resultObject);
         }
      });
   });
};

/* harmony default export */ __webpack_exports__["a"] = ({ sendPaymentResult, sendOrderResult, queryTradeInfo });

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("nodemailer");

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("urlencode");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("sha256");

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("request");

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("crypto-string-module");

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("ecpay-payment");

/***/ })
/******/ ]);