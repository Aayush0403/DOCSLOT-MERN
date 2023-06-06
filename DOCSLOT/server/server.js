const express=require('express');
const colors=require('colors');
const morgan=require('morgan')
const dotenv=require('dotenv');
const connectDB = require('./config/db');
const cors=require('cors')

const app=express();
dotenv.config();

connectDB();

//middlewares
app.use(express.json())
app.use(morgan('dev'))
 

//routes

app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/admin", require("./routes/adminRoutes"));
app.use("/api/v1/doctor", require("./routes/doctorRoutes"));

//port
const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(
    `Server Running in ${process.env.NODE_MODE} Mode on port ${process.env.PORT}`
      .bgCyan.white
  );
});