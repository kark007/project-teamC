import type { SMSMessage } from '../types/message';

interface Props {
    message: SMSMessage;
    onClick: (url: string) => void;
}

export const SMSBubble = ({ message, onClick }: Props) => {
    const initial = message.sender.charAt(0).toUpperCase();

    return (
        <div className="flex items-center p-4 hover:bg-gray-50 active:bg-gray-100 transition-colors cursor-pointer group">
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-4 shrink-0">
                <span className="text-gray-500 text-xl font-medium">{initial}</span>
            </div>

            <div className="flex-1 min-w-0 border-b border-gray-100 pb-4 group-last:border-none">
                <div className="flex justify-between items-baseline mb-1">
                    <h2 className="text-[16px] font-bold text-gray-900 truncate">
                        {message.sender}
                    </h2>
                    <span className="text-[14px] text-gray-500 ml-2">現在</span>
                </div>
                <div className="flex justify-between items-start">
                    <p className="text-[14px] text-gray-500 line-clamp-2 leading-snug pr-4">
                        {message.content}
                    </p>
                    <div className="mt-1 shrink-0 text-gray-300">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};