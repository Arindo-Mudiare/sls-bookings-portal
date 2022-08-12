const express = require("express");
const app = express();
require("dotenv").config();
const dbConfig = require("./config/db.config");
app.use(express.json());
const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute");
const passwordResetRoutes = require("./routes/passwordReset");
const WesPasswordResetRoutes = require("./routes/wesPassReset");

app.use("/api/user", userRoute);
app.use("/api/password-reset", passwordResetRoutes);
app.use("/api/admin", adminRoute);
const port = process.env.PORT || 5000;

// app.use(function (err, req, res, next) {
//   res.status(err.status || 500);
//   res.render("error", {
//     message: err.message,
//     error: err,
//   });
// });

app.listen(port, () => console.log(`Node Server Listening on ${port}`));
