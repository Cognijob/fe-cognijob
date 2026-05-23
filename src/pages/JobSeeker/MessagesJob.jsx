import React, { useState, useEffect, useRef } from "react";
import { Search, Send, Loader2 } from "lucide-react";
import { 
  fetchConversations, 
  fetchConversationMessages, 
  sendMessage, 
  markConversationRead 
} from "../../services/conversationServices";

// Palette warna dinamis untuk avatar perusahaan
const avatarColors = [
  "bg-[#E9EBF8]", "bg-blue-100", "bg-green-100", 
  "bg-yellow-100", "bg-purple-100", "bg-pink-100"
];

export default function MessagesJob() {
  const [conversations, setConversations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedChat, setSelectedChat] = useState(null);
  
  // State untuk detail pesan
  const [messages, setMessages] = useState([]);
  const [currentConvDetail, setCurrentConvDetail] = useState(null);
  const [inputText, setInputText] = useState("");
  
  const [loadingList, setLoadingList] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const messagesEndRef = useRef(null);

  // 1. Fetch Daftar Percakapan Saat Komponen Pertama Dirender
  useEffect(() => {
    loadConversations();
  }, []);

  const loadConversations = async () => {
    try {
      setLoadingList(true);
      const res = await fetchConversations();
      if (res.data?.success) {
        // Format mapping data agar cocok dengan kebutuhan UI
        const formatted = res.data.data.conversations.map((c, index) => {
          const words = (c.companyName || "Perusahaan").split(' ');
          const initials = words.slice(0, 2).map(w => w[0]).join('').toUpperCase();
          
          return {
            id: c.conversationId,
            name: c.companyName,
            jobTitle: c.jobTitle,
            avatar: initials,
            color: avatarColors[index % avatarColors.length],
            lastMessagePreview: c.lastMessagePreview,
            lastMessageAt: c.lastMessageAt,
            unreadCount: c.unreadCount || 0,
          };
        });
        setConversations(formatted);
      }
    } catch (error) {
      console.error("Gagal mengambil daftar percakapan:", error);
    } finally {
      setLoadingList(false);
    }
  };

  // 2. Fetch Pesan Ketika Sebuah Percakapan Dipilih
  useEffect(() => {
    if (selectedChat) {
      loadMessagesAndMarkRead(selectedChat.id);
    }
  }, [selectedChat]);

  const loadMessagesAndMarkRead = async (convId) => {
    try {
      setLoadingMessages(true);
      // Fetch pesan
      const res = await fetchConversationMessages(convId);
      if (res.data?.success) {
        setMessages(res.data.data.messages);
        setCurrentConvDetail(res.data.data.conversation);
      }
      
      // Hit endpoint untuk read (reset notif unread local agar UI langsung update)
      await markConversationRead(convId);
      setConversations(prev => 
        prev.map(c => c.id === convId ? { ...c, unreadCount: 0 } : c)
      );

    } catch (error) {
      console.error("Gagal memuat pesan:", error);
    } finally {
      setLoadingMessages(false);
    }
  };

  // Auto-scroll ke bawah saat pesan baru muncul
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Logic Search
  const filteredConversations = conversations.filter((chat) =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 3. Logic Mengirim Pesan
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputText.trim() || !selectedChat) return;

    const textPayload = inputText;
    setInputText(""); // Kosongkan input duluan agar responsif di mata user

    try {
      const res = await sendMessage(selectedChat.id, textPayload);
      if (res.data?.success) {
        const newMsg = res.data.data;
        
        // Update state pesan dengan pesan baru
        setMessages(prev => [...prev, newMsg]);
        
        // Update list sidebar
        setConversations(prev => 
          prev.map(c => c.id === selectedChat.id ? { 
            ...c, 
            lastMessagePreview: newMsg.body, 
            lastMessageAt: newMsg.createdAt 
          } : c)
        );
      }
    } catch (error) {
      console.error("Gagal mengirim pesan:", error);
      // Opsional: berikan alert/toast ke user jika gagal
    }
  };

  // Utility Format Waktu
  const formatTime = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "Belum ada pesan";
    const d = new Date(dateStr);
    const today = new Date();
    if (d.toDateString() === today.toDateString()) {
      return d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    }
    return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
  };

  return (
    <div className="flex h-[calc(100vh-80px)] overflow-hidden bg-white font-poppins animate-fade-in">
      {/* SIDEBAR CHAT */}
      <div className="w-[350px] border-r border-black/50 flex flex-col bg-white">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-[#0B173D] mb-4">Pesan</h1>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Cari percakapan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-[#FFFFFF] border border-[#1E42AC] rounded-xl outline-none focus:border-[#1E42AC]/50 text-sm transition-all"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {loadingList ? (
             <div className="flex justify-center p-6"><Loader2 className="animate-spin text-[#1E42AC]" /></div>
          ) : filteredConversations.length > 0 ? (
            filteredConversations.map((chat) => {
              const isActive = selectedChat?.id === chat.id;
              return (
                <div
                  key={chat.id}
                  onClick={() => setSelectedChat(chat)}
                  className={`p-4 mx-4 mb-2 flex items-center gap-3 cursor-pointer rounded-2xl transition-all
                    ${isActive ? "bg-[#F1F4FF] border border-[#6B5BAE]/20" : "hover:bg-gray-50"}`}
                >
                  <div className={`w-12 h-12 rounded-full ${chat.color} flex items-center justify-center font-bold text-[#0B173D] shrink-0 shadow-sm text-sm`}>
                    {chat.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-0.5">
                      <h4 className="font-bold text-[#0B173D] text-[14px] truncate">
                        {chat.name}
                      </h4>
                      <span className="text-[10px] text-gray-400">
                        {formatDate(chat.lastMessageAt)}
                      </span>
                    </div>
                    <p className={`text-[12px] truncate ${isActive ? "text-[#1E42AC] font-medium" : "text-gray-500"}`}>
                      {chat.lastMessagePreview || "Belum ada pesan"}
                    </p>
                  </div>
                  {chat.unreadCount > 0 && !isActive && (
                    <div className="w-5 h-5 bg-[#1E42AC] rounded-full flex items-center justify-center text-white text-[10px] font-bold">
                      {chat.unreadCount}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
             <div className="text-center p-6 text-sm text-gray-400">Belum ada percakapan.</div>
          )}
        </div>
      </div>

      {/* CHAT AREA KANAN */}
      <div className="flex-1 flex flex-col bg-[#F1F4FF]">
        {selectedChat ? (
          <>
            {/* Header Chat */}
            <div className="h-[75px] px-8 flex justify-between items-center bg-white border-b border-black/5 shadow-sm z-10">
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full ${selectedChat.color} mr-4 flex items-center justify-center font-bold text-[#1E42AC] text-xs shadow-inner`}>
                  {selectedChat.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-[#0B173D] text-[16px]">{selectedChat.name}</h4>
                  <p className="text-[11px] text-gray-500 font-medium">Melamar: {selectedChat.jobTitle}</p>
                </div>
              </div>
            </div>

            {/* Bubble Chat Container */}
            <div className="flex-1 p-8 overflow-y-auto flex flex-col gap-6 scrollbar-hide">
              {loadingMessages ? (
                <div className="flex-1 flex justify-center items-center"><Loader2 className="w-8 h-8 animate-spin text-[#1E42AC]" /></div>
              ) : messages.length > 0 ? (
                messages.map((msg) => {
                  // Pengecekan apakah pesan dari Jobseeker
                  // currentConvDetail di-fetch dari GET /conversations/:id (berisi data detail conv & jobSeekerId)
                  const isMe = msg.senderId === currentConvDetail?.jobSeekerId;

                  return (
                    <div key={msg.messageId} className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}>
                      <div className={`max-w-[70%] p-4 text-[13px] leading-relaxed shadow-sm transition-all ${
                          isMe
                            ? "bg-[#1E42AC] text-white rounded-2xl rounded-tr-none"
                            : "bg-white text-[#0B173D] border border-[#1E42AC] rounded-2xl rounded-tl-none"
                        }`}
                      >
                        {msg.body}
                      </div>
                      <span className="text-[10px] text-gray-400 mt-2 font-medium">
                        {formatTime(msg.createdAt)}
                      </span>
                    </div>
                  );
                })
              ) : (
                <div className="flex-1 flex items-center justify-center text-sm text-gray-400 font-medium">
                  Belum ada pesan di percakapan ini.
                </div>
              )}
              {/* Dummy div agar bisa auto scroll ke paling bawah */}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Pesan Footer */}
            <div className="p-6 bg-white border-t border-black/10">
              <form
                onSubmit={handleSendMessage}
                className="flex gap-3 bg-[#F1F4FF] p-2 rounded-2xl border border-[#1E42AC] focus-within:border-[#F1F4FF]/50 transition-all"
              >
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Tulis pesan untuk recruiter..."
                  className="flex-1 bg-transparent px-4 outline-none text-[13px] text-[#0B173D]"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="bg-[#1E42AC] disabled:opacity-50 disabled:cursor-not-allowed p-2.5 rounded-xl text-white hover:bg-[#5a4c9a] shadow-md hover:shadow-lg transition-all active:scale-95"
                >
                  <Send size={18} />
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-gray-400 bg-white">
            <div className="w-32 h-32 bg-[#F3F1FB] rounded-full flex items-center justify-center mb-6 shadow-inner">
              <Send size={48} className="-rotate-12 text-[#1E42AC] opacity-40" />
            </div>
            <h3 className="font-bold text-[#0B173D] text-[18px] mb-2">Belum ada pesan dibuka</h3>
            <p className="text-[13px] text-gray-500 max-w-xs leading-relaxed">
              Pilih salah satu recruiter atau perusahaan di sebelah kiri untuk mulai berkonsultasi mengenai lamaranmu.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
