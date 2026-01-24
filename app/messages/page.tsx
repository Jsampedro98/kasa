'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import ConversationList from '@/components/messages/ConversationList';
import ChatWindow from '@/components/messages/ChatWindow';

function MessagesContent() {
  const { user, isAuthenticated, loading, token } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeId = searchParams.get('id');
  
  const [activeUser, setActiveUser] = useState<{name: string, picture: string | null} | null>(null);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [loading, isAuthenticated, router]);


  useEffect(() => {
    const fetchActiveUser = async () => {
      if (!activeId || !token) {
        setActiveUser(null);
        return;
      }
      
      try {
         const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${activeId}/basic`, {
             headers: { 'Authorization': `Bearer ${token}` }
         });
         if (res.ok) {
             const data = await res.json();
             setActiveUser(data);
         }
      } catch (err) {
         console.error(err);
      }
    };

    fetchActiveUser();
  }, [activeId, token]);

  if (loading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F6F6F6]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-main-red"></div>
      </div>
    );
  }

  return (
    <main className="h-screen flex flex-col bg-[#F6F6F6]">
      <div className="flex-1 w-full h-full md:p-6 p-0 overflow-hidden">
        <div className="w-full h-full max-w-[1440px] mx-auto bg-white md:rounded-[25px] shadow-sm overflow-hidden flex flex-col md:flex-row border border-gray-100 relative">
        
        {!activeId && (
          <div className="absolute top-6 right-6 z-10 hidden md:block">
             <button 
                onClick={() => router.push('/')} 
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium transition"
                aria-label="Fermer la messagerie"
             >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Fermer
             </button>
          </div>
        )}

        <div className={`w-full md:w-[350px] lg:w-[400px] border-r border-gray-100 flex flex-col h-full bg-white
             ${activeId ? 'hidden md:flex' : 'flex'}
        `}>
          <div className="p-6 border-b border-gray-100 flex justify-between items-center flex-shrink-0">
            <h1 className="text-2xl font-bold text-main-red">Messagerie</h1>
            <button 
               onClick={() => router.push('/')} 
               className="md:hidden p-2 -mr-2 text-gray-400"
               aria-label="Fermer la messagerie"
            >
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
               </svg>
            </button>
          </div>
          <ConversationList />
        </div>

        <div className={`flex-1 flex flex-col bg-white h-full
             ${!activeId ? 'hidden md:flex' : 'flex'}
        `}>
          {activeId && activeUser ? (
            <ChatWindow 
              conversationId={activeId}
              conversationUser={activeUser}
              onBack={() => router.push('/messages')}
            />
          ) : activeId ? (
              <div className="flex-1 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-main-red"></div>
              </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-8 text-center bg-gray-50/50">
              <div className="w-24 h-24 mb-6 bg-gray-100 rounded-full flex items-center justify-center text-gray-300">
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-600 mb-2">Vos messages</h2>
              <p className="max-w-md text-sm">Sélectionnez une conversation pour échanger avec vos hôtes ou voyageurs.</p>
            </div>
          )}
        </div>
        </div>
      </div>
    </main>
  );
}

export default function MessagesPage() {
  return (
    <Suspense fallback={
       <div className="min-h-screen flex items-center justify-center bg-[#F6F6F6]">
         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-main-red"></div>
       </div>
    }>
      <MessagesContent />
    </Suspense>
  );
}
