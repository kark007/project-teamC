import { useEffect, useState } from 'react';
import type { SMSMessage } from '../types/message';
import { SMSBubble } from './SMSBubble';

interface Props {
    onSelect: (message: SMSMessage) => void;
}

export const SMSList = ({ onSelect }: Props) => {
    const [messages, setMessages] = useState<SMSMessage[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:8000/messages')
            .then(res => res.json())
            .then(data => {
                setMessages(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("API Connection Error:", err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full text-gray-400">
                <div className="animate-pulse">読み込み中...</div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full bg-white">
            <header className="px-4 pt-12 pb-4 border-b border-gray-100 shrink-0">
                <div className="flex justify-between items-center mb-2">
                    <button className="text-blue-500 text-[17px] font-medium">編集</button>
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-blue-500 font-bold">＋</div>
                </div>
                <h1 className="text-3xl font-bold text-black tracking-tight">メッセージ</h1>
            </header>

            <div className="flex-1 overflow-y-auto">
                {messages.length > 0 ? (
                    messages.map(msg => (
                        /* if the message is clicked, call onSelect with the message data */
                        <div key={msg.id} onClick={() => onSelect(msg)}>
                            <SMSBubble 
                                message={msg} 
                                onClick={() => {}} 
                            />
                        </div>
                    ))
                ) : (
                    <div className="p-10 text-center text-gray-400 italic">
                        メッセージはありません
                    </div>
                )}
            </div>
        </div>
    );
};