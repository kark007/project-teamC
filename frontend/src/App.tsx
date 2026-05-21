import { useState } from 'react';
import { SMSList } from './components/SMSList';
import { SMSThread } from './components/SMSThread';
import type { SMSMessage } from './types/message';

type ViewMode = 'title' | 'list' | 'thread';

function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('title');
  const [selectedMessage, setSelectedMessage] = useState<SMSMessage | null>(null);

  const handleSelectMessage = (msg: SMSMessage) => {
    setSelectedMessage(msg);
    setViewMode('thread');
  };

  const handleBackToList = () => {
    setSelectedMessage(null);
    setViewMode('list');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-0 sm:p-4 bg-zinc-900">
      {/* smartphone-style inner frame */}
      <div className="w-full h-screen sm:max-w-[390px] sm:h-[844px] sm:rounded-[3.5rem] sm:shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden bg-white sm:border-[8px] sm:border-black relative flex flex-col">
        
        {/* main content area */}
        <div className="flex-1 overflow-hidden relative">
          {viewMode === 'title' && (
            <div className="flex flex-col h-full bg-[#1a1414] text-red-500 p-6 justify-between animate-in fade-in duration-700 font-mono relative overflow-hidden select-none border border-red-900/40">

              {/* background effect 1：alert red flickering gradient */}
              <div className="absolute inset-0 bg-gradient-to-tr from-red-950/40 via-transparent to-transparent opacity-80 animate-pulse pointer-events-none"></div>
              
              {/* background effect 2：digital matrix grid */}
              <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,0,0,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,0,0.15)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>

              {/* background effect 3：up to bottom scanline */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-red-500/30 opacity-40 shadow-[0_0_12px_rgba(239,68,68,0.8)] [animation:scanline_4s_linear_infinite] pointer-events-none"></div>
              <style>{`
                @keyframes scanline {
                  0% { top: -5%; }
                  100% { top: 105%; }
                }
              `}</style>

              {/* header section ：red alert header and title */}
              <div className="mt-16 text-center relative z-10">
                {/* A rapidly flashing warning badge symbolizing cyber threats */}
                <div className="w-20 h-20 bg-zinc-900/90 border-2 border-red-500 rounded-xl mx-auto flex items-center justify-center shadow-[0_0_30px_rgba(239,68,68,0.6)] mb-6 animate-pulse">
                  <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                
                <div className="inline-block px-3 py-1 bg-red-950/80 border border-red-500/50 rounded text-[10px] font-bold text-red-400 tracking-widest uppercase mb-3 animate-bounce">
                  CRITICAL SECURITY ALERT
                </div>
                
                <h1 className="text-2xl font-black tracking-tight text-white leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,1)]">
                  Information Security Lab<br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 font-extrabold animate-pulse">
                    DeSmishing
                  </span>
                </h1>
                <p className="text-[10px] text-red-400/60 mt-2 tracking-widest font-mono">SYS_STATUS: INFECTION_SIMULATION_ACTIVE</p>
              </div>

              {/* middle section: terminal-style alert panel */}
              <div className="bg-black/90 border-2 border-red-900/60 rounded-xl p-4 space-y-3 text-[12px] text-zinc-300 relative z-10 shadow-2xl">
                <div className="flex items-center justify-between border-b border-red-950 pb-1.5">
                  <span className="font-bold text-red-500 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping inline-block"></span>
                    [SYSTEM_LOG: ACTIVE]
                  </span>
                  <span className="text-[9px] text-zinc-600 font-mono">ID: SMISH-8002</span>
                </div>
                
                <p className="leading-relaxed font-sans text-zinc-400">
                  日常に溶け込み、あなたのスマートフォンへ届く「偽りの案内状」——詐欺SMS。
                </p>
                <p className="leading-relaxed font-sans text-zinc-400">
                  一歩足を踏み入れれば、そこは正規のセキュリティ網を掻い潜る、狡猾な攻撃手法のシミュレーションフィールドです。
                </p>

                <div className="bg-red-950/30 rounded p-2.5 border border-red-900/40 text-[11px] text-red-400 font-mono space-y-1">
                  <p className="font-bold flex items-center gap-1">
                    <span>⚡</span> 擬態ベクトル: フィッシングサイト等
                  </p>
                  <p className="text-zinc-500 leading-normal font-sans text-[10px]">
                    ※メッセージ内のリンクをクリックすると、メンバーが作成した模擬脅威サイトが開きます。
                  </p>
                </div>
              </div>

              {/* bottom section: intrusion start button */}
              <div className="mb-10 relative z-10">
                <button 
                  onClick={() => setViewMode('list')}
                  className="w-full py-4 bg-red-950/50 border-2 border-red-600 hover:bg-red-900/80 text-red-400 font-bold rounded-xl shadow-[0_0_25px_rgba(220,38,38,0.4)] transition-all active:scale-95 flex items-center justify-center gap-2 group hover:text-white hover:border-red-400"
                >
                  <span className="tracking-widest font-black transition-colors">
                    [ 脅威空間へ進入する ]
                  </span>
                  <svg className="w-5 h-5 text-red-500 group-hover:text-white transition-all transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {viewMode === 'list' && (
            <SMSList onSelect={handleSelectMessage} />
          )}

          {viewMode === 'thread' && selectedMessage && (
            <SMSThread message={selectedMessage} onBack={handleBackToList} />
          )}
        </div>

        {/* bottom bar (iOS-style home indicator) */}
        <div className="hidden sm:block h-6 w-full bg-white shrink-0 relative">
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-black/10 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}

export default App;