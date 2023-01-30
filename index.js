const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const port = process.env.PORT || 5000;
const app = express();

// middleware
app.use(cors());
app.use(express.json());
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

//db user
const uri = `mongodb+srv://power-hack:power-hack@cluster0.svbs0rh.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    // collection all product
    const powerHackCollection = client
      .db("power-hack")
      .collection("powerHackUser");

    // booking collection
    // const bookingsCollection = client.db('power-hack').collection('bookings')

    // const paymentCollections = client.db('power-hack').collection('payment')

    // jwt
    app.get("/jwt", async (req, res) => {
      const email = req.query.email;
      const query = { email: email };
      const user = await usersCollections.findOne(query);
      res.send({ accessToken: "token" });
    });

    app.get("/billing-list", async (req, res) => {
      const query = {};
      const result = await powerHackCollection.find(query).toArray();
      res.send(result);
    });

    // add-billing
    app.post("/add-billing", async (req, res) => {
      const billingData = req.body;
      const data = await powerHackCollection.insertOne(billingData);
      res.send(data);
    });

    // update-billing/:id
    app.put("/update-billing/:id", async (req, res) => {
      const id = req.params.id;
      const data = req.body;
      const filter = { _id: ObjectId(id) };
      const option = { upsert: true };
      const upDoc = {
        $set: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          amount: data.amount,
          bilId: data.bilId,
        },
      };

      const updateData = await powerHackCollection.updateOne(
        filter,
        upDoc,
        option
      );
      res.send(updateData);
    });



    // delete-billing/:id
    app.delete("/delete-billing/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await powerHackCollection.deleteOne(query);
      res.send(result);
    });






    // create a payment intent
    // app.post('/create-payment-intent',async(req,res)=>{
    //     const price = req.body.seller_price;
    //     const amount = price * 100
    //     const paymentIntent = await stripe.paymentIntents.create({
    //     currency: "usd",
    //     amount: amount,
    //     "payment_method_types": [
    //         "card"

    //     ]

    //     });
    //     res.send({
    //     clientSecret: paymentIntent.client_secret,
    //     });
    // })

    // payment data stored in database
    // app.post('/payments',async(req,res)=>{
    //     const payment = req.body

    //     // inject data in payment collectioon
    //     const id = payment.productId;
    //     const filter = {_id: ObjectId(id)}
    //     const option = {upsert: true}
    //     const result = await paymentCollections.insertOne(payment)
    //     const updatedDoc = {
    //         $set:{

    //             status:"sold",
    //             advertiseShow: false,
    //             paid: true,

    //         }

    //     }

    // const updatedProducts = await allProduct.updateOne(filter,updatedDoc, option)

    //     res.send(result)
    // })
  } finally {
  }
}
run().catch(console.dir);

app.get("/", async (req, res) => {
  res.send("power hack");
});

app.listen(port, () => console.log(`power-hack running ${port}`));

// pi_3M94OqK3PnW9JuEr0WSMhpWF :myTransactionId
