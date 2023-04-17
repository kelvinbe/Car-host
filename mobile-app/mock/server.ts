const dotenv = require('dotenv');
dotenv.config({
  path: '.env',
});
const { faker } = require('@faker-js/faker');
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('mock/db.json');
const middlewares = jsonServer.defaults();
const rewriter = jsonServer.rewriter(require('./routes.json'));
const db = router.db
server.use(middlewares);
server.use(rewriter);
const jwt = require('jsonwebtoken');
const { isEmpty } = require("lodash")
const Stripe = require("stripe")

// @ts-ignore
const stripe = new Stripe(process.env.STRIPE_TEST_SECRET_KEY,{
  apiVersion: '2022-11-15',
});

server.use((req: any, res: { wrapResponse: boolean; }, next: () => void) => {
  res.wrapResponse = true;
  next();
});

const isSuccessStatus = (statusCode: number) => statusCode >= 200 && statusCode < 300;

router.render = (req: any, res: { wrapResponse: any; json: (arg0: { data: any; status: string; message: string; }) => void; locals: { data: any; }; statusCode: any; }) => {
  if (res.wrapResponse) {
    res.json({
      data: res.locals.data,
      status: isSuccessStatus(res.statusCode) ? 'success' : 'error',
      message: isSuccessStatus(res.statusCode) ? 'Success' : 'An error occurred',
    });
  } else {
    res.json(res.locals.data);
  }
};

server.get("/users", (req: { query: { user_id: any; handle: any; }; headers: { authorization: string; }; }, res: { json: (arg0: { data: any; status: string; message: string; }) => void; })=> {

    const requested_id = req.query.user_id
    const handle = req.query.handle
    if (handle){ 
      const user = db.get("users").find({handle}).value()
      res.json({
        data: !isEmpty(user),
        status: "success",
        message: "Success"
      })
    } else if (requested_id){
      const user = db.get("users").find({id: requested_id}).value()
      res.json({
        data: user,
        status: "success",
        message: "Success"
      })
    } else {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.decode(token);
      const uid = decoded.user_id;
      const exists = db.get("users").find({uid}).value()
      if(isEmpty(exists)){
        // replace the first host user's id with the new user's id
          const customer = db.get("users").find({user_type: "CUSTOMER"}).value()
          db.get("users").find({uid: customer.uid}).assign({uid}).write()
      } 
      res.json({
          data: db.get("users").find({uid}).value(),
          status: "success",
          message: "Success"
      })
    }

    
})

server.post("/users", (req: { headers: { authorization: string; }; body: any; }, res: { json: (arg0: { data: any; status: string; message: string; }) => void; })=>{
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.decode(token);
    const uid = decoded.user_id;
    const exists = db.get("users").find({uid}).value()
    if(isEmpty(exists)){
        // replace the first host user's id with the new user's id
        const customer = db.get("users").find({user_type: "CUSTOMER"}).value()
        db.get("users").find({uid: customer.uid}).assign({uid}).write()
    } else {
        db.get("users").find({uid}).assign(req.body).write()
    }
    res.json({
        data: db.get("users").find({uid}).value(),
        status: "success",
        message: "Success"
    })
})

server.patch("/users", (req: { headers: { authorization: string; }; body: any; }, res: { json: (arg0: { data: any; status: string; message: string; }) => void; })=>{
  const token = req?.headers?.authorization?.split(" ")[1];
    const decoded = jwt.decode(token);
    const uid = decoded?.user_id;
    const exists = db.get("users").find({uid}).value()
    if(isEmpty(exists)){
        // replace the first host user's id with the new user's id
        const customer = db.get("users").find({user_type: "CUSTOMER"}).value()
        db.get("users").find({uid: customer.uid}).assign({uid}).write()
        // get the user
        const user = db.get("users").find({uid}).value()
        // update the user
        db.get("users").find({uid}).assign(req.body).write()
    } else {
        db.get("users").find({uid}).assign(req.body).write()
    }
    res.json({
        data: db.get("users").find({uid}).value(),
        status: "success",
        message: "Success"
    })
})

server.get("/users/onboarding", (req: { headers: { authorization: string; }; }, res: { json: (arg0: { data: {}; status: string; message: string; }) => void; })=>{
  if(isEmpty(req.headers.authorization)) return res.json({
    data: {},
    status: "error",
    message: "No authorization header"
  })
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.decode(token);
  const uid = decoded.user_id;
  const exists = db.get("users").find({uid}).value()
  let onboarding = {}
  if(isEmpty(exists)){
      // replace the first customer user's id with the new user's id
      const customer = db.get("users").find({user_type: "CUSTOMER"}).value()
      db.get("users").find({uid: customer.uid}).assign({uid}).write()
      // get the user
      const user = db.get("users").find({uid}).value()
      // get onboarding detials
      onboarding = {
        completed: {
          location: true,
          payment_method: true,
          drivers_license: true,
        }
      }
  } else {
      const user = db.get("users").find({uid}).value()
      onboarding = {
        completed: {
          location: true,
          payment_method: true,
          drivers_license: true,
        }
      }
  }
    res.json({
      data: onboarding,
      status: "success",
      message: "Success"
    })
})

server.patch("/users/settings", (req: any, res: { json: (arg0: { data: string; message: string; status: string; }) => void; })=>{
  res.json({
    data: "",
    message: "Success",
    status: "success"
  })
})

server.post("/settings/tokens", (req: any, res: { json: (arg0: { data: string; message: string; status: string; }) => void; })=>{
  res.json({
    data: "",
    message: "Success",
    status: "success"
  })
})

server.post("/paymenttypes", (req: any, res: { json: (arg0: { data: string; message: string; status: string; }) => void; })=>{
  res.json({
    data: "",
    message: "Success",
    status: "success"
  })
})

server.use(router);
server.listen(3003, () => {
  console.log('JSON Server is running on port 3003');
});
