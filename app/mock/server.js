const dotenv = require('dotenv');
const admin = require('firebase-admin');
const serviceAccount = require('./test-service-key.json');
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

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY,{
  apiVersion: '2022-11-15',
});

// firebase app
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

const app = admin.app();
const auth = admin.auth(app);

server.use((req, res, next) => {
  res.wrapResponse = true;
  next();
});

const isSuccessStatus = (statusCode) => statusCode >= 200 && statusCode < 300;

router.render = (req, res) => {
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

server.get("/users", (req, res)=> {

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

      res.json({
          data: db.get("users").value()[0],
          status: "success",
          message: "Success"
      })
    }

    
})

server.post("/users", (req, res)=>{
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.decode(token);
    const uid = decoded.user_id;
    const exists = db.get("users").find({uid}).value()
    if(isEmpty(exists)){
        // replace the first host user's id with the new user's id
        const hostUser = db.get("users").find({user_type: "HOST"}).value()
        db.get("users").find({uid: hostUser.uid}).assign({uid}).write()
    } else {
        db.get("users").find({uid}).assign(req.body).write()
    }
    res.json({
        data: db.get("users").find({uid}).value(),
        status: "success",
        message: "Success"
    })
})

server.patch("/users", (req, res)=>{
  const token = req?.headers?.authorization?.split(" ")[1];
    const decoded = jwt.decode(token);
    const uid = decoded?.user_id;
    const exists = db.get("users").find({uid}).value()
    if(isEmpty(exists)){
        // replace the first host user's id with the new user's id
        const hostUser = db.get("users").find({user_type: "HOST"}).value()
        db.get("users").find({uid: hostUser.uid}).assign({uid}).write()
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

server.get("/users/onboarding", (req, res)=>{
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.decode(token);
  const uid = decoded.user_id;
  const exists = db.get("users").find({uid}).value()
  let onboarding = {}
  if(isEmpty(exists)){
      // replace the first host user's id with the new user's id
      const hostUser = db.get("users").find({user_type: "HOST"}).value()
      db.get("users").find({uid: hostUser.uid}).assign({uid}).write()
      // get the user
      const user = db.get("users").find({uid}).value()
      // get onboarding detials
      onboarding = {
        completed: {
          location: user.is_admin ? true : !isEmpty(user.sub_market_id) || !isEmpty(user.market_id),
          payout_method: true, //!isEmpty(user.PayoutMethods), // this won't get updated, so for testing you can turn it to true or false
          profile: user.is_admin ? true : !isEmpty(user.fname) || !isEmpty(user.lname) || !isEmpty(user.handle),
        }
      }
  } else {
      const user = db.get("users").find({uid}).value()
      onboarding = {
        completed: {
          location: user.is_admin ? true : !isEmpty(user.sub_market_id) || !isEmpty(user.market_id),
          payout_method: user.is_admin ? true : !isEmpty(user.PayoutMethods),
          profile: user.is_admin ? true : !isEmpty(user.fname) || !isEmpty(user.lname) || !isEmpty(user.handle),
        }
      }
  }
    res.json({
      data: onboarding,
      status: "success",
      message: "Success"
    })
})


/**
 * @description accepting invites
 */
server.get("/users/admin/accept", (req, res)=>{
  console.log("Here is the body::", req.data)
  // get the user
  return auth.getUserByEmail(req.query.email).then(async (user)=>{
    await auth.createCustomToken(user.uid).then((token)=>{
      res.status(200).json({
        data: token,
        status: "success",
        message: "Success"
      })
    }).catch((e)=>{
      res.status(500).json({
        data: e,
        status: "error",
        message: "An error occurred"
      })
    })
  }).catch((e)=>{
    res.status(500).json({
      data: e,
      status: "error",
      message: "An error occurred"
    })
  })
})


/**
 * send out an invite
 */

server.post("/users/admin/invite", (req, res)=>{
  return res.json({
    data: "Invite sent",
    message: "invite sent",
    status: "success"
  })
})

server.post("/payouts", (req, res)=>{
  return stripe.accounts.create({
    country: 'US',
    type: 'express',
    capabilities: {card_payments: {requested: true}, transfers: {requested: true}},
  }).then((account)=>{
    return stripe.accountLinks.create({
      account: account.id,
      refresh_url: 'http://localhost:3000/onboarding',
      return_url: 'http://localhost:3000/onboarding/stripe',
      type: 'account_onboarding',
    }).then((link)=>{
      res.status(200).send({
        data: link,
        message: "Success",
        status: "success"
      })
    }).catch((e)=>{
      res.status(500).send({
        data: e,
        message: "An error occurred",
        status: "error"
      })
    })
  }).catch((e)=>{
    res.status(500).send({
      data: e,
      message: "An error occurred",
      status: "error"
    })
  })
})
server.patch("/payouts", (req, res)=>{
  res.json({
    data: "",
    message: "Success",
    status: "success"
  })
})
server.patch("/users/settings", (req, res)=>{
  res.json({
    data: "",
    message: "Success",
    status: "success"
  })
})

server.use(router);
server.listen(4000, () => {
  console.log('JSON Server is running on port 4000');
});
