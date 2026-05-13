import type { SMSMessage } from '../types/message';

interface Props {
    message: SMSMessage;
    onBack: () => void;
}

export const SMSThread = ({ message, onBack }: Props) => {
    const handleLinkClick = () => {
        window.open(message.link_url, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="flex flex-col h-full bg-white animate-in slide-in-from-right duration-300">
            {/* header from iOS Messages app */}
            <header className="px-4 pt-10 pb-3 border-b flex items-center bg-gray-50/90 backdrop-blur-md sticky top-0 z-10">
                <button onClick={onBack} className="flex items-center text-blue-600 hover:opacity-70">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className="text-[17px]">戻る</span>
                </button>
                <div className="flex-1 flex flex-col items-center mr-8">
                    <div className="w-7 h-7 rounded-full bg-gray-300 flex items-center justify-center mb-0.5 text-[10px] text-white font-bold">
                        {message.sender.charAt(0)}
                    </div>
                    <span className="text-[10px] font-medium text-gray-800">{message.sender}</span>
                </div>
            </header>

            {/* message content */}
            <main className="flex-1 p-4 overflow-y-auto bg-white flex flex-col gap-4">
                <div className="text-center my-2">
                    <span className="text-[11px] font-bold text-gray-400 uppercase">iMessage</span>
                </div>

                <div className="flex flex-col items-start max-w-[85%]">
                    <div className="bg-[#e9e9eb] text-black p-3 rounded-2xl rounded-tl-none text-[15px] leading-relaxed">
                        <p>{message.content}</p>
                        <button 
                            onClick={handleLinkClick}
                            className="text-blue-600 underline break-all mt-1 block text-left font-medium"
                        >
                            {message.display_url}
                        </button>
                    </div>
                    <span className="text-[10px] text-gray-400 mt-1 ml-1">配信済み</span>
                </div>
            </main>

            {/* footer from iOS Messages app */}
            <footer className="p-3 pb-10 bg-white border-t flex items-center gap-2">
                <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400">＋</div>
                <div className="flex-1 bg-white border border-gray-200 rounded-full px-4 py-1.5 text-gray-300 text-sm">iMessage</div>
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-white">↑</div>
            </footer>
        </div>
    );
};