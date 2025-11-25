
import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Coffee, BrainCircuit } from 'lucide-react';
import { Button } from './CarbonUI';

export const PomodoroTimer: React.FC = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'focus' | 'break'>('focus');

  useEffect(() => {
    let interval: any = null;
    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            // Timer finished
            setIsActive(false);
            // Auto switch mode for convenience or just stop
            if (mode === 'focus') {
                setMode('break');
                setMinutes(5);
            } else {
                setMode('focus');
                setMinutes(25);
            }
            // Optional: Play sound here
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds, minutes, mode]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setSeconds(0);
    setMinutes(mode === 'focus' ? 25 : 5);
  };

  const switchMode = () => {
      setIsActive(false);
      setSeconds(0);
      if (mode === 'focus') {
          setMode('break');
          setMinutes(5);
      } else {
          setMode('focus');
          setMinutes(25);
      }
  }

  return (
    <div className={`rounded-lg p-4 border transition-colors duration-300 ${mode === 'focus' ? 'bg-white border-red-100' : 'bg-green-50 border-green-200'}`}>
        <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
                {mode === 'focus' ? <BrainCircuit size={18} className="text-red-500"/> : <Coffee size={18} className="text-green-600"/>}
                <span className={`text-xs font-bold uppercase tracking-wider ${mode === 'focus' ? 'text-red-500' : 'text-green-600'}`}>
                    {mode === 'focus' ? 'Pomodoro Focus' : 'Pausa Curta'}
                </span>
            </div>
            <button onClick={switchMode} className="text-[10px] underline text-gray-400 hover:text-gray-600">
                Trocar
            </button>
        </div>
        
        <div className="text-4xl font-mono font-bold text-center mb-4 text-gray-800">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>

        <div className="flex justify-center gap-2">
            <Button 
                variant={mode === 'focus' ? 'danger' : 'primary'} 
                size="sm" 
                onClick={toggleTimer}
                className={mode === 'break' ? '!bg-green-600 hover:!bg-green-700' : ''}
            >
                {isActive ? <Pause size={16} /> : <Play size={16} />}
            </Button>
            <Button variant="ghost" size="sm" onClick={resetTimer}>
                <RotateCcw size={16} />
            </Button>
        </div>
    </div>
  );
};
