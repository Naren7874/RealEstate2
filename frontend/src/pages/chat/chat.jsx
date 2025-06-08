import { useState, useEffect, useContext, useRef } from "react";
import "./chat.scss";
import { AuthContext } from "../../context/AuthContext";
import apiReq from "../../lib/apiReq";
import { format } from "timeago.js";
import { SocketContext } from "../../context/SocketContext";

function Chat({ openChatId }) {
  const [chat, setChat] = useState(null);
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { currentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { socket } = useContext(SocketContext);
  const messageEndRef = useRef();

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        setError(null);
        setLoading(true);
        const res = await apiReq.get("/chats");
        setChats(res.data);
        
        if (openChatId) {
          const foundChat = res.data.find(c => c.id === openChatId);
          if (foundChat) {
            setChat(foundChat);
          }
        }
      } catch (err) {
        setError("Failed to load chats. Please try again.");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchChats();
  }, [openChatId]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (chat) {
          const res = await apiReq.get(`/chats/${chat.id}`);
          setMessages(res.data.messages);
          // Mark as read when opened
          if (!chat.seenBy.includes(currentUser.id)) {
            await apiReq.put(`/chats/read/${chat.id}`);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchMessages();

    // Polling for new messages (replace with WebSocket in production)
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, [chat, currentUser.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !chat) return;

    try {
      const res = await apiReq.post(`/messages/${chat.id}`, {
        text: newMessage,
      });
      setMessages([...messages, res.data]);
      setNewMessage("");

      // Update the chats list to show the new message
      setChats((prev) =>
        prev.map((c) =>
          c.id === chat.id
            ? {
                ...c,
                lastMessage: newMessage,
                updatedAt: new Date().toISOString(),
              }
            : c
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="chat">
      {error && <div className="error-message">{error}</div>}
      
      {/* Chat list - always visible */}
      <div className="messages">
        <h1>Messages</h1>
        {loading ? (
          <p>Loading chats...</p>
        ) : chats.length === 0 ? (
          <p>No chats yet. Start a conversation!</p>
        ) : (
          chats.map((c) => {
            const receiver = c.userIDs.find(id => id !== currentUser.id);
            const receiverDetails = c.receiver || {};
            const unreadCount = c.userIDs.includes(currentUser.id) && 
                             !c.seenBy.includes(currentUser.id) ? 1 : 0;
            
            return (
              <div
                className="message"
                key={c.id}
                onClick={() => setChat(c)}
                style={{
                  backgroundColor: chat?.id === c.id ? "rgba(229, 194, 104, 0.2)" : "white",
                }}
              >
                {unreadCount > 0 && (
                  <span className="unread-badge">{unreadCount}</span>
                )}
                <img
                  src={receiverDetails?.avatar || "/noavatar.jpg"}
                  alt={receiverDetails?.username}
                />
                <div className="message-info">
                  <span>{receiverDetails?.username || "Unknown User"}</span>
                  <p>
                    {c.lastMessage?.length > 30
                      ? c.lastMessage.substring(0, 30) + "..."
                      : c.lastMessage || "No messages yet"}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
      
      {/* Chat box - appears on top when a chat is selected */}
      {chat ? (
        <div className={`chatbox active`}>
          <div className="top">
            <div className="name">
              <button 
                className="back-button" 
                onClick={() => setChat(null)}
                style={{ 
                  marginRight: '10px', 
                  background: 'none', 
                  border: 'none', 
                  fontSize: '20px',
                  color: 'white',
                  cursor: 'pointer'
                }}
              >
                ←
              </button>
              <img
                src={chat.receiver?.avatar || "/noavatar.jpg"}
                alt={chat.receiver?.username}
              />
              {chat.receiver?.username || "Unknown User"}
            </div>
            <span onClick={() => setChat(null)}>✕</span>
          </div>
          <div className="center">
            {messages.length === 0 ? (
              <p className="no-messages">No messages yet. Start the conversation!</p>
            ) : (
              messages.map((m) => (
                <div
                  className={`textmessage ${
                    m.userId === currentUser.id ? "our" : ""
                  }`}
                  key={m.id}
                >
                  <p>{m.text}</p>
                  <span>{format(m.createdAt)}</span>
                </div>
              ))
            )}
            <div ref={messageEndRef} />
          </div>
          <form className="bottom" onSubmit={handleSubmit}>
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message here..."
            />
            <button type="submit">Send</button>
          </form>
        </div>
      ) : (
        <div className="no-chat-selected">
          <p>Select a chat to start messaging</p>
        </div>
      )}
    </div>
  );
}
export default Chat;