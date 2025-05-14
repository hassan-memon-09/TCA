import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./Routes/AuthRoute.js";
import chatRoutes from "./Routes/ChatRoute.js";
import http from "http";
import { Server } from "socket.io";

// Load env variables
dotenv.config();

// Create express app and HTTP server
const app = express();
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// Socket.IO logic
io.on("connection", (socket) => {
  console.log("🟢 New client connected:", socket.id);

  socket.on("setup", (user) => {
    if (user?._id) {
      socket.join(user._id);
      console.log(`User ${user._id} joined their room`);
    }
  });

  socket.on(
    "broadcast-message",
    ({ senderId, receiverId, content, chatId, messageId }) => {
      // Broadcast the message to both sender and receiver
      io.to(senderId)
        .to(receiverId)
        .emit("receive-message", {
          _id: messageId,
          sender: { _id: senderId },
          content,
          chat: chatId,
          chatId,
        });
    }
  );

  socket.on("disconnect", () => {
    console.log("🔴 Client disconnected:", socket.id);
  });
});

// Middleware
app.use(cors({ origin: "http://localhost:5173" }));
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/chat", chatRoutes);

app.get("/", (req, res) => {
  res.send("Chat app backend running!");
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
};

startServer();
