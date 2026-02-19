const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
  {
    groupTitle: {
      type: String, // write bcz it easy through access filter arrayu otherwise it difficult
    },
    members: {
      type: Array, // bcz two member sender & reciever
    },
    lastMessage: {
      type: String,
    },
    lastMessageId: {
      type: String, // its means user sending & login user
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Conversation", conversationSchema);
