import httpStatus from 'http-status';

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
  constructor(
    status = httpStatus.INTERNAL_SERVER_ERROR,
    message,
    tag,
    code,
  ) {
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
  constructor(
    status = httpStatus.INTERNAL_SERVER_ERROR,
    message = '網路連線不穩，請稍後再試',
    tag = 'SERVER_ERROR',
    code = 500,
  ) {
    super(status, message, tag, code);
    this.name = 'MySQLError';
  }
}


export default {
  APIError,
  MySQLError
};
