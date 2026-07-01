
import React, { useState } from 'react';
import ActiveCallScreen from './components/ActiveCallScreen';
import { CallConfig, CallScenario, CustomerPersonality } from './types';
import { DEFAULT_SCRIPTS } from './data/defaultScripts';
import { MOCK_SELLERS } from './data/sellers';
import { motion, AnimatePresence } from 'motion/react';

const App: React.FC = () => {
  const [user] = useState<{name: string, id: string}>({ 
    name: "Agent", 
    id: "AG-001" 
  });
  
  const [config] = useState<CallConfig>({
    executiveName: 'Agent',
    employeeId: 'AG-001',
    scenario: CallScenario.AI_AUTOMATION,
    personality: CustomerPersonality.POLITE_AGENT,
    customerScript: DEFAULT_SCRIPTS[CallScenario.AI_AUTOMATION].customerScript,
    executiveScript: DEFAULT_SCRIPTS[CallScenario.AI_AUTOMATION].executiveScript,
    selectedSeller: MOCK_SELLERS.find(s => s.name === 'Shivang Sharma') || MOCK_SELLERS[0]
  });

  const handleEndCall = async (transcript: string, duration: number, recordingBlob: Blob | null) => {
    // For now we do nothing when call ends, just stay on screen or reload
    window.location.reload();
  };

  return (
    <div className="min-h-[100dvh] bg-[#050505] font-sans text-white flex flex-col items-center justify-center">
      <main className="w-full max-w-sm sm:max-w-[400px] h-[100dvh] sm:h-[85vh] sm:min-h-[700px] sm:max-h-[850px] sm:rounded-[40px] sm:shadow-[0_0_100px_rgba(255,255,255,0.02)] relative overflow-hidden flex flex-col items-center justify-center border border-white/5">
        <AnimatePresence mode="wait">
          <motion.div
            key="call"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full flex flex-col"
          >
            <ActiveCallScreen config={config} onEndCall={handleEndCall} />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default App;
