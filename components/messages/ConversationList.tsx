'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

/**
 * Represents a conversation summary.
 */
interface Conversation {
  other_id: number;
  other_name: string;
  other_picture: string | null;
  lastToken: string;
  read: boolean;
  timestamp: Date;
  sender_id: number;
}

/**
 * A component that displays a list of recent conversations.
 * Features:
 * - Real-time updates via polling
 * - Visible unread indicators
 * - Click to navigate to a conversation
 * - Accessible keyboard navigation
 */
export default function ConversationList() {
  const { token } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedId = searchParams.get('id');

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchConversations = async () => {
      if (!token) return;
      
      try {
        const res = await fetch('http://localhost:4000/api/messages/conversations', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!res.ok) throw new Error('Failed to fetch conversations');

        const data = await res.json();
        setConversations(data);
      } catch (err) {
        console.error(err);
        setError('Impossible de charger les conversations');
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
    
    const interval = setInterval(fetchConversations, 10000);
    return () => clearInterval(interval);
  }, [token]);

  if (loading) {
     return (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
           {[...Array(5)].map((_, i) => (
             <div key={i} className="flex gap-4 p-3 animate-pulse">
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                <div className="flex-1 space-y-2">
                   <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                   <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                </div>
             </div>
           ))}
        </div>
     );
  }

  if (error) {
     return (
        <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-8 text-center">
           <p className="text-red-400 mb-2">{error}</p>
           <button onClick={() => window.location.reload()} className="text-sm underline hover:text-red-500">Réessayer</button>
        </div>
     );
  }

  if (conversations.length === 0) {
     return (
        <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-8 text-center">
           <p>Aucune conversation pour le moment.</p>
        </div>
     );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      {conversations.map((conv) => {
         const isUnread = !conv.read && conv.sender_id === conv.other_id;

         return (
           <div 
             key={conv.other_id}
             onClick={() => router.push(`/messages?id=${conv.other_id}`)}
             className={`p-4 flex gap-4 cursor-pointer transition-colors border-b border-gray-50 hover:bg-gray-50
                ${selectedId === conv.other_id.toString() ? 'bg-red-50 hover:bg-red-50 border-red-100' : ''}
             `}
             role="button"
             tabIndex={0}
             onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                   router.push(`/messages?id=${conv.other_id}`);
                }
             }}
           >
              <div className="relative flex-shrink-0">
                <div className="w-12 h-12 relative rounded-full overflow-hidden border border-gray-200">
                    <Image 
                       src={conv.other_picture || '/assets/default-profile.png'} 
                       alt={conv.other_name}
                       fill
                       className="object-cover"
                       sizes="48px"
                       unoptimized={conv.other_picture?.startsWith('http://127.0.0.1') || conv.other_picture?.startsWith('http://localhost')}
                    />
                </div>
                {isUnread && (
                   <span className="absolute top-0 right-0 w-3 h-3 bg-main-red rounded-full border-2 border-white"></span>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                 <div className="flex justify-between items-baseline mb-1">
                    <h3 className={`truncate pr-2 ${isUnread || selectedId === conv.other_id.toString() ? 'font-semibold text-black' : 'font-medium text-gray-700'}`}>
                       {conv.other_name}
                    </h3>
                    <span className={`text-xs whitespace-nowrap ${isUnread ? 'text-main-red font-medium' : 'text-gray-400'}`}>
                       {new Date(conv.timestamp).toLocaleDateString([], {day: 'numeric', month: 'short'})}
                    </span>
                 </div>
                 <p className={`text-sm truncate ${isUnread ? 'font-semibold text-black' : 'text-gray-500'}`}>
                    {conv.sender_id !== conv.other_id && 'Vous: '}{conv.lastToken}
                 </p>
              </div>
           </div>
         );
      })}
    </div>
  );
}
