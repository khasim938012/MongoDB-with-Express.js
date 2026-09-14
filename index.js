const express = require('express');
const app = express();
const port = 8080;
const mongoose = require('mongoose');
const path = require('path');
const Chat = require('./models/chat.js');


app.set("views",path.join(__dirname, "views"));
app.set("view engine", "ejs");



let chat1 = new Chat({
    from: "Neha",
    to: "Priya",
    msg: "hello",
    create_at: new Date()
});

chat1.save().then((res) => {
    console.log(res);
});

main().then(() => {
    console.log("Connected to MongoDB")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
app.get("/", (req, res) => {
    res.send(" root is working");
});

app.listen(port, () => {
    console.log("Server is running on port " + port);
});