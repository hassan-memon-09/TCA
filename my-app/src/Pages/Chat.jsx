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
  const [showChatOnMobile, setShowChatOnMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || !user) navigate("/login");
  }, [token, user, navigate]);

  useEffect(() => {
    if (user && token) {
      socket.auth = { userId: user._id };
      socket.connect();
      socket.emit("setup", user);

      socket.on("receive-message", ({ chatId, ...msg }) => {
        if (chatId === selectedUser?.chatId) addMessage(msg);
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
            { headers: { Authorization: `Bearer ${token}` } }
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
    if (!text) return setSearchResults([]);
    if (!token) return navigate("/login");

    try {
      const res = await axios.get(
        `http://localhost:5000/api/v1/auth/users?search=${text}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSearchResults(res.data.users);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  const handleSelectUser = async (u) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/chat",
        { userId: u._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSelectedUser({ ...u, chatId: res.data._id });
      setChats((prev) => [res.data, ...prev.filter((c) => c._id !== res.data._id)]);
      setSearchResults([]);
      setShowChatOnMobile(true);
    } catch (error) {
      console.error("Chat init error:", error);
    }
  };

  const sendMessage = async () => {
    if (!input || !selectedUser || !token) return;

    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/chat/message",
        { chatId: selectedUser.chatId, content: input },
        { headers: { Authorization: `Bearer ${token}` } }
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
      console.error("Send error:", error);
    }
  };

  return (
    <Layout>
      <div className="flex h-screen bg-[#0e1016] text-white overflow-hidden">
        {/* Sidebar */}
        <div
          className={`w-full md:w-1/3 lg:w-1/4 bg-[#1a1d29] flex flex-col transition-all duration-300 ${
            showChatOnMobile ? "hidden md:flex" : "flex"
          }`}
        >
          <div className="p-4 border-b border-[#2d2f3b]">
            <h2 className="text-xl font-bold">Chats</h2>
          </div>

          <div className="p-3">
            <input
              type="text"
              placeholder="Search users..."
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full px-4 py-2 rounded-full border border-gray-600 bg-[#12141c] text-white focus:outline-none"
            />
          </div>

          <div className="overflow-y-auto flex-1 divide-y divide-gray-700">
            {searchResults.length > 0 ? (
              searchResults.map((u) => (
                <div
                  key={u._id}
                  onClick={() => handleSelectUser(u)}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-[#2a2e3d] cursor-pointer"
                >
                  <div className="text-lg bg-indigo-600 rounded-full p-2 text-white font-bold">
                    {u.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold">{u.name}</p>
                  </div>
                </div>
              ))
            ) : chats.length === 0 ? (
              <p className="text-gray-400 text-center py-4">No chats available</p>
            ) : (
              chats.map((chat) => {
                const otherUser = chat.members.find((p) => p._id !== user._id);
                return (
                  <div
                    key={chat._id}
                    onClick={() => {
                      setSelectedUser({ ...otherUser, chatId: chat._id });
                      setShowChatOnMobile(true);
                    }}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-[#2a2e3d] cursor-pointer"
                  >
                    <div className="text-lg bg-indigo-600 rounded-full p-2 text-white font-bold">
                      {otherUser.name[0]}
                    </div>
                    <div>
                      <p className="font-semibold">{otherUser.name}</p>
                      {chat.lastMessage && (
                        <p className="text-sm text-gray-400 truncate w-40">
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

        {/* Chat Area */}
        <div
          className={`flex-1 flex flex-col transition-all duration-300 ${
            showChatOnMobile ? "flex" : "hidden md:flex"
          }`}
        >
          <div className="p-4 border-b border-[#2d2f3b] bg-[#1a1d29] flex items-center gap-3">
            <button
              onClick={() => setShowChatOnMobile(false)}
              className="md:hidden text-sm px-3 py-1 bg-gray-700 rounded-full"
            >
              Back
            </button>
            {selectedUser ? (
              <>
                <div className="text-lg bg-indigo-600 rounded-full p-2 text-white font-bold">
                  {selectedUser.name[0]}
                </div>
                <h3 className="text-lg font-semibold">{selectedUser.name}</h3>
              </>
            ) : (
              <h3 className="text-lg font-semibold">Select a user to start chat</h3>
            )}
          </div>

          <div className="flex-1 p-4 overflow-y-auto bg-[#0e1016]">
            <div className="flex flex-col gap-2 max-w-3xl mx-auto">
              {messages.map((msg) => (
                <div
                  key={msg._id}
                  className={`max-w-[75%] px-4 py-2 rounded-lg text-sm ${
                    msg.sender._id === user._id
                      ? "bg-indigo-600 self-end"
                      : "bg-gray-700 self-start"
                  }`}
                >
                  {msg.content}
                </div>
              ))}
            </div>
          </div>

          {selectedUser && (
            <div className="p-4 border-t border-[#2d2f3b] bg-[#1a1d29] flex items-center gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 rounded-full border border-gray-600 bg-[#12141c] text-white focus:outline-none"
              />
              <button
                onClick={sendMessage}
                className="bg-indigo-600 text-white px-5 py-2 rounded-full hover:bg-indigo-700"
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
