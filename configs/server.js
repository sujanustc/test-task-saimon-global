const express = require("express");
const app = express();
var bodyParser = require('body-parser')
require("dotenv").config();
const port = process.env.PORT || 9999;


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use("/", require("../routes"))
app.use((req, res) => {
    res.status(404).json({ status: false, error: "No Routes Found!" })
})


app.listen(port, () => console.log(`Server is running at http://localhost:${port}`));





// const path = require("path");


// const crossUnblocker = require("../middileware/cros-unblocker");
// // process.env.TZ="Africa/Accra"

// // Cross Unblocked File..
// const cors = require("cors");
// const errorHandler = require("../middileware/error-handler");
// const middlewareRoot = require("../middileware/middlewareRoot");

// // app.use(crossUnblocker.allowCross)
// app.use(cors());
// app.use(express.json({ limit: "50mb" }));
// app.use(express.urlencoded({ limit: "50mb", extended: true }));



// app.use(middlewareRoot);

// app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// app.use("/", require("../routes"))


// app.use(errorHandler.route);
// app.use(errorHandler.next);


