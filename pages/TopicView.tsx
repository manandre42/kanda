
import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Tile, Button, Badge } from '../components/CarbonUI';
import { ArrowLeft, Lightbulb, ArrowRight, RefreshCw, MoveUp, MoveDown, Check, X as XIcon, Link as LinkIcon, AlertCircle } from 'lucide-react';
import { DISCIPLINES } from '../mockData';
import { Topic, ExerciseType, Exercise } from '../types';
import { explainConcept } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';

export const TopicView: React.FC = () => {
  const { disciplineId, moduleId, topicId } = useParams();
  const navigate = useNavigate();
  const [topic, setTopic] = useState<Topic | null>(null);
  const [activeTab, setActiveTab] = useState<'content' | 'exercises'>('content');
  const [explanation, setExplanation] = useState<string | null>(null);
  const [loadingExplanation, setLoadingExplanation] = useState(false);

  useEffect(() => {
    const disc = DISCIPLINES.find(d => d.id === disciplineId);
    const mod = disc?.modules.find(m => m.id === moduleId);
    const top = mod?.topics.find(t => t.id === topicId);
    if (top) setTopic(top);
  }, [disciplineId, moduleId, topicId]);

  const handleExplain = async () => {
    if (!topic) return;
    setLoadingExplanation(true);
    const text = await explainConcept(topic.title, "Matemática Pré-Universitária");
    setExplanation(text);
    setLoadingExplanation(false);
  };

  if (!topic) return <div className="p-8">Carregando...</div>;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="mb-4 pl-0">
          <ArrowLeft size={16} className="mr-2" /> Voltar ao Módulo
        </Button>

        <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-carbon-gray100">{topic.title}</h1>
            <Badge type={topic.isCompleted ? 'success' : 'neutral'}>
                {topic.isCompleted ? 'Concluído' : 'Em Progresso'}
            </Badge>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
            <button 
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'content' ? 'border-carbon-blue text-carbon-blue' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
                onClick={() => setActiveTab('content')}
            >
                <div className="flex items-center gap-2"><BookOpenIcon /> Teoria</div>
            </button>
            <button 
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'exercises' ? 'border-carbon-blue text-carbon-blue' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
                onClick={() => setActiveTab('exercises')}
            >
                 <div className="flex items-center gap-2"><CheckIcon /> Exercícios</div>
            </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                {activeTab === 'content' ? (
                    <Tile className="min-h-[400px]">
                         <div className="prose prose-blue max-w-none">
                            <ReactMarkdown>{topic.content}</ReactMarkdown>
                        </div>
                        <div className="mt-12 flex justify-end">
                            <Button onClick={() => setActiveTab('exercises')} icon={<ArrowRight size={16} />}>
                                Ir para Exercícios
                            </Button>
                        </div>
                    </Tile>
                ) : (
                    <div className="space-y-6">
                        {topic.exercises?.map((ex, idx) => (
                            <ExerciseCard key={ex.id} exercise={ex} index={idx} />
                        ))}
                         {(!topic.exercises || topic.exercises.length === 0) && (
                             <div className="text-center py-12 text-gray-500 bg-white border border-dashed rounded-lg">
                                 <p>Sem exercícios disponíveis para este tópico.</p>
                             </div>
                         )}
                    </div>
                )}
            </div>

            {/* Assistant Sidebar */}
            <div className="space-y-4">
                <Tile className="bg-gradient-to-b from-white to-blue-50 border-blue-100">
                    <div className="flex items-center gap-2 mb-3 text-carbon-blue">
                        <Lightbulb size={20} />
                        <h3 className="font-bold">Tutor IA</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                        Não entendeste bem este tópico? Posso explicar de outra forma.
                    </p>
                    <Button 
                        variant="secondary" 
                        size="sm" 
                        className="w-full justify-center" 
                        onClick={handleExplain}
                        isLoading={loadingExplanation}
                    >
                        Explicar Conceito
                    </Button>
                    {explanation && (
                        <div className="mt-4 p-3 bg-white border border-blue-100 text-sm text-gray-800 rounded shadow-sm animate-in slide-in-from-top-2">
                            {explanation}
                        </div>
                    )}
                </Tile>
            </div>
        </div>
      </div>
    </Layout>
  );
};

