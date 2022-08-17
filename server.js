const express = require("express");
const app = express();
require("dotenv").config();
const dbConfig = require("./config/db.config");
app.use(express.json());
const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute");
const passwordResetRoutes = require("./routes/passwordReset");
const path = require("path");
// import sslRedirect from "heroku-ssl-redirect.js";
// const WesPasswordResetRoutes = require("./routes/wesPassReset");
// const cors = require("cors");

// enable ssl redirect
// app.use(sslRedirect());
// const corsOptions = {
//   origin: "http://localhost:8080",
//   credentials: true, //access-control-allow-credentials:true
//   optionSuccessStatus: 200,
// };
// app.use(cors(corsOptions));

app.use(function (req, res, next) {
  if (req.header("x-forwarded-proto") === "http") {
    res.redirect(301, "https://" + req.hostname + req.url);
    return;
  }
  next();
});

app.use("/api/user", userRoute);
app.use("/api/password-reset", passwordResetRoutes);
app.use("/api/admin", adminRoute);

// app.use(function (err, req, res, next) {
//   res.status(err.status || 500);
//   res.render("error", {
//     message: err.message,
//     error: err,
//   });
// });

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client/build/index.html"));
  });
}

const port = process.env.PORT || 5000;

app.get("/", (req, res) => res.send("Sls Bookings Loading.."));
app.listen(port, () => console.log(`Node Server Listening on ${port}`));
