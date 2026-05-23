import React, { useState, useEffect } from 'react';
import { Search, Send } from 'lucide-react';
import { getMessages, sendMessage, getConversations } from '../../services/chatServices';

export default function Messages() {
  const [chats, setChats] = useState([]); // List percakapan dari API
  const [messages, setMessages] = useState([]); // Pesan untuk percakapan aktif
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedChat, setSelectedChat] = useState(null);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);

  // 1. Load Daftar Percakapan saat komponen pertama kali dimuat
  useEffect(() => {
    const loadConversations = async () => {
      const res = await getConversations(); // Pastikan fungsi ini ada di chatServices
      if (res.success) setChats(res.data);
    };
    loadConversations();
  }, []);

  // 2. Load Pesan saat selectedChat berubah
  useEffect(() => {
    if (selectedChat) {
      fetchMessages(selectedChat.conversationId);
    }
  }, [selectedChat]);

  const fetchMessages = async (convId) => {
    setLoading(true);
    const res = await getMessages(convId);
    if (res.success) setMessages(res.data.messages);
    setLoading(false);
  };

  // 3. Logic Kirim Pesan ke API
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputText.trim() || !selectedChat) return;

    const res = await sendMessage(selectedChat.conversationId, inputText);
    if (res.success) {
      setInputText("");
      fetchMessages(selectedChat.conversationId); // Refresh list pesan
    }
  };

  return (
    <div className="flex h-[calc(100vh-80px)] overflow-hidden bg-white font-poppins">
      
      {/* SIDEBAR CHAT */}
      <div className="w-[350px] border-r border-black/50 flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-[#0B173D] mb-4">Pesan</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Cari percakapan..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#FBFAFF] border border-black/10 rounded-xl outline-none focus:border-[#1E42AC]/30 text-sm"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {chats.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase())).map((chat) => (
            <div 
              key={chat.conversationId}
              onClick={() => setSelectedChat(chat)}
              className={`p-4 flex items-center gap-3 cursor-pointer transition-all border-b border-black/10
                ${selectedChat?.conversationId === chat.conversationId ? 'bg-[#E9EBF8] border-l-4 border-l-[#6B5BAE]' : 'hover:bg-gray-50'}`}
            >
              <div className="w-12 h-12 rounded-full bg-blue-200 flex items-center justify-center font-bold text-[#0B173D]">
                {chat.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-[#0B173D] truncate">{chat.name}</h4>
                <p className="text-xs text-gray-500 truncate">{chat.lastMessagePreview || "Belum ada pesan"}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CHAT KANAN */}
      <div className="flex-1 flex flex-col bg-[#FBFAFF]">
        {selectedChat ? (
          <>
            <div className="h-[70px] px-6 flex items-center bg-white border-b border-black/10">
              <h4 className="font-bold text-[#0B173D]">{selectedChat.name}</h4>
            </div>
            
            <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-4">
              {messages.map((msg) => (
                <div 
                  key={msg.messageId} 
                  className={`flex flex-col ${msg.senderId !== selectedChat.recruiterId ? "items-end" : "items-start"}`}
                >
                  <div className={`max-w-[70%] p-4 rounded-2xl text-sm shadow-sm ${
                    msg.senderId !== selectedChat.recruiterId 
                      ? "bg-[#1E42AC] text-white rounded-tr-none" 
                      : "bg-white text-[#0B173D] rounded-tl-none"
                  }`}>
                    {msg.body}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-black/10">
              <div className="flex gap-2 bg-[#FBFAFF] p-2 rounded-2xl border border-black/10">
                <input 
                  type="text" 
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={'Tulis Pesan...'} 
                  className="flex-1 bg-transparent px-4 outline-none text-sm" 
                />
                <button type="submit" className="bg-[#6B5BAE] p-2 rounded-xl text-white hover:bg-[#0B173D] transition-colors">
                  <Send size={18} />
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-gray-400">
             <Send size={50} className="-rotate-12 opacity-25 mb-4" />
             <p className="font-bold text-black text-[16px]">Belum ada pesan dibuka</p>
          </div>
        )}
      </div>
    </div>
  );
}