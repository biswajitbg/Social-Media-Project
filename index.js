const express = require("express");
const app = express();

const mongoose = require("mongoose");
const route = require('./routes/route')
app.use(express.json())


mongoose.connect("mongodb://localhost:27017/socialmedia-db", {
    useNewUrlParser: true,
})
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err));
    
    app.use("/",route)
  


app.listen(3000, function() {
    console.log("Express app running on port " + 3000);
});

