import express from 'express';
import cors from 'cors';
import passport from 'passport';
import helmet from 'helmet';
import hpp from 'hpp';
import config from './config/general.config.js';
import entrypoint from './routes/index.js';
import { localStrategy, jwtStrategy, graphqlLocalStrategy } from './config/passport.config.js';
import errorHandler from './utils/errorHandler.js';
import { graphqlHTTP } from 'express-graphql';
import { graphQLSchema } from './graphql/index.js';
import { buildContext } from 'graphql-passport';
import {createNaverSignature} from "./utils/bcrypt.js";
import axios from "axios";

const PORT = config.PORT;
const app = express();

localStrategy();
jwtStrategy();
graphqlLocalStrategy();

app.use(passport.initialize());

if(config.NODE_ENV === 'production') app.use(helmet());
app.use(hpp());

/**
 * helmet contentSEcurityPolicy를 활성화하면 graphQLHTTP 접속이 안되는 문제가 있음
 */
app.use(helmet({ contentSecurityPolicy: process.env.NODE_ENV === 'production' ? undefined : false }));
app.use('*', cors());
// JSON parser
app.use(express.json());
// FormData parser
app.use(express.urlencoded({ extended: true }));


app.get('/test' , async (req, res, next) => {
  try {
    const clientId = config.NAVER_APP_ID;
    const grantType = 'client_credentials';
    const tokenType = 'SELF';
    const timestamp = Date.now();
    const signature = await createNaverSignature(timestamp);
  
    
    const oAuth = await axios.post('https://api.commerce.naver.com/external/v1/oauth2/token', {
      client_id: clientId,
      timestamp,
      client_secret_sign: signature,
      grant_type: grantType,
      type: tokenType
    },{
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    
    const token = oAuth.data.access_token;
    
    const getMe = await axios.get('https://api.commerce.naver.com/external/v1/seller/channels', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    const channelNo = getMe.data[0].channelNo;

    const productList = await axios.post('https://api.commerce.naver.com/external/v1/products/search', {
      page: 1,
      size: 50,
      orderType: 'NO',
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
    // productList.data.contents.forEach((product) => console.log(product.channelProducts));

    // const orderList = await axios.get(`https://api.commerce.naver.com/external/v1/pay-order/seller/orders/${productId}/product-order-ids`, {
    //   headers: {
    //     'Authorization': `Bearer ${token}`,
    //   }
    // })
    // console.log(orderList.data);

    const orderList = await axios.get(`https://api.commerce.naver.com/external/v1/pay-order/seller/product-orders/last-changed-statuses?lastChangedFrom=2023-03-12T14:10:00.794Z&lastChangedTo=2023-03-12T14:50:00.794Z`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
    console.log(orderList.data)
    const arr = orderList.data.data.lastChangeStatuses.map(order => order.productOrderId);
    
    const orderDetails = await axios.post('https://api.commerce.naver.com/external/v1/pay-order/seller/product-orders/query', {
      productOrderIds: arr
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
    
    // console.log(orderList.data.data.lastChangeStatuses);
    
    // console.log(orderDetails.data);
    orderDetails.data.data.forEach((order) => console.log(order));
    
    const productOrderIds = orderDetails.data.data.map(order => order.productOrder.productOrderId);
  
    /**
     * @description 발주 확인 처리
     * POST https://api.commerce.naver.com/external/v1/pay-order/seller/product-orders/confirm
     */
    // const confirmBaljoo = await axios.post('https://api.commerce.naver.com/external/v1/pay-order/seller/product-orders/confirm', {
    //   productOrderIds
    // }, {
    //   headers: {
    //     'Authorization': `Bearer ${token}`,
    //   }
    // })
    // console.log(confirmBaljoo.data)
  
    /**
     * @description 발송 처리
     * POST https://api.commerce.naver.com/external/v1/pay-order/seller/product-orders/dispatch
     */
    // const myProductOrderId = productOrderIds[0];
    // const dispatchResult = await axios.post('https://api.commerce.naver.com/external/v1/pay-order/seller/product-orders/dispatch', {
    //   dispatchProductOrders: [
    //     {
    //       productOrderId: myProductOrderId,
    //       deliveryMethod: 'DELIVERY',
    //       deliveryCompanyCode: 'EPOST',
    //       trackingNumber: '6892036658750',
    //       dispatchDate: '2023-03-13T20:59:44.118+09:00'
    //     }
    //   ]
    // }, {
    //   headers: {
    //     'Authorization': `Bearer ${token}`,
    //   }
    // })
    // const data = dispatchResult.data;
    return res.send('ok');
  }catch (e) {
    console.log(e)
    next(e)
  }
})

app.use('/api', entrypoint);
app.use(
  '/graphql',
  graphqlHTTP((req, res) => ({
    schema: graphQLSchema,
    graphiql: true,
    context: buildContext({ req, res }),
  }))
);


// 에러 핸들러
app.use(errorHandler);

app.listen(PORT, () => console.log(`Express WAS is listening to port ${PORT}!! 👂`));