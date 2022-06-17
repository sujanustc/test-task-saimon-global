const mongoose = require("mongoose");
mongoose
    .connect("mongodb://localhost:27017/test-saimonglobal")
    .then(() => {
        console.log("Connected to mongoDB");
    })
    .catch((err) => {
        console.error("Oops! Could not connect to mongoDB Cluster0", err);
    });