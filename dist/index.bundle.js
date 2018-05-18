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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_joi__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_joi___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_joi__);


// require and configure dotenv, will load vars in .env in process.env
__webpack_require__(2).config();

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

module.exports = require("dotenv");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("http-status");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("moment");

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config_config__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config_express__ = __webpack_require__(8);



if (!module.parent) {
  // listen on port config.port
  __WEBPACK_IMPORTED_MODULE_1__config_express__["a" /* default */].listen(__WEBPACK_IMPORTED_MODULE_0__config_config__["a" /* default */].port, () => {
    console.log(`server started on  port http://127.0.0.1:${__WEBPACK_IMPORTED_MODULE_0__config_config__["a" /* default */].port} (${__WEBPACK_IMPORTED_MODULE_0__config_config__["a" /* default */].env})`);
  });
}

/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_1__config_express__["a" /* default */]);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(6)(module)))

/***/ }),
/* 6 */
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
/* 7 */
/***/ (function(module, exports) {

module.exports = require("joi");

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_body_parser__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_body_parser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_body_parser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_cors__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_cors___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_cors__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_morgan__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_morgan___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_morgan__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_http_status__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_http_status___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_http_status__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_express_validation__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_express_validation___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_express_validation__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__server_helper_AppError__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__config__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__server_routes_index_route__ = __webpack_require__(14);










const app = __WEBPACK_IMPORTED_MODULE_0_express___default()();

// parse body params and attache them to req.body
app.use(__WEBPACK_IMPORTED_MODULE_1_body_parser___default.a.json());
app.use(__WEBPACK_IMPORTED_MODULE_1_body_parser___default.a.urlencoded({ extended: true }));
// enable CORS - Cross Origin Resource Sharing
app.use(__WEBPACK_IMPORTED_MODULE_2_cors___default()());
// HTTP request logger middleware for node.js
app.use(__WEBPACK_IMPORTED_MODULE_3_morgan___default()('dev'));

/* GET home page. */
app.get('/', (req, res) => {
  res.send(`server started on  port http://127.0.0.1:${__WEBPACK_IMPORTED_MODULE_7__config__["a" /* default */].port} (${__WEBPACK_IMPORTED_MODULE_7__config__["a" /* default */].env})`);
});

app.use('/api', __WEBPACK_IMPORTED_MODULE_8__server_routes_index_route__["a" /* default */]);

// if error is not an instanceOf APIError, convert it.
app.use((err, req, res, next) => {
  console.log('1');
  let errorMessage;
  let errorCode;
  let errorStatus;
  // express validation error 所有傳入參數驗證錯誤
  if (err instanceof __WEBPACK_IMPORTED_MODULE_5_express_validation___default.a.ValidationError) {
    if (err.errors[0].location === 'query' || err.errors[0].location === 'body') {
      errorMessage = err.errors[0].messages;
      errorCode = 400;
      errorStatus = __WEBPACK_IMPORTED_MODULE_4_http_status___default.a.BAD_REQUEST;
    }
    const error = new __WEBPACK_IMPORTED_MODULE_6__server_helper_AppError__["a" /* default */].APIError(errorMessage, errorStatus, true, errorCode);
    return next(error);
  }
  return next(err);
});

// error handler, send stacktrace only during development 錯誤後最後才跑這邊
app.use((err, req, res, next) => {
  console.log('2');
  console.log(err.message);
  res.status(err.status).json({
    message: err.isPublic ? err.message : __WEBPACK_IMPORTED_MODULE_4_http_status___default.a[err.status],
    code: err.code ? err.code : __WEBPACK_IMPORTED_MODULE_4_http_status___default.a[err.status],
    stack: __WEBPACK_IMPORTED_MODULE_7__config__["a" /* default */].env === 'development' ? err.stack : {}
  });
  next();
});

/* harmony default export */ __webpack_exports__["a"] = (app);

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("express-validation");

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_http_status__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_http_status___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_http_status__);


/**
 * @extends Error
 */
class ExtendableError extends Error {
  constructor(message, status, isPublic, code) {
    super(message);
    this.message = message;
    this.name = this.constructor.name;
    this.status = status;
    this.isPublic = isPublic;
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
   * Creates an API error.
   * @param {string} message - Error message.
   * @param {number} status - HTTP status code of error.
   * @param {boolean} isPublic - Whether the message should be visible to user or not.
   */
  constructor(message, status = __WEBPACK_IMPORTED_MODULE_0_http_status___default.a.INTERNAL_SERVER_ERROR, isPublic = false, code) {
    super(message, status, isPublic, code);
    this.name = 'APIError';
  }
}

/**
 * Class representing an MySQL error.
 * @extends ExtendableError
 */
class MySQLError extends ExtendableError {
  /**
   * Creates an API error.
   * @param {string} message - Error message.
   * @param {number} status - HTTP status code of error.
   * @param {boolean} isPublic - Whether the message should be visible to user or not.
   */
  constructor(message = 'Backend Error', status = __WEBPACK_IMPORTED_MODULE_0_http_status___default.a.INTERNAL_SERVER_ERROR, isPublic = true, code = 500) {
    super(message, status, isPublic, code);
    this.name = 'MySQLError';
  }
}

/**
 * 信箱尚未註冊 Error
 * @extends ExtendableError
 */
class LoginError1 extends ExtendableError {
  /**
   * Creates an API error.
   * @param {string} message - Error message.
   * @param {number} status - HTTP status code of error.
   * @param {boolean} isPublic - Whether the message should be visible to user or not.
   */
  constructor(message = '信箱尚未註冊！', status = __WEBPACK_IMPORTED_MODULE_0_http_status___default.a.UNAUTHORIZED, isPublic = true, code = 401) {
    super(message, status, isPublic, code);
    this.name = 'LoginError';
  }
}
/**
 * 密碼錯誤 Error.
 * @extends ExtendableError
 */
class LoginError2 extends ExtendableError {
  /**
   * Creates an API error.
   * @param {string} message - Error message.
   * @param {number} status - HTTP status code of error.
   * @param {boolean} isPublic - Whether the message should be visible to user or not.
   */
  constructor(message = '您輸入的密碼有誤！', status = __WEBPACK_IMPORTED_MODULE_0_http_status___default.a.UNAUTHORIZED, isPublic = true, code = 401) {
    super(message, status, isPublic, code);
    this.name = 'LoginError';
  }
}

/* harmony default export */ __webpack_exports__["a"] = ({
  APIError,
  MySQLError,
  LoginError1,
  LoginError2
});

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

router.route('/').post(__WEBPACK_IMPORTED_MODULE_1__controllers_ecpay_controller__["a" /* default */].payment);

router.route('/get').get(__WEBPACK_IMPORTED_MODULE_1__controllers_ecpay_controller__["a" /* default */].getPayment);

router.route('/results').post(__WEBPACK_IMPORTED_MODULE_1__controllers_ecpay_controller__["a" /* default */].results);

router.route('/queryTradeInfo').get(__WEBPACK_IMPORTED_MODULE_1__controllers_ecpay_controller__["a" /* default */].tradeInfo);

router.route('/test').post(__WEBPACK_IMPORTED_MODULE_1__controllers_ecpay_controller__["a" /* default */].test);

/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_ecpay_module__ = __webpack_require__(17);


const random = __webpack_require__(22);
const moment = __webpack_require__(4);

// 交易訊息
let bodyData;

/**
 * Created by ying.wu on 2017/6/27.
 */
const EcpayPayment = __webpack_require__(23);
// 參數值為[PLEASE MODIFY]者，請在每次測試時給予獨特值
// 若要測試非必帶參數請將base_param內註解的參數依需求取消註解 //
let baseParam = {};
// 若要測試開立電子發票，請將inv_params內的"所有"參數取消註解 //
const invParams = {};
// 時間
const currentDateTime = moment().format('YYYY/MM/DD HH:mm:ss');
console.log(currentDateTime);
const initParm = data => {
  baseParam = {
    MerchantTradeNo: random.RandomChar(20), // 請帶20碼uid, ex: f0a0d7e9fae1bb72bc93
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
    ClientBackURL: 'https://quapni.com', // 付款完成頁面button返回商店網址
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
  __WEBPACK_IMPORTED_MODULE_0__modules_ecpay_module__["a" /* default */].queryTradeInfo(req.body.MerchantTradeNo).then(result => {
    // 寄送Email
    __WEBPACK_IMPORTED_MODULE_0__modules_ecpay_module__["a" /* default */].sendMail(result);
  });
  res.send('1|OK');
};

const tradeInfo = (req, res) => {
  // 取得訂單資訊
  __WEBPACK_IMPORTED_MODULE_0__modules_ecpay_module__["a" /* default */].queryTradeInfo(req.query.merchantTradeNo).then(result => {
    console.log(result);
    res.send(result);
  });
};

const test = (req, res) => {
  res.location('http://192.168.11.5:3000/checkout');
  res.sendStatus(302);
};

/* harmony default export */ __webpack_exports__["a"] = ({
  payment,
  getPayment,
  results,
  tradeInfo,
  test
});

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const nodemailer = __webpack_require__(18);
const urlencode = __webpack_require__(19);
const sha256 = __webpack_require__(20);
const moment = __webpack_require__(4);
const request = __webpack_require__(21);
__webpack_require__(2).config();

const sendMail = data => {
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
    to: data.CustomField2,
    subject: 'Quapni測試信件',
    text: `${data.CustomField1} (先生/小姐)您好！ 此封郵件是購買信件測試寄送，「故此交易作廢」。 \r\n\r\n 交易金額: ${data.TradeAmt}
訂單編號: ${data.MerchantTradeNo} \r\n 購買商品: ${data.ItemName} \r\n 宅配地址: ${data.CustomField3} \r\n
    
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
// const sendMail = (body) => {
//   const transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     auth: {
//       type: 'OAuth2',
//       user: process.env.EMAIL,
//       clientId: process.env.CLIENT_ID,
//       clientSecret: process.env.CLIENT_SERECT,
//       refreshToken: process.env.REFLESH_TOKEN
//     }
//   });
//   // Setup mail configuration
//   const mailOptions = {
//     from: `Quapni-康迪薾戶外 <${process.env.EMAIL}>`,
//     to: 'andy6804tw@yahoo.com.tw',
//     subject: 'Quapni測試信件',
//     text: `${body}\r\n${JSON.stringify(body)}`
//   };
//   // send mail
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log(`Email sent: ${info.response}`);
//     }
//   });
// };

const queryTradeInfo = merchantTradeNo => {
  return new Promise((resolve, reject) => {
    const timestamp = moment().valueOf().toString().substring(0, 10);
    console.log(timestamp);
    const originString = `HashKey=5294y06JbISpM5x9&MerchantID=2000132&MerchantTradeNo=${merchantTradeNo}&TimeStamp=${timestamp}&HashIV=v77hoKGq4kWxNNIS`;

    // 將整串字串進行 URL encode (UTF-8小寫)
    const encodeString = urlencode(originString).toLowerCase();
    console.log(encodeString);

    // 以 SHA256 加密方式來產生雜凑值(大寫)
    const sh256String = sha256(encodeString).toUpperCase();
    console.log(sh256String);

    const formData = {
      MerchantID: 2000132,
      MerchantTradeNo: merchantTradeNo,
      TimeStamp: timestamp,
      CheckMacValue: sh256String
    };
    request.post({ url: 'https://payment-stage.ecpay.com.tw/Cashier/QueryTradeInfo/V5', form: formData }, (err, httpResponse, body) => {
      if (err) {
        console.error('login failed:', err);
      }
      // 登入成功並取得 access_token 回傳
      console.log(...body.split('&'));
      const result = body.split('&');
      const resultObject = result.reduce((acc, item) => {
        const key = item.split('=')[0];
        const value = item.split('=')[1];
        acc[key] = value;
        return acc;
      }, {});
      resolve(resultObject);
    });
  });
};

/* harmony default export */ __webpack_exports__["a"] = ({ sendMail, queryTradeInfo });

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