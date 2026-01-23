import Image from 'next/image';

interface MessageBubbleProps {
  content: string;
  isMe: boolean;
  createdAt: string;
  senderName?: string;
  senderPicture?: string;
}

export default function MessageBubble({ content, isMe, createdAt, senderName, senderPicture }: MessageBubbleProps) {
  const time = new Date(createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className={`flex gap-3 mb-6 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
       {!isMe && (
          <div className="flex-shrink-0 w-8 h-8 relative rounded-full overflow-hidden border border-gray-100 self-end mb-1">
             <Image 
                src={senderPicture || '/assets/default-profile.png'} 
                alt={senderName || 'User'} 
                fill
                className="object-cover"
                sizes="32px"
                unoptimized={senderPicture?.startsWith('http') || false}
             />
          </div>
       )}
       
       <div className={`flex flex-col max-w-[70%] sm:max-w-[60%] ${isMe ? 'items-end' : 'items-start'}`}>
          {!isMe && <span className="text-xs text-gray-400 ml-1 mb-1">{senderName}</span>}
          
          <div 
             className={`px-5 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap shadow-sm
                ${isMe 
                   ? 'bg-main-red text-white rounded-br-none' 
                   : 'bg-white border border-gray-100 text-gray-700 rounded-bl-none'
                }`}
          >
             {content}
          </div>
          
          <span className={`text-[10px] text-gray-400 mt-1 ${isMe ? 'mr-1' : 'ml-1'}`}>
             {time}
          </span>
       </div>
    </div>
  );
}
