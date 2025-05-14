import React, { useEffect, useState } from "react";
import socket from "../socket";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "../Component/Layout/layout";

const ChatPage = () => {
  const { user, token } = useAuthStore();
  const {
    selectedUser,
    setSelectedUser,
    messages,
    addMessage,
    setMessages,
  } = useChatStore();
  const [input, setInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || !user) {
      navigate("/login");
    }
  }, [token, user, navigate]);

  useEffect(() => {
    if (user && token) {
      socket.auth = { userId: user._id };
      socket.connect();
      socket.emit("setup", user);

      socket.on("receive-message", ({ chatId, ...msg }) => {
        if (chatId === selectedUser?.chatId) {
          addMessage(msg);
        }
        setChats((prev) =>
          prev.map((chat) =>
            chat._id === chatId
              ? { ...chat, lastMessage: { content: msg.content } }
              : chat
          )
        );
      });

      socket.on("error", ({ message }) => {
        console.error("Socket error:", message);
      });

      const fetchChats = async () => {
        try {
          const res = await axios.get("http://localhost:5000/api/v1/chat", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setChats(res.data);
        } catch (error) {
          console.error("Error fetching chats:", error);
        }
      };
      fetchChats();

      return () => {
        socket.off("receive-message");
        socket.off("error");
        socket.disconnect();
      };
    }
  }, [user, token, selectedUser, addMessage]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (selectedUser?.chatId && token) {
        try {
          const res = await axios.get(
            `http://localhost:5000/api/v1/chat/message/${selectedUser.chatId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setMessages(res.data);
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      }
    };
    fetchMessages();
  }, [selectedUser?.chatId, token, setMessages]);

  const handleSearch = async (text) => {
    if (!text) {
      setSearchResults([]);
      return;
    }
    if (!token) {
      console.error("No token available");
      navigate("/login");
      return;
    }
    try {
      const res = await axios.get(
        `http://localhost:5000/api/v1/auth/users?search=${text}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSearchResults(res.data.users);
    } catch (error) {
      console.error("Error searching users:", error);
    }
  };

  const handleSelectUser = async (u) => {
    if (!token) {
      console.error("No token available");
      navigate("/login");
      return;
    }
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/chat",
        { userId: u._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSelectedUser({ ...u, chatId: res.data._id });
      setChats((prev) => [
        res.data,
        ...prev.filter((c) => c._id !== res.data._id),
      ]);
      setSearchResults([]);
    } catch (error) {
      console.error("Error starting chat:", error);
    }
  };

  const sendMessage = async () => {
    if (!input || !selectedUser || !token) return;

    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/chat/message",
        {
          chatId: selectedUser.chatId,
          content: input,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      socket.emit("broadcast-message", {
        senderId: user._id,
        receiverId: selectedUser._id,
        content: input,
        chatId: selectedUser.chatId,
        messageId: res.data._id,
      });

      setInput("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <Layout>
      <div className="flex h-screen bg-gray-100">
        <div className="w-full md:w-1/3 lg:w-1/4 bg-white border-r shadow-sm flex flex-col">
          <div className="p-4 border-b">
            <h2 className="text-2xl font-bold text-gray-800">Chats</h2>
          </div>

          <div className="p-3 border-b">
            <input
              type="text"
              placeholder="Search..."
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none"
            />
          </div>

          <div className="overflow-y-auto flex-1 divide-y">
            {searchResults.length > 0 ? (
              searchResults.map((u) => (
                <div
                  key={u._id}
                  onClick={() => handleSelectUser(u)}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer transition"
                >
                  <div className="text-2xl bg-gray-200 rounded-full p-2">
                    {u.name[0]}
                  </div>
                  <div className="truncate">
                    <p className="font-semibold text-gray-800">{u.name}</p>
                  </div>
                </div>
              ))
            ) : chats.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No chats available</p>
            ) : (
              chats.map((chat) => {
                const otherUser = chat.members.find((p) => p._id !== user._id);
                return (
                  <div
                    key={chat._id}
                    onClick={() =>
                      setSelectedUser({ ...otherUser, chatId: chat._id })
                    }
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer transition"
                  >
                    <div className="text-2xl bg-gray-200 rounded-full p-2">
                      {otherUser.name[0]}
                    </div>
                    <div className="truncate">
                      <p className="font-semibold text-gray-800">
                        {otherUser.name}
                      </p>
                      {chat.lastMessage && (
                        <p className="text-sm text-gray-500 truncate">
                          {chat.lastMessage.content}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b bg-white shadow flex items-center gap-3">
            <div className="text-2xl bg-gray-300 rounded-full p-2">
              {selectedUser ? selectedUser.name[0] : "?"}
            </div>
            <h3 className="text-lg font-semibold text-gray-800">
              {selectedUser ? selectedUser.name : "Select a user to start chat"}
            </h3>
          </div>

          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            <div className="flex flex-col gap-3 max-w-3xl mx-auto">
              {messages.map((msg) => (
                <div
                  key={msg._id}
                  className={`max-w-xs px-4 py-2 rounded-lg text-white text-sm ${
                    msg.sender._id === user._id
                      ? "bg-blue-600 self-end"
                      : "bg-gray-600 self-start"
                  }`}
                >
                  {msg.content}
                </div>
              ))}
            </div>
          </div>

          {selectedUser && (
            <div className="p-4 border-t bg-white flex items-center gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none"
              />
              <button
                onClick={sendMessage}
                className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition"
              >
                Send
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ChatPage;
