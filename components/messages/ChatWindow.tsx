'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import MessageBubble from './MessageBubble';

/**
 * Represents a single message in the conversation.
 */
interface Message {
  id: number;
  sender_id: number;
  receiver_id: number;
  content: string;
  read: boolean;
  created_at: string;
  sender_name?: string;
  sender_picture?: string;
}

/**
 * Props for the ChatWindow component.
 */
interface ChatWindowProps {
  /** The ID of the current conversation. */
  conversationId: string;
  /** Details of the user being chatted with. */
  conversationUser: {
    name: string;
    picture: string | null;
  };
  /** Callback function to handle back navigation (mobile). */
  onBack: () => void;
}

/**
 * A chat interface component that displays messages and allows sending new ones.
 * Features:
 * - Real-time message polling
 * - Auto-scrolling to bottom
 * - Optimistic UI updates
 * - Mobile responsive header and navigation
 * 
 * @param {ChatWindowProps} props - The component props.
 */
export default function ChatWindow({ conversationId, conversationUser, onBack }: ChatWindowProps) {
  const { user, token } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  // Ref to track if we should auto-scroll (only if already at bottom or first load)
  const shouldScrollRef = useRef(true);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const fetchMessages = async () => {
      if (!token || !conversationId) return;

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/messages/${conversationId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!res.ok) throw new Error('Failed to fetch messages');

        const data = await res.json();
        
        // Map backend camelCase to frontend snake_case
        const mappedMessages = data.map((msg: any) => ({
          id: msg.id,
          sender_id: msg.senderId,
          receiver_id: msg.receiverId,
          content: msg.content,
          read: msg.read,
          created_at: msg.createdAt,
          sender_name: msg.sender?.name,
          sender_picture: msg.sender?.picture
        }));
        
        // Only update if we have different messages to avoid unnecessary re-renders
        // A simple check is comparing length or last message ID
        setMessages(prev => {
            if (prev.length !== mappedMessages.length || (mappedMessages.length > 0 && prev.length > 0 && mappedMessages[mappedMessages.length-1].id !== prev[prev.length-1].id)) {
                return mappedMessages;
            }
            return prev;
        });

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    setLoading(true);
    fetchMessages();
    
    interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, [conversationId, token]);

  // Scroll on new messages
  useEffect(() => {
     if (messages.length > 0 && shouldScrollRef.current) {
         scrollToBottom();
     }
  }, [messages]);

  const handleScroll = () => {
      if (!chatContainerRef.current) return;
      const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
      // If user is near bottom (within 100px), enable auto-scroll
      shouldScrollRef.current = scrollHeight - scrollTop - clientHeight < 100;
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || sending) return;

    setSending(true);
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          receiver_id: conversationId,
          content: newMessage
        })
      });

      if (!res.ok) throw new Error('Failed to send');

      const sentMsg = await res.json();
      
      // Map backend camelCase response to frontend snake_case structure
      const mappedMessage = {
        id: sentMsg.id,
        sender_id: sentMsg.senderId || (user?.id ? parseInt(user.id) : 0),
        receiver_id: sentMsg.receiverId || parseInt(conversationId),
        content: sentMsg.content,
        read: sentMsg.read || false,
        created_at: sentMsg.createdAt || new Date().toISOString(),
        sender_name: user?.name,
        sender_picture: user?.picture
      };
      
      // Add immediately to list
      setMessages(prev => [...prev, mappedMessage]);
      
      setNewMessage('');
      shouldScrollRef.current = true; // Force scroll on send
      
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'envoi du message");
    } finally {
      setSending(false);
    }
  };

  if (loading && messages.length === 0) {
    return (
        <div className="flex-1 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-main-red"></div>
        </div>
    );
  }

  return (
    <>
      {/* Header */}
      <div className="h-[70px] border-b border-gray-100 flex items-center px-6 bg-white flex-shrink-0">
         <button 
            onClick={onBack} 
            className="mr-4 md:hidden text-gray-500 hover:text-main-red transition-colors"
            aria-label="Retour à la liste des conversations"
         >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
               <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
         </button>
         
         <div className="flex items-center gap-3">
             <div className="w-10 h-10 relative rounded-full overflow-hidden bg-gray-100 border border-gray-200">
                {conversationUser.picture ? (
                   <Image 
                      src={conversationUser.picture} 
                      alt={conversationUser.name} 
                      fill
                      className="object-cover"
                      unoptimized={conversationUser.picture.startsWith('http')}
                   />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                       <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    </div>
                )}
             </div>
             <h2 className="font-bold text-lg text-noir">{conversationUser.name}</h2>
         </div>
      </div>

      {/* Messages Area */}
      <div 
         className="flex-1 overflow-y-auto p-6 bg-gray-50/50"
         ref={chatContainerRef}
         onScroll={handleScroll}
      >
         {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 opacity-60">
                <p>Début de la conversation</p>
                <p className="text-sm">Envoyez un message pour démarrer</p>
            </div>
         ) : (
             messages.map((msg) => (
                <MessageBubble 
                   key={msg.id}
                   content={msg.content}
                   isMe={msg.sender_id.toString() === user?.id}
                   createdAt={msg.created_at}
                   senderName={msg.sender_id.toString() === user?.id ? 'Vous' : msg.sender_name}
                   senderPicture={msg.sender_picture}
                />
             ))
         )}
         <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-100">
         <form onSubmit={handleSend} className="flex items-end gap-3 max-w-4xl mx-auto">
             <div className="flex-1 bg-gray-50 rounded-3xl border border-gray-200 focus-within:border-main-red focus-within:ring-1 focus-within:ring-main-red/20 transition-all">
                <textarea
                   value={newMessage}
                   onChange={(e) => setNewMessage(e.target.value)}
                   placeholder="Écrivez votre message..."
                   className="w-full bg-transparent border-none focus:ring-0 resize-none py-3 px-4 min-h-[48px] max-h-[120px] text-sm"
                   aria-label="Écrire un message"
                   rows={1}
                   onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                         e.preventDefault();
                         handleSend(e);
                      }
                   }}
                />
             </div>
             <button 
                type="submit" 
                disabled={!newMessage.trim() || sending}
                className="w-12 h-12 bg-main-red text-white rounded-full flex items-center justify-center hover:bg-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                aria-label="Envoyer le message"
             >
                {sending ? (
                   <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 ml-0.5">
                      <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                   </svg>
                )}
             </button>
         </form>
      </div>
    </>
  );
}
