import { useState } from 'react';
import { SMSList } from './components/SMSList';
import { SMSThread } from './components/SMSThread';
import type { SMSMessage } from './types/message';

function App() {
  const [selectedMessage, setSelectedMessage] = useState<SMSMessage | null>(null);

  return (
    <div className="min-h-screen flex items-center justify-center p-0 sm:p-4 bg-gray-200">
      <div className="w-full h-screen sm:max-w-[390px] sm:h-[844px] sm:rounded-[3.5rem] sm:shadow-2xl overflow-hidden bg-white sm:border-[8px] sm:border-black relative flex flex-col">
        <div className="flex-1 overflow-hidden">
          {selectedMessage ? (
            <SMSThread message={selectedMessage} onBack={() => setSelectedMessage(null)} />
          ) : (
            <SMSList onSelect={(msg) => setSelectedMessage(msg)} />
          )}
        </div>
        <div className="hidden sm:block h-6 w-full bg-white shrink-0 relative">
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-black/10 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}

export default App;