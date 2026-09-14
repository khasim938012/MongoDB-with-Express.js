const mongoose = require('mongoose');

const Chat = require('./models/chat.js');


main().then(() => {
    console.log("Connected to MongoDB")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

let allchats =[
    {
        from: "Neha",
        to: "Priya",
        msg: "hello",
        create_at: new Date()
    },
    {
        from: "maya",
        to: "Priya",
        msg: "hmmm",
        create_at: new Date()
    },
    {
        from: "sneha",
        to: "Priya",
        msg: "hi",
        create_at: new Date()
    }
]

Chat.insertMany(allchats);
