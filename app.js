const express = require("express");
const dotenv = require("dotenv");
const userRouter = require("./src/routes/user.route");
const contactRouter = require("./src/routes/contact.route");

dotenv.config();
const app = express();

const db = require("./models/index");
db.sequelize
  .sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch(err => {
    console.log("Failed to sync db: " + err.message);
  });
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/contact", contactRouter);

app.listen(process.env.PORT || "9000", () => {
  console.log(`Server is running on port ${process.env.PORT}.`);
});
