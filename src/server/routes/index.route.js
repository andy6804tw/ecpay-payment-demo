import express from 'express';
// Router
import ecpay from './ecpay.route';

import config from './../../config/config';

const router = express.Router();


/* GET localhost:[port]/api page. */
router.get('/', (req, res) => {
  res.send(`此路徑是: localhost:${config.port}/api`);
});

/** User Router */
router.use('/ecpay', ecpay);


export default router;
