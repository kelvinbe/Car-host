const Stripe = require("stripe")
const ngrok = require("ngrok")
const cors = require('cors');
const dotenv = require('dotenv');
const admin = require('firebase-admin');
const serviceAccount = require('./test-service-key.json');
dotenv.config({
  path: 'mock/.env',
});
const { faker } = require('@faker-js/faker');
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('mock/db.json');

const middlewares = jsonServer.defaults({
  noCors: true
});


server.use(middlewares);
server.all('*',(req, res, next)=>{
  if(req.method === "OPTIONS"){
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE")
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, Origin, X-Requested-With, Accept, x-user, x-payment-auth, ngrok-skip-browser-warning")
    res.sendStatus(204)
  }else{
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE")
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, Origin, X-Requested-With, Accept, x-user, x-payment-auth, ngrok-skip-browser-warning")
    next()
  }

})

const rewriter = jsonServer.rewriter(require('./routes.json'));
server.use(rewriter);

const db = router.db

const jwt = require('jsonwebtoken');
const { isEmpty, sumBy, range, uniq } = require("lodash");
const dayjs = require('dayjs')

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
          data: db.get("users").value().filter(({user_type})=> user_type === "HOST")[0],
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
          payout_method: true,//user.is_admin ? true : !isEmpty(user.PayoutMethods),
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


server.post("/payouts/mpesa", (req, res)=>{
  return res.json({
    data: null,
    message: "PROCESSING",
    status: "success"
  })
})

server.post("/payouts/mtn", (req, res)=>{
  return res.json({
    data: null,
    message: "PROCESSING",
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

server.put("/settings", (req, res)=>{
  res.json({
    data: "",
    message: "Success",
    status: "success"
  })
})

server.get("/earnings", (req, res)=>{
  const token = req.headers.authorization.split(" ")[1];
  const uid =jwt.decode(token).user_id
  const user = db.get('users').find({uid}).value();
  const reservations=db.get('reservations').value();
  if(!user) return null
  const time_range = req.query.time_range;
  const earnings= reservations.filter(reservation=>reservation.vehicle.user_id===user.id).map((reservation)=>{
    return {
        month: dayjs(reservation.created_at).format('MMMM'),
        year: new Date(reservation.created_at).getFullYear(),
        amount: reservation.payment?.amount ?? 0,
        vehicle_id: reservation.vehicle_id,
    }
}) 
const currentMonth = dayjs().month();
const monthsArr = range(currentMonth + 1);
const months = monthsArr.map((month) => dayjs().month(month).format("MMMM"));
const years = uniq(earnings.map((earning)=>earning.year))
const vehicleEarnings = earnings.filter((earning)=>earning.vehicle_id === req.query.vehicle_id);

let userEarnings = [];
if(time_range==='monthly'){
  userEarnings = [...months.map((month)=>{
    return{
      name: month,
      value: sumBy(vehicleEarnings.filter((earning)=>earning.month===month), (item)=>item.amount)
    }
  }), {name: "",}]
}

if(time_range==="yearly"){
  userEarnings = years.map((year)=>{
    return{
      name: year,
      value: sumBy(vehicleEarnings.filter((earning)=>earning.year===year), (item)=>item.amount)
    }
  })
}

res.json({
  data: userEarnings,
  message: "success",
  status: "success"
})
})

server.use(router);
if(!process.env.NGROK_AUTH_TOKEN){
  console.log(`
      ❗❗ IMPORTANT ❗❗
      You need to set the NGROK_AUTH_TOKEN environment variable if u are using code spaces if not 
      ignore this message
  `)
}else{
  ngrok.authtoken(process.env.NGROK_AUTH_TOKEN)
  ngrok.connect(4000).then((url)=>{
    console.log(`
     ❗❗ IMPORTANT ❗❗
      Running the mock server means you are in test mode:
      
      COPY THIS URL: ${url}
      AND PASTE IT IN THE .env(the one in the root) file as the value for the **NEXT_PUBLIC_API_DOMAIN** variable
      
      the requests made by the client will not work if you don't do this
  
      ❗Don't commit the .env file to git
    `)
  })
}
server.listen(4000, () => {
  console.log('JSON Server is running on port 4000');
});
