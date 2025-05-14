import Chat from "../models/chatModel.js";
import Message from "../models/messageModel.js";

export const accessChat = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).send({ message: "User ID is required" });
  }

  let chat = await Chat.findOne({
    members: { $all: [req.user._id, userId] },
  }).populate("members", "-password");

  if (!chat) {
    chat = await Chat.create({
      members: [req.user._id, userId],
    });
    chat = await chat.populate("members", "-password");
  }

  res.send(chat);
};

export const sendMessage = async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    return res
      .status(400)
      .send({ message: "Content and chat ID are required" });
  }

  const message = await Message.create({
    sender: req.user._id,
    content,
    chat: chatId,
  });

  await Chat.findByIdAndUpdate(chatId, { lastMessage: message._id });

  res.send(await message.populate("sender", "name"));
};

export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId }).populate(
      "sender",
      "name"
    );
    res.send(messages);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error fetching messages",
      error: error.message,
    });
  }
};

export const getUserChats = async (req, res) => {
  try {
    const chats = await Chat.find({
      members: req.user._id,
    })
      .populate("members", "name email")
      .populate("lastMessage")
      .sort({ updatedAt: -1 });

    res.status(200).send(chats);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error fetching chats",
      error: error.message,
    });
  }
};