// --- Subcomponent: Exercise Renderer ---
const ExerciseCard: React.FC<{ exercise: Exercise; index: number }> = ({ exercise, index }) => {
    const [showFeedback, setShowFeedback] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    
    // State wrappers for specific types
    const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
    const [textAnswer, setTextAnswer] = useState('');
    const [matchedPairs, setMatchedPairs] = useState<{[key: string]: string}>({}); // left -> right
    const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
    const [currentOrder, setCurrentOrder] = useState<string[]>([]);

    useEffect(() => {
        // Initialize Ordering Sequence (Shuffle simple version)
        if (exercise.type === ExerciseType.ORDERING && exercise.sequenceItems) {
            // Simple shuffle for demo (sort random)
            const shuffled = [...exercise.sequenceItems].sort(() => Math.random() - 0.5);
            setCurrentOrder(shuffled);
        }
    }, [exercise]);

    const handleSubmit = () => {
        let correct = false;

        switch(exercise.type) {
            case ExerciseType.MULTIPLE_CHOICE:
            case ExerciseType.TRUE_FALSE:
                correct = selectedOpt === exercise.correctAnswer;
                break;
            case ExerciseType.SHORT_ANSWER:
                correct = textAnswer.trim().toLowerCase() === exercise.correctText?.trim().toLowerCase();
                break;
            case ExerciseType.MATCHING:
                // Check if all pairs match
                if (!exercise.pairs) break;
                const allMatched = exercise.pairs.every(p => matchedPairs[p.left] === p.right);
                correct = allMatched && Object.keys(matchedPairs).length === exercise.pairs.length;
                break;
            case ExerciseType.ORDERING:
                 if (!exercise.sequenceItems) break;
                 correct = JSON.stringify(currentOrder) === JSON.stringify(exercise.sequenceItems);
                 break;
        }

        setIsCorrect(correct);
        setShowFeedback(true);
    };

    const handleRetry = () => {
        setShowFeedback(false);
        setIsCorrect(false);
        setSelectedOpt(null);
        setTextAnswer('');
        setMatchedPairs({});
        setSelectedLeft(null);
        if (exercise.type === ExerciseType.ORDERING && exercise.sequenceItems) {
             const shuffled = [...exercise.sequenceItems].sort(() => Math.random() - 0.5);
             setCurrentOrder(shuffled);
        }
    };

    // --- RENDERERS ---

    const renderMultipleChoice = () => (
        <div className="space-y-2">
            {exercise.options?.map((opt, i) => {
                let btnClass = "w-full text-left p-4 border hover:bg-gray-50 transition-all text-sm rounded-lg flex items-center";
                let icon = <span className="mr-3 w-6 h-6 rounded-full border flex items-center justify-center text-xs text-gray-500 font-mono">{String.fromCharCode(65 + i)}</span>;

                if (showFeedback) {
                    if (i === exercise.correctAnswer) {
                        btnClass = "w-full text-left p-4 border bg-green-50 border-green-500 text-green-900 font-medium rounded-lg flex items-center";
                        icon = <Check size={20} className="mr-3 text-green-600" />;
                    }
                    else if (i === selectedOpt && i !== exercise.correctAnswer) {
                        btnClass = "w-full text-left p-4 border bg-red-50 border-red-500 text-red-900 rounded-lg flex items-center";
                         icon = <XIcon size={20} className="mr-3 text-red-600" />;
                    }
                } else if (selectedOpt === i) {
                    btnClass = "w-full text-left p-4 border-2 border-carbon-blue bg-blue-50 text-carbon-blue font-medium rounded-lg flex items-center shadow-sm";
                    icon = <span className="mr-3 w-6 h-6 rounded-full bg-carbon-blue text-white flex items-center justify-center text-xs font-bold">{String.fromCharCode(65 + i)}</span>;
                }
                return (
                    <button key={i} className={btnClass} onClick={() => !showFeedback && setSelectedOpt(i)} disabled={showFeedback}>
                        {icon}
                        {opt}
                    </button>
                )
            })}
        </div>
    );

    const renderShortAnswer = () => (
        <div className="space-y-4">
             <div className="relative">
                <input 
                    type="text"
                    className={`w-full p-4 border-2 rounded-lg bg-white focus:outline-none transition-all text-lg ${showFeedback ? (isCorrect ? 'border-green-500 text-green-800 bg-green-50' : 'border-red-500 text-red-800 bg-red-50') : 'border-gray-200 focus:border-carbon-blue'}`}
                    placeholder="Digita a tua resposta aqui..."
                    value={textAnswer}
                    onChange={(e) => setTextAnswer(e.target.value)}
                    disabled={showFeedback}
                />
                {showFeedback && (
                    <div className="absolute right-4 top-4">
                        {isCorrect ? <Check className="text-green-600"/> : <XIcon className="text-red-600"/>}
                    </div>
                )}
             </div>
             {showFeedback && !isCorrect && (
                <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded">
                    <AlertCircle size={16} />
                    <span>Resposta esperada: <strong>{exercise.correctText}</strong></span>
                </div>
            )}
        </div>
    );

    const renderMatching = () => {
        if (!exercise.pairs) return null;
        // Separate keys for rendering columns
        const lefts = exercise.pairs.map(p => p.left);
        // We need a stable list of rights to render, shuffling only once ideally, but here we just sort for stability in demo
        // In production, store shuffled state
        const rights = useMemo(() => {
             // Create a list of rights that isn't just A->A mapping visually
             const r = exercise.pairs!.map(p => p.right);
             return [...r].sort(); // Alphabetical sort to randomize visually against left
        }, [exercise.pairs]);

        const handleMatchClick = (side: 'left' | 'right', val: string) => {
            if (showFeedback) return;
            if (side === 'left') {
                // If this left is already matched, unmatch it
                if (matchedPairs[val]) {
                    const newPairs = {...matchedPairs};
                    delete newPairs[val];
                    setMatchedPairs(newPairs);
                }
                setSelectedLeft(val);
            } else {
                if (selectedLeft) {
                    setMatchedPairs({...matchedPairs, [selectedLeft]: val});
                    setSelectedLeft(null);
                }
            }
        };

        return (
            <div className="grid grid-cols-2 gap-4 md:gap-8">
                {/* Left Column */}
                <div className="space-y-3">
                    <p className="text-xs font-bold text-gray-400 uppercase text-center">Termo</p>
                    {lefts.map(l => {
                        const isMatched = !!matchedPairs[l];
                        const isSelected = selectedLeft === l;
                        return (
                            <div 
                                key={l} 
                                onClick={() => handleMatchClick('left', l)}
                                className={`p-4 border rounded-lg text-sm cursor-pointer transition-all relative ${
                                    isMatched 
                                    ? 'bg-blue-50 border-blue-200 text-blue-800' 
                                    : isSelected 
                                        ? 'ring-2 ring-carbon-blue border-carbon-blue shadow-md' 
                                        : 'bg-white hover:bg-gray-50 border-gray-200'
                                }`}
                            >
                                {l}
                                {isMatched && (
                                    <div className="absolute right-2 top-1/2 -translate-y-1/2 text-carbon-blue">
                                        <LinkIcon size={14} />
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
                
                {/* Right Column */}
                <div className="space-y-3">
                     <p className="text-xs font-bold text-gray-400 uppercase text-center">Definição / Valor</p>
                     {rights.map(r => {
                         // Find which left key is matched to this right val
                         const matchedKey = Object.keys(matchedPairs).find(key => matchedPairs[key] === r);
                         const isMatched = !!matchedKey;
                         
                         return (
                            <div 
                                key={r} 
                                onClick={() => handleMatchClick('right', r)}
                                className={`p-4 border rounded-lg text-sm cursor-pointer transition-all ${
                                    isMatched 
                                    ? 'bg-gray-100 text-gray-500 border-gray-200 cursor-not-allowed opacity-60' 
                                    : 'bg-white hover:bg-gray-50 border-gray-200'
                                }`}
                            >
                                {isMatched ? (
                                    <span className="flex items-center gap-2">
                                        <span className="font-bold text-gray-700">{matchedKey}</span> 
                                        <ArrowRight size={12} />
                                        {r}
                                    </span>
                                ) : r}
                            </div>
                        )
                     })}
                </div>
            </div>
        )
    };

    const renderOrdering = () => {
        const moveItem = (idx: number, dir: -1 | 1) => {
            if (showFeedback) return;
            const newOrder = [...currentOrder];
            const swapIdx = idx + dir;
            if (swapIdx < 0 || swapIdx >= newOrder.length) return;
            [newOrder[idx], newOrder[swapIdx]] = [newOrder[swapIdx], newOrder[idx]];
            setCurrentOrder(newOrder);
        }

        return (
            <div className="space-y-2">
                {currentOrder.map((item, i) => (
                    <div key={item} className={`flex items-center gap-3 p-3 border rounded-lg bg-white shadow-sm transition-all ${
                        showFeedback 
                            ? (exercise.sequenceItems?.[i] === item 
                                ? 'border-green-300 bg-green-50' 
                                : 'border-red-300 bg-red-50') 
                            : 'hover:border-blue-200'
                    }`}>
                        <div className="flex flex-col gap-1">
                            <button onClick={() => moveItem(i, -1)} disabled={i === 0 || showFeedback} className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-carbon-blue disabled:opacity-20"><MoveUp size={14}/></button>
                            <button onClick={() => moveItem(i, 1)} disabled={i === currentOrder.length - 1 || showFeedback} className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-carbon-blue disabled:opacity-20"><MoveDown size={14}/></button>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-500 text-sm">
                            {i+1}º
                        </div>
                        <span className="text-sm font-medium flex-1">{item}</span>
                        {showFeedback && (
                            <div>
                                {exercise.sequenceItems?.[i] === item 
                                    ? <Check size={18} className="text-green-600"/> 
                                    : <XIcon size={18} className="text-red-600"/>
                                }
                            </div>
                        )}
                    </div>
                ))}
            </div>
        )
    };

    return (
        <Tile className={`transition-all duration-300 relative overflow-hidden ${showFeedback ? (isCorrect ? 'ring-2 ring-green-500' : 'ring-2 ring-red-500') : 'hover:shadow-md'}`}>
            <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-carbon-blue bg-blue-50 px-2 py-1 rounded uppercase tracking-wider">
                        {exercise.type === ExerciseType.ORDERING ? 'Ordenação' : exercise.type === ExerciseType.MATCHING ? 'Correspondência' : exercise.type === ExerciseType.SHORT_ANSWER ? 'Preencher' : 'Múltipla Escolha'}
                    </span>
                    <span className="text-xs text-gray-400 font-mono">ID: {exercise.id}</span>
                </div>
                <h3 className="text-lg font-medium text-gray-900 leading-snug">{exercise.statement}</h3>
            </div>
            
            <div className="mb-8">
                {(exercise.type === ExerciseType.MULTIPLE_CHOICE || exercise.type === ExerciseType.TRUE_FALSE) && renderMultipleChoice()}
                {exercise.type === ExerciseType.SHORT_ANSWER && renderShortAnswer()}
                {exercise.type === ExerciseType.MATCHING && renderMatching()}
                {exercise.type === ExerciseType.ORDERING && renderOrdering()}
            </div>

            {!showFeedback ? (
                <div className="flex justify-end pt-4 border-t border-gray-50">
                    <Button onClick={handleSubmit} size="sm" className="px-6">Verificar Resposta</Button>
                </div>
            ) : (
                <div className="animate-in fade-in slide-in-from-bottom-2 bg-gray-50 -mx-4 -mb-4 p-4 mt-6 border-t border-gray-100">
                    <div className={`flex items-start gap-3 mb-4`}>
                        <div className={`p-2 rounded-full ${isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {isCorrect ? <Check size={20}/> : <XIcon size={20}/>}
                        </div>
                        <div>
                            <p className={`font-bold text-sm ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                                {isCorrect ? 'Excelente! Resposta correta.' : 'Ops! Não foi dessa vez.'}
                            </p>
                            <p className="text-sm text-gray-600 mt-1">{exercise.explanation}</p>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <Button variant="ghost" size="sm" onClick={handleRetry} icon={<RefreshCw size={14}/>}>Tentar Novamente</Button>
                    </div>
                </div>
            )}
        </Tile>
    )
};

const BookOpenIcon = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
const CheckIcon = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
