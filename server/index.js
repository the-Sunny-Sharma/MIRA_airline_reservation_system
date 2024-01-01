const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const adminCredentials = require("./adminCredentials");

const app = express();
app.use(cors());
app.use(express.json());

// post request coming from user end
app.post("/saveUserInfo", (req, res) => {
  const url = "mongodb://0.0.0.0:27017";
  const client = new MongoClient(url);
  const db = client.db("synairline");
  const coll = db.collection("userDetails");
  const record = {
    name: req.body.name,
    age: req.body.age,
    country: req.body.country,
    state: req.body.state,
    city: req.body.city,
    email: req.body.email,
    password: req.body.password,
    mobile: req.body.mobile,
    address: req.body.address,
  };
  coll
    .insertOne(record)
    .then((result) => {
      res.send(result);
      console.log("New User : " + req.body.name + "\nRegistered successfully");
    })
    .catch((error) => res.send(error));
});

//get request from user end(retrives name)
app.get("/getUserInfo", (req, res) => {
  const url = "mongodb://0.0.0.0:27017";
  const client = new MongoClient(url);
  const db = client.db("synairline");
  const coll = db.collection("userDetails");
  const email = req.query.email;
  coll
    .findOne({ email: email })
    .then((result) => {
      res.send(result);
      console.log(email + " Logged in detected.");
    })
    .catch((error) => res.send(error));
});

//get request from admin end to fetch all user details
app.get("/admin/getUserDetails", (req, res) => {
  const url = "mongodb://0.0.0.0:27017";
  const client = new MongoClient(url);
  const db = client.db("synairline");
  const coll = db.collection("userDetails");
  coll
    .find({})
    .toArray()
    .then((result) => {
      console.log("User Details:");
      result.forEach((user) => {
        console.log(user); // Log each flight details object
      });
      res.send(result);
    })
    .catch((error) => res.send(error));
});

//delete request from admin to delete a specific user
app.delete("/admin/rmUserDetails", (req, res) => {
  const url = "mongodb://0.0.0.0:27017";
  const client = new MongoClient(url);
  const db = client.db("synairline");
  const coll = db.collection("userDetails");
  const data = { email: req.body.email };
  coll
    .deleteOne(data)
    .then((result) => {
      res.send(result);
      console.log("User " + req.body.email + " removed");
    })
    .catch((error) => res.send(error));
});

// Endpoint to authenticate admin credentials
app.post("/admin/login", (req, res) => {
  const { id, password } = req.body;

  if (id === adminCredentials.id && password === adminCredentials.password) {
    // Credentials match
    res.send("Admin authenticated successfully.");
    console.log("Admin Login Activity detected");
  } else {
    // Invalid credentials
    res.send("Invalid Credentials.");
    console.log("Unauthorized access rejected");
  }
});

app.post("/admin/addFlight", (req, res) => {
  const url = "mongodb://0.0.0.0:27017";
  const client = new MongoClient(url);
  const db = client.db("synairline");
  const coll = db.collection("flightDetails");
  const record = {
    flightNumber: req.body.flightNumber,
    airline: req.body.airline,
    departTime: req.body.departTime,
    source: req.body.source,
    arrivalTime: req.body.arrivalTime,
    destination: req.body.destination,
    duration: req.body.flightDuration,
    economySeatPrice: req.body.economySeatPrice,
    businessSeatPrice: req.body.businessSeatPrice,
    availableSeats: req.body.availableSeats,
  };
  coll
    .insertOne(record)
    .then((result) => {
      res.send(result);
      console.log(
        "Flight Number: " +
          req.body.flightNumber +
          " Added successfully into database."
      );
    })
    .catch((error) => res.send(error));
});

app.post("/addBookingDetails", (req, res) => {
  const url = "mongodb://0.0.0.0:27017";
  const client = new MongoClient(url);
  const db = client.db("synairline");
  const coll = db.collection("bookingDetails");
  const record = {
    flightNumber: req.body.flightNumber,
    airline: req.body.airline,
    departTime: req.body.departTime,
    source: req.body.source,
    arrivalTime: req.body.arrivalTime,
    destination: req.body.destination,
    payment: req.body.payment,
    name: req.body.name,
    email: req.body.email,
    mobile: req.body.mobile,
    currentDate: req.body.currentDate,
  };
  coll
    .insertOne(record)
    .then((result) => res.send(result))
    .catch((error) => res.send(error));
});

