import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Tile } from '../components/CarbonUI';
import { ArrowRight, Check } from 'lucide-react';
import { generateStudyPlan } from '../services/geminiService';

export const Onboarding: React.FC = () => {
  const [step, setStep] = useState(1);
  const [course, setCourse] = useState('');
  const [level, setLevel] = useState('');
  const [weaknesses, setWeaknesses] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const navigate = useNavigate();

  const handleFinish = async () => {
    setIsGenerating(true);
    // Call Gemini to generate initial suggestions logic (not storing result in this demo, just showing integration)
    await generateStudyPlan(course, level, weaknesses);
    setIsGenerating(false);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-carbon-gray10 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-carbon-gray100 mb-2">Bem-vindo à KANDA</h1>
          <p className="text-gray-500">Vamos personalizar a tua experiência de preparação.</p>
        </div>

        {/* Progress Steps */}
        <div className="flex mb-8 justify-between px-4">
          {[1, 2, 3].map((s) => (
            <div key={s} className={`h-1 w-full mx-1 ${s <= step ? 'bg-carbon-blue' : 'bg-gray-300'}`} />
          ))}
        </div>

        <Tile className="min-h-[300px] flex flex-col">
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300 flex-1">
              <h2 className="text-xl font-bold mb-6">Qual é o teu objetivo?</h2>
              <Input 
                label="Curso Universitário Pretendido"
                placeholder="Ex: Engenharia Informática, Medicina..."
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                autoFocus
              />
              <div className="mt-4">
                <label className="text-xs text-carbon-gray80 mb-2 block font-semibold uppercase tracking-wide">País de Estudo</label>
                <select className="w-full h-10 bg-carbon-gray10 border-b border-carbon-gray80 px-4 focus:outline-none focus:border-carbon-blue">
                    <option>Angola</option>
                    <option>Portugal</option>
                    <option>Moçambique</option>
                    <option>Brasil</option>
                </select>
              </div>
            </div>
          )}

          {step === 2 && (
             <div className="animate-in fade-in slide-in-from-right-4 duration-300 flex-1">
              <h2 className="text-xl font-bold mb-6">Como avalias o teu conhecimento atual?</h2>
              <div className="space-y-3">
                {['Iniciante (Preciso rever as bases)', 'Intermédio (Tenho boas noções)', 'Avançado (Só preciso praticar)'].map((opt) => (
                    <div 
                        key={opt}
                        onClick={() => setLevel(opt)}
                        className={`p-4 border cursor-pointer transition-all ${level === opt ? 'border-carbon-blue bg-blue-50 ring-1 ring-carbon-blue' : 'border-gray-200 hover:border-gray-400'}`}
                    >
                        <div className="flex items-center">
                            <div className={`w-4 h-4 rounded-full border mr-3 flex items-center justify-center ${level === opt ? 'border-carbon-blue' : 'border-gray-400'}`}>
                                {level === opt && <div className="w-2 h-2 bg-carbon-blue rounded-full" />}
                            </div>
                            <span className="text-sm">{opt}</span>
                        </div>
                    </div>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
             <div className="animate-in fade-in slide-in-from-right-4 duration-300 flex-1">
              <h2 className="text-xl font-bold mb-6">Onde tens mais dificuldade?</h2>
              <Input 
                label="Áreas a melhorar"
                placeholder="Ex: Trigonometria, Química Orgânica..."
                value={weaknesses}
                onChange={(e) => setWeaknesses(e.target.value)}
                helperText="A IA vai usar isto para sugerir conteúdos iniciais."
              />
              
              <div className="bg-blue-50 p-4 border-l-4 border-blue-500 mt-4">
                  <p className="text-sm text-blue-800">
                      <strong>Nota:</strong> O nosso sistema irá gerar um plano adaptativo baseado nas tuas respostas.
                  </p>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
            {step > 1 ? (
                <Button variant="ghost" onClick={() => setStep(step - 1)}>Voltar</Button>
            ) : <div></div>}
            
            {step < 3 ? (
                <Button onClick={() => setStep(step + 1)} icon={<ArrowRight size={16} />} disabled={!course && step === 1}>
                    Próximo
                </Button>
            ) : (
                <Button onClick={handleFinish} isLoading={isGenerating} icon={<Check size={16} />}>
                    Criar Plano
                </Button>
            )}
          </div>
        </Tile>
      </div>
    </div>
  );
};
