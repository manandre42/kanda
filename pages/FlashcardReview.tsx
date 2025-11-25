
import React, { useState, useMemo } from 'react';
import { Layout } from '../components/Layout';
import { Tile, Button } from '../components/CarbonUI';
import { PomodoroTimer } from '../components/PomodoroTimer';
import { FLASHCARDS } from '../mockData';
import { calculateNextReview, getDueDateLabel } from '../services/srsService';
import { Flashcard } from '../types';
import { RotateCcw, Check, BrainCircuit } from 'lucide-react';

export const FlashcardReview: React.FC = () => {
  // Filter cards that are due (date <= now)
  const initialDueCards = useMemo(() => {
    const now = new Date();
    return FLASHCARDS.filter(c => new Date(c.nextReviewDate) <= now);
  }, []);

  const [queue, setQueue] = useState<Flashcard[]>(initialDueCards);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sessionComplete, setSessionComplete] = useState(false);

  const currentCard = queue[currentCardIndex];

  const handleRate = (quality: number) => {
    if (!currentCard) return;

    // Calculate new SRS data
    const updatedCard = calculateNextReview(currentCard, quality);
    
    // In a real app, we would save 'updatedCard' to DB here
    console.log(`Card ${updatedCard.id} updated. Next review: ${updatedCard.nextReviewDate}`);

    // Move to next
    if (currentCardIndex < queue.length - 1) {
      setIsFlipped(false);
      setCurrentCardIndex(prev => prev + 1);
    } else {
      setSessionComplete(true);
    }
  };

  if (sessionComplete || queue.length === 0) {
    return (
        <Layout>
            <div className="max-w-2xl mx-auto py-12 text-center">
                <Tile className="p-12">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Check size={40} className="text-green-600" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Revisão Concluída!</h1>
                    <p className="text-gray-500 mb-8">Parabéns! Revisaste todos os cartões pendentes por hoje.</p>
                    <div className="flex justify-center gap-4">
                        <Button onClick={() => window.location.href = '#/dashboard'}>Voltar ao Dashboard</Button>
                    </div>
                </Tile>
            </div>
        </Layout>
    )
  }

  return (
    <Layout>
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main Flashcard Area */}
        <div className="md:col-span-2">
            <header className="mb-6 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-light text-carbon-gray100">Revisão Espaçada</h1>
                    <p className="text-sm text-gray-500">Cartão {currentCardIndex + 1} de {queue.length}</p>
                </div>
            </header>

            <div className="relative perspective-1000 min-h-[400px]">
                <Tile className={`h-[400px] flex flex-col justify-center items-center p-8 text-center transition-all duration-500 cursor-pointer border-b-8 ${isFlipped ? 'border-b-carbon-blue bg-blue-50' : 'border-b-gray-300'}`} onClick={() => !isFlipped && setIsFlipped(true)}>
                    
                    <div className="flex-1 flex items-center justify-center w-full">
                        {isFlipped ? (
                            <div className="animate-in fade-in zoom-in duration-300">
                                <span className="text-xs font-bold uppercase text-gray-400 mb-4 block">Resposta</span>
                                <p className="text-xl md:text-2xl font-medium text-gray-800">{currentCard.back}</p>
                            </div>
                        ) : (
                            <div>
                                <span className="text-xs font-bold uppercase text-gray-400 mb-4 block">Pergunta</span>
                                <p className="text-xl md:text-2xl font-medium text-gray-800">{currentCard.front}</p>
                                <p className="text-xs text-gray-400 mt-8">(Clica para virar)</p>
                            </div>
                        )}
                    </div>
                </Tile>
            </div>

            {/* SRS Controls */}
            {isFlipped ? (
                <div className="grid grid-cols-4 gap-4 mt-6">
                    <div className="flex flex-col gap-1">
                        <Button variant="danger" className="w-full justify-center" onClick={() => handleRate(0)}>Errei</Button>
                        <span className="text-[10px] text-center text-gray-400">1d</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <Button variant="secondary" className="w-full justify-center" onClick={() => handleRate(1)}>Difícil</Button>
                        <span className="text-[10px] text-center text-gray-400">{getDueDateLabel(Math.round(currentCard.interval * 1.2))}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <Button className="w-full justify-center bg-blue-600 hover:bg-blue-700 text-white" onClick={() => handleRate(2)}>Bom</Button>
                        <span className="text-[10px] text-center text-gray-400">{getDueDateLabel(Math.round(currentCard.interval * 2.5))}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <Button className="w-full justify-center bg-green-600 hover:bg-green-700 text-white" onClick={() => handleRate(3)}>Fácil</Button>
                        <span className="text-[10px] text-center text-gray-400">{getDueDateLabel(Math.round(currentCard.interval * 3.5))}</span>
                    </div>
                </div>
            ) : (
                <div className="mt-6">
                    <Button size="lg" className="w-full justify-center" onClick={() => setIsFlipped(true)}>Mostrar Resposta</Button>
                </div>
            )}
        </div>

        {/* Sidebar: Pomodoro & Stats */}
        <div className="space-y-6">
            <PomodoroTimer />

            <Tile>
                <h3 className="font-bold text-sm mb-4 flex items-center gap-2">
                    <BrainCircuit size={16} /> Estatísticas da Sessão
                </h3>
                <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Restantes</span>
                        <span className="font-mono font-bold">{queue.length - currentCardIndex}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Novos</span>
                        <span className="font-mono font-bold text-green-600">0</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Revisões</span>
                        <span className="font-mono font-bold text-blue-600">{queue.length}</span>
                    </div>
                </div>
            </Tile>
        </div>
      </div>
    </Layout>
  );
};
