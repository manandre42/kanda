import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { Tile, Button } from '../components/CarbonUI';
import { Send, Phone, Video, MoreVertical } from 'lucide-react';
import { MESSAGES, MOCK_USER, TEACHERS } from '../mockData';

export const Chat: React.FC = () => {
  const [newMessage, setNewMessage] = useState('');
  const teacher = TEACHERS.find(t => t.id === MOCK_USER.teacherId);
  const [messages, setMessages] = useState(MESSAGES);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const msg = {
      id: `m${Date.now()}`,
      senderId: MOCK_USER.id,
      receiverId: teacher?.id || 't1',
      content: newMessage,
      timestamp: new Date(),
      isRead: false
    };

    setMessages([...messages, msg]);
    setNewMessage('');
  };

  if (!teacher) return <Layout><div className="p-8">Professor não encontrado.</div></Layout>;

  return (
    <Layout>
      <div className="h-[calc(100vh-140px)] flex flex-col md:flex-row gap-4">
        
        {/* Sidebar / Contact List */}
        <div className="hidden md:block w-80 bg-white border border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-100">
                <h2 className="font-bold text-lg">Mensagens</h2>
            </div>
            <div className="flex-1 overflow-y-auto p-2">
                <div className="flex items-center p-3 bg-blue-50 border-l-4 border-carbon-blue cursor-pointer">
                    <img src={teacher.avatarUrl} alt={teacher.name} className="w-10 h-10 rounded-full object-cover mr-3" />
                    <div>
                        <h4 className="text-sm font-bold">{teacher.name}</h4>
                        <p className="text-xs text-gray-500 truncate">Claro, podes enviar a foto...</p>
                    </div>
                </div>
                {/* Placeholder for other contacts */}
                <div className="flex items-center p-3 hover:bg-gray-50 cursor-pointer opacity-50">
                     <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold mr-3">S</div>
                     <div>
                        <h4 className="text-sm font-bold text-gray-500">Suporte Técnico</h4>
                        <p className="text-xs text-gray-400">Offline</p>
                     </div>
                </div>
            </div>
        </div>

        {/* Chat Area */}
        <Tile className="flex-1 flex flex-col p-0 overflow-hidden border-none shadow-sm h-full">
            {/* Chat Header */}
            <div className="h-16 border-b border-gray-100 flex items-center justify-between px-6 bg-white">
                <div className="flex items-center">
                    <img src={teacher.avatarUrl} alt={teacher.name} className="w-10 h-10 rounded-full object-cover mr-3" />
                    <div>
                        <h3 className="font-bold text-sm">{teacher.name}</h3>
                        <span className="flex items-center text-xs text-green-600 font-medium">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span> Online
                        </span>
                    </div>
                </div>
                <div className="flex items-center text-gray-400 gap-4">
                    <Phone size={20} className="cursor-pointer hover:text-carbon-blue" />
                    <Video size={20} className="cursor-pointer hover:text-carbon-blue" />
                    <MoreVertical size={20} className="cursor-pointer hover:text-gray-600" />
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 bg-gray-50 space-y-4">
                {messages.map((msg) => {
                    const isMe = msg.senderId === MOCK_USER.id;
                    return (
                        <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[70%] rounded-lg p-3 shadow-sm ${isMe ? 'bg-carbon-blue text-white rounded-tr-none' : 'bg-white text-gray-800 rounded-tl-none border border-gray-200'}`}>
                                <p className="text-sm">{msg.content}</p>
                                <p className={`text-[10px] mt-1 text-right ${isMe ? 'text-blue-200' : 'text-gray-400'}`}>
                                    {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-100">
                <form onSubmit={handleSend} className="flex items-center gap-2">
                    <input 
                        type="text" 
                        className="flex-1 h-10 bg-gray-100 rounded px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                        placeholder="Escreve a tua dúvida..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <Button type="submit" className="rounded-full w-10 h-10 p-0 flex items-center justify-center">
                        <Send size={18} />
                    </Button>
                </form>
            </div>
        </Tile>
      </div>
    </Layout>
  );
};