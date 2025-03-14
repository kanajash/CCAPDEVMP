const express = require("express");
const app  = express();
var cors = require('cors')
const roomsRoute = require("./routes/roomsRoute")
const usersRoute = require("./routes/usersRoute")
const bookingsRoute = require("./routes/bookingsRoute")

app.use(cors());
app.options('*', cors());
app.use(express.json())  //this is necessary to be added other wise roomid will not be fetched to body


app.use("/api/rooms",roomsRoute)
app.use("/api/users",usersRoute)
app.use("/api/bookings",bookingsRoute)


const dbConfig = require('./db');

const port  = 5000;
app.listen(port, 
   () => console.log(`The server is running ${port}`)
    )
