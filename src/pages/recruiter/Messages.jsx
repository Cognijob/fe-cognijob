import React, { useState, useEffect } from 'react'
import { Search, Send } from 'lucide-react'

export default function Messages() {
  // Data Dummy Master untuk Daftar Kontak
  const initialChats = [
    { id: 1, name: "Rani", avatar: "R", color: "bg-blue-200" },
    { id: 2, name: "Edo", avatar: "E", color: "bg-green-200" },
    { id: 3, name: "Budi", avatar: "B", color: "bg-purple-200" },
  ];

  // Data dummy
  const [allMessages, setAllMessages] = useState({
    1: [
      { id: 101, text: "Halo, saya ingin menanyakan lebih lanjut mengenai posisi ini. Apakah ada sesi technical test??", sender: "them", time: "09:45" },
      { id: 102, text: "Halo! Ya, ada sesi technical test sekitar 60 menit. Kami akan kirimkan detailnya via email.", sender: "me", time: "09.45" },
    ],
    2: [{ id: 201, text: "Apakah posisi ini masih tersedia?", sender: "them", time: "10:45" }],
    3: [{ id: 301, text: "Halo, mau tanya", sender: "them", time: "Kemarin" }],
  });

  const [chats, setChats] = useState(initialChats);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedChat, setSelectedChat] = useState(null);
  const [inputText, setInputText] = useState("");

  // Logic Search
  useEffect(() => {
    const results = initialChats.filter(chat =>
      chat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setChats(results);
  }, [searchTerm]);

  // Logic Kirim Pesan
  const handleSendMessage = (e) => {
    e.preventDefault(); 
    if (!inputText.trim() || !selectedChat) return;

    const newMessage = {
      id: Date.now(),
      text: inputText,
      sender: "me",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Update state pesan berdasarkan ID 
    setAllMessages({
      ...allMessages,
      [selectedChat.id]: [...(allMessages[selectedChat.id] || []), newMessage]
    });

    setInputText(""); 
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
          {chats.map((chat) => {
            const lastMsg = allMessages[chat.id]?.[allMessages[chat.id].length - 1];
            return (
              <div 
                key={chat.id}
                onClick={() => setSelectedChat(chat)}
                className={`p-4 flex items-center gap-3 cursor-pointer transition-all border-b border-black/10
                  ${selectedChat?.id === chat.id ? 'bg-[#E9EBF8] border-l-4 border-l-[#6B5BAE]' : 'hover:bg-gray-50'}`}
              >
                <div className={`w-12 h-12 rounded-full ${chat.color} flex items-center justify-center font-bold text-[#0B173D]`}>
                  {chat.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold text-[#0B173D] truncate">{chat.name}</h4>
                    <span className="text-[10px] text-gray-400">{lastMsg?.time || ""}</span>
                  </div>
                  <p className="text-xs text-gray-500 truncate">{lastMsg?.text || "Belum ada pesan"}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* CHAT KANAN */}
      <div className="flex-1 flex flex-col bg-[#FBFAFF]">
        {selectedChat ? (
          <>
            {/* Header */}
            <div className="h-[70px] px-6 flex items-center bg-white border-b border-black/10">
              <div className={`w-10 h-10 rounded-full ${selectedChat.color} mr-3 flex items-center justify-center font-bold text-xs`}>
                {selectedChat.avatar}
              </div>
              <h4 className="font-bold text-[#0B173D]">{selectedChat.name}</h4>
            </div>
            
            {/* Bubble Chat */}
            <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-4">
              {allMessages[selectedChat.id]?.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex flex-col ${msg.sender === "me" ? "items-end" : "items-start"}`}
                >
                  <div className={`max-w-[70%] p-4 bg-[#6B5BAE] rounded-2xl text-sm shadow-sm ${
                    msg.sender === "me" 
                      ? "bg-[#1E42AC] text-white rounded-tr-none" 
                      : "bg-white text-[#0B173D] rounded-tl-none"
                  }`}>
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-gray-400 mt-1">{msg.time}</span>
                </div>
              ))}
            </div>

            {/* Input Footer */}
            <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-black/10">
              <div className="flex gap-2 bg-[#FBFAFF] p-2 rounded-2xl border border-black/10">
                <input 
                  type="text" 
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={'Tulis Pesan...'} 
                  className="flex-1 bg-transparent px-4 outline-none text-sm" 
                />
                <button 
                  type="submit"
                  className="bg-[#6B5BAE] p-2 rounded-xl text-white hover:bg-[#0B173D] transition-colors"
                >
                  <Send size={18} />
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-gray-400 ">
             <div className="w-25 h-25 bg-gray-100 rounded-full flex items-center justify-center mb-4 ">
                <Send size={50} className=" -rotate-12 opacity-25 " />
             </div>
             <p className="font-bold text-black text-[16px]">Belum ada pesan dibuka</p>
            <p className='text-[12px]'>
                Pilih percakapan di sebelah kiri <br /> 
                untuk memulai membaca pesan.
            </p>

          </div>
        )}
      </div>
    </div>
  )
}