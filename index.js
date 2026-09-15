const express = require('express');
const app = express();
const port = 8080;
const mongoose = require('mongoose');
const path = require('path');
const Chat = require('./models/chat.js');
const methodOverride = require("method-override");


app.set("views",path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));



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
//index route
app.get("/chats", async (req, res) => {
   let chats = await Chat.find();
    console.log(chats);
   res.render("index.ejs", { chats: chats });
});

//new route
app.get("/chats/new", (req, res) => {
    res.render("new.ejs");
});

//create route
app.post("/chats", (req, res) => {
    let { from, to, msg } = req.body;
    let newChat = new Chat({
        from: from,
        to: to,
        msg: msg,
        create_at: new Date()
    });
    newChat.save().then((res) => {
        console.log("chat created successfully");
    })
    .catch((err) => {
        console.log(err);
    });
    res.redirect("/chats");
});


//Edit Route
app.get("/chats/:id/edit",async (req,res) =>{
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs",{chat});
})
app.get("/", (req, res) => {
    res.send(" root is working");
});


//Update Route

app.put("/chats/:id", async (req,res) => {
    let {id} = req.params;
    let {msg: newMsg} = req.body;
    let updatedChat = await Chat.findByIdAndUpdate(
        id,
        {msg: newMsg},
        {runValidators: true, new: true}
    );
    console.log(updatedChat);
    res.redirect("/chats");
});


//Delete Route

app.delete("/chats/:id", async (req,res) => {
    let {id} = req.params;
    let deleteChat = await Chat.findByIdAndDelete(id);
    console.log(deleteChat);
    res.redirect("/chats");
});
app.listen(port, () => {
    console.log("Server is running on port " + port);
});