app.get("/admin/getBookingDetails", (req, res) => {
  const url = "mongodb://0.0.0.0:27017";
  const client = new MongoClient(url);
  const db = client.db("synairline");
  const coll = db.collection("bookingDetails");
  coll
    .find({})
    .toArray()
    .then((result) => res.send(result))
    .catch((error) => res.send(error));
});

app.delete("/admin/deleteBooking", (req, res) => {
  const url = "mongodb://0.0.0.0:27017";
  const client = new MongoClient(url);
  const db = client.db("synairline");
  const coll = db.collection("bookingDetails");
  const data = { flightNumber: req.body.flightNumber, email: req.body.email };
  coll
    .deleteOne(data)
    .then((result) => {
      res.send(result);
      console.log(
        "Booking cancelled by " +
          req.body.email +
          " for flight number : " +
          req.body.flightNumber
      );
    })
    .catch((error) => res.send(error));
});

app.get("/admin/getFlightDetails", (req, res) => {
  const url = "mongodb://0.0.0.0:27017";
  const client = new MongoClient(url);
  const db = client.db("synairline");
  const coll = db.collection("flightDetails");
  coll
    .find({})
    .toArray()
    .then((result) => {
      console.log("Flight Details:");
      result.forEach((flight) => {
        console.log(flight); // Log each flight details object
      });

      res.send(result);
    })
    .catch((error) => res.send(error));
});

app.delete("/admin/rmFlight", (req, res) => {
  const url = "mongodb://0.0.0.0:27017";
  const client = new MongoClient(url);
  const db = client.db("synairline");
  const coll = db.collection("flightDetails");
  const data = { flightNumber: req.body.flightNumber };
  coll
    .deleteOne(data)
    .then((result) => {
      res.send(result);
      console.log("Flight " + req.body.flightNumbe + " deleted.");
    })
    .catch((error) => res.send(error));
});

app.get("/getFare", (req, res) => {
  const url = "mongodb://0.0.0.0:27017";
  const client = new MongoClient(url);
  const db = client.db("synairline");
  const coll = db.collection("flightDetails");

  const source = req.query.source;
  const destination = req.query.destination;
  const departDate = req.query.departDate;

  coll
    .aggregate([
      {
        $match: {
          source: source,
          destination: destination,
          departTime: { $regex: new RegExp(`^${departDate}`) }, // Match departTime with the given departDate
        },
      },
      {
        $project: {
          flightNumber: 1,
          airline: 1,
          departTime: 1,
          arrivalTime: 1,
          source: 1,
          destination: 1,
          duration: 1,
          economySeatPrice: 1,
          businessSeatPrice: 1,
          availableSeats: 1,
          _id: 0, // Exclude _id field from the output
        },
      },
    ])
    .toArray()
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
});

app.get("/admin/getTicket", (req, res) => {
  const url = "mongodb://0.0.0.0:27017";
  const client = new MongoClient(url);
  const db = client.db("synairline");
  const coll = db.collection("flightDetails");

  const airline = req.query.airline;
  const source = req.query.source;
  const destination = req.query.destination;
  const departDate = req.query.departDate;

  let matchQuery = {
    source: source,
    destination: destination,
    departTime: { $regex: new RegExp(`^${departDate}`) }, // Match departTime with the given departDate
  };

  if (airline !== "All") {
    matchQuery.airline = airline; // Include the specific airline in the query
  }

  coll
    .aggregate([
      {
        $match: matchQuery, // Use the updated match query based on 'airline' value
      },
      {
        $project: {
          flightNumber: 1,
          airline: 1,
          departTime: 1,
          arrivalTime: 1,
          source: 1,
          destination: 1,
          duration: 1,
          economySeatPrice: 1,
          businessSeatPrice: 1,
          availableSeats: 1,
          _id: 0, // Exclude _id field from the output
        },
      },
    ])
    .toArray()
    .then((result) => {
      if (result.length === 0) {
        // res.status(404).send("No flights available for the given criteria");
        // res.send("No flights available for the given criteria");
        console.log("No flights available for the given criteria");
      }
      res.send(result);
      console.log("Result:", result);

      // if (result.length === 0) {
      //   // res.status(404).send("No flights available for the given criteria");
      //   // res.send("No flights available for the given criteria");
      //   console.log("No flights available for the given criteria");
      // } else {
      //   res.send(result);
      // }
    })
    .catch((err) => {
      // res.send(err);
      console.error("Error fetching flights:", err);
      // res.status(500).send("Error fetching flights");
    });
});

app.listen(9000, () => {
  console.log("ready to serve @ 9000");
});
