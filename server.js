const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
let newMessageGreeting = {
    id: 0,
    from: "Bart",
    text: "Welcome to CYF chat system!",
  },
  messages = [newMessageGreeting];
console.log(messages);

app.get("/messages", function (req, res) {
  res.send(messages);
});

//get single message by id
app.get("/messages/:messageId", function (req, res) {
  let messageId = req.params.messageId;
  let foundId = messages.find((id) => id.messageId === messageId);
  foundId
    ? res.send(foundId)
    : res.json({ messageId: messageId, message: "message not found" });
});

app.post("/messages", function (req, res) {
  res.send(req.body);
  messages.push(req.body);
});

app.delete("/messages/:messageId", function (req, res) {
  let messageId = req.params.messageId;
  messages = messages.filter((id) => id.messageId !== messageId);
  res.send(messages);
});

let PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log("server running---");
});
