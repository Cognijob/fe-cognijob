import React, { useState, useEffect } from "react";
import { Search, Send } from "lucide-react";

export default function MessagesJob() {
  // Data Dummy Master untuk Daftar Kontak (Recruiter/Perusahaan)
  const initialChats = [
    { id: 1, name: "TechCogni Indonesia", avatar: "TN", color: "bg-[#E9EBF8]" },
    { id: 2, name: "Unilever", avatar: "U", color: "bg-blue-100" },
    { id: 3, name: "Gojek", avatar: "G", color: "bg-green-100" },
  ];

  // Data dummy pesan
  const [allMessages, setAllMessages] = useState({
    1: [
      {
        id: 101,
        text: "Halo, saya ingin menanyakan lebih lanjut mengenai posisi ini. Apakah ada sesi technical test?",
        sender: "me",
        time: "09:45",
      },
      {
        id: 102,
        text: "Halo! Ya, ada sesi technical test sekitar 60 menit. Kami akan kirimkan detailnya via email.",
        sender: "them",
        time: "09.45",
      },
    ],
    2: [
      {
        id: 201,
        text: "Apakah posisi Frontend ini masih tersedia?",
        sender: "me",
        time: "10:45",
      },
    ],
    3: [
      {
        id: 301,
        text: "Terima kasih atas informasinya.",
        sender: "me",
        time: "Kemarin",
      },
    ],
  });

  const [chats, setChats] = useState(initialChats);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedChat, setSelectedChat] = useState(null);
  const [inputText, setInputText] = useState("");

  // Logic Search
  useEffect(() => {
    const results = initialChats.filter((chat) =>
      chat.name.toLowerCase().includes(searchTerm.toLowerCase()),
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
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setAllMessages({
      ...allMessages,
      [selectedChat.id]: [...(allMessages[selectedChat.id] || []), newMessage],
    });

    setInputText("");
  };

  return (
    <div className="flex h-[calc(100vh-80px)] overflow-hidden bg-white font-poppins animate-fade-in">
      {/* SIDEBAR CHAT */}
      <div className="w-[350px] border-r border-black/5 flex flex-col bg-white">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-[#0B173D] mb-4">Pesan</h1>
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Cari percakapan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-[#FBFAFF] border border-[#CDD6EE] rounded-xl outline-none focus:border-[#6B5BAE]/50 text-sm transition-all"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {chats.map((chat) => {
            const lastMsg =
              allMessages[chat.id]?.[allMessages[chat.id].length - 1];
            const isActive = selectedChat?.id === chat.id;
            return (
              <div
                key={chat.id}
                onClick={() => setSelectedChat(chat)}
                className={`p-4 mx-4 mb-2 flex items-center gap-3 cursor-pointer rounded-2xl transition-all
                  ${isActive ? "bg-[#F3F1FB] border border-[#6B5BAE]/20" : "hover:bg-gray-50"}`}
              >
                <div
                  className={`w-12 h-12 rounded-full ${chat.color} flex items-center justify-center font-bold text-[#6B5BAE] shrink-0 shadow-sm text-sm`}
                >
                  {chat.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-0.5">
                    <h4 className="font-bold text-[#0B173D] text-[14px] truncate">
                      {chat.name}
                    </h4>
                    <span className="text-[10px] text-gray-400">
                      {lastMsg?.time || ""}
                    </span>
                  </div>
                  <p
                    className={`text-[12px] truncate ${isActive ? "text-[#6B5BAE] font-medium" : "text-gray-500"}`}
                  >
                    {lastMsg?.text || "Belum ada pesan"}
                  </p>
                </div>
                {chat.id === 2 && !isActive && (
                  <div className="w-5 h-5 bg-[#6B5BAE] rounded-full flex items-center justify-center text-white text-[10px] font-bold">
                    2
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* CHAT AREA KANAN */}
      <div className="flex-1 flex flex-col bg-[#FBFAFF]">
        {selectedChat ? (
          <>
            {/* Header Chat */}
            <div className="h-[75px] px-8 flex items-center bg-white border-b border-black/5 shadow-sm z-10">
              <div
                className={`w-10 h-10 rounded-full ${selectedChat.color} mr-4 flex items-center justify-center font-bold text-[#6B5BAE] text-xs shadow-inner`}
              >
                {selectedChat.avatar}
              </div>
              <div>
                <h4 className="font-bold text-[#0B173D] text-[16px]">
                  {selectedChat.name}
                </h4>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-[11px] text-gray-400">Online</span>
                </div>
              </div>
            </div>

            {/* Bubble Chat Container */}
            <div className="flex-1 p-8 overflow-y-auto flex flex-col gap-6 scrollbar-hide">
              <div className="flex justify-center my-2">
                <span className="px-4 py-1 bg-gray-200/50 rounded-full text-[10px] text-gray-500 font-medium uppercase tracking-wider">
                  Hari ini
                </span>
              </div>

              {allMessages[selectedChat.id]?.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === "me" ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-[70%] p-4 text-[13px] leading-relaxed shadow-sm transition-all ${
                      msg.sender === "me"
                        ? "bg-[#6B5BAE] text-white rounded-2xl rounded-tr-none"
                        : "bg-white text-[#0B173D] border border-[#CDD6EE] rounded-2xl rounded-tl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-gray-400 mt-2 font-medium">
                    {msg.time}
                  </span>
                </div>
              ))}
            </div>

            {/* Input Pesan Footer */}
            <div className="p-6 bg-white border-t border-black/5">
              <form
                onSubmit={handleSendMessage}
                className="flex gap-3 bg-[#FBFAFF] p-2 rounded-2xl border border-[#CDD6EE] focus-within:border-[#6B5BAE]/50 transition-all"
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
                  className="bg-[#6B5BAE] p-2.5 rounded-xl text-white hover:bg-[#5a4c9a] shadow-md hover:shadow-lg transition-all active:scale-95"
                >
                  <Send size={18} />
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-gray-400 bg-white">
            <div className="w-32 h-32 bg-[#F3F1FB] rounded-full flex items-center justify-center mb-6 shadow-inner">
              <Send
                size={48}
                className="-rotate-12 text-[#6B5BAE] opacity-40"
              />
            </div>
            <h3 className="font-bold text-[#0B173D] text-[18px] mb-2">
              Belum ada pesan dibuka
            </h3>
            <p className="text-[13px] text-gray-500 max-w-xs leading-relaxed">
              Pilih salah satu recruiter atau perusahaan di sebelah kiri untuk
              mulai berkonsultasi mengenai lamaranmu.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
