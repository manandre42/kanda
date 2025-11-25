
import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { Tile, Button, Input, Badge } from '../components/CarbonUI';
import { Plus, BookOpen, FileText, Layers, Save, Users, TrendingUp, MessageCircle, BrainCircuit, GripVertical, Trash2 } from 'lucide-react';
import { DISCIPLINES } from '../mockData';
import { Link } from 'react-router-dom';
import { ExerciseType } from '../types';

export const TeacherDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'create' | 'students'>('overview');
  const [createType, setCreateType] = useState<'discipline' | 'module' | 'lesson' | 'flashcard' | 'exercise'>('lesson');
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  // Flashcard specific
  const [fcFront, setFcFront] = useState('');
  const [fcBack, setFcBack] = useState('');

  // Exercise Specific
  const [exType, setExType] = useState<ExerciseType>(ExerciseType.MULTIPLE_CHOICE);
  const [exStatement, setExStatement] = useState('');
  const [exExplanation, setExExplanation] = useState('');
  // Multiple Choice
  const [exOptions, setExOptions] = useState(['', '', '', '']);
  const [exCorrectIndex, setExCorrectIndex] = useState(0);
  // Short Answer
  const [exCorrectText, setExCorrectText] = useState('');
  // Matching
  const [exPairs, setExPairs] = useState([{left: '', right: ''}, {left: '', right: ''}]);
  // Ordering
  const [exSequence, setExSequence] = useState(['', '', '']);

  // Helpers for array manipulation
  const updateOption = (idx: number, val: string) => {
      const newOpts = [...exOptions];
      newOpts[idx] = val;
      setExOptions(newOpts);
  };
  
  const addPair = () => setExPairs([...exPairs, {left: '', right: ''}]);
  const updatePair = (idx: number, field: 'left' | 'right', val: string) => {
      const newPairs = [...exPairs];
      newPairs[idx][field] = val;
      setExPairs(newPairs);
  };

  const addSeqItem = () => setExSequence([...exSequence, '']);
  const updateSeqItem = (idx: number, val: string) => {
      const newSeq = [...exSequence];
      newSeq[idx] = val;
      setExSequence(newSeq);
  }

  return (
    <Layout>
      <header className="flex justify-between items-center mb-8">
        <div>
             <h1 className="text-3xl font-light text-carbon-gray100 mb-1">
                Painel de Gestão
            </h1>
            <p className="text-gray-600 text-sm">Bem-vinda, <span className="font-bold">Prof. Amélia</span>.</p>
        </div>
        <div className="flex gap-2">
             <Button 
                variant={activeTab === 'create' ? 'primary' : 'secondary'} 
                onClick={() => setActiveTab('create')}
                icon={<Plus size={16} />}
             >
                Novo Conteúdo
             </Button>
        </div>
      </header>

      {/* Tabs Navigation */}
      <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
        <TabButton active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} label="Minhas Disciplinas" icon={<Layers size={18}/>} />
        <TabButton active={activeTab === 'students'} onClick={() => setActiveTab('students')} label="Turmas e Alunos" icon={<Users size={18}/>} />
        <TabButton active={activeTab === 'create'} onClick={() => setActiveTab('create')} label="Editor de Aulas" icon={<FileText size={18}/>} />
      </div>

      {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {DISCIPLINES.map((d) => (
                  <Tile key={d.id} className="group cursor-pointer hover:border-carbon-blue relative overflow-hidden transition-all hover:shadow-lg">
                      <div className={`h-2 w-full absolute top-0 left-0 ${d.color}`}></div>
                      <div className="pt-2">
                          <div className="flex justify-between items-start mb-2">
                              <h3 className="font-bold text-lg">{d.name}</h3>
                              <Badge>Ativo</Badge>
                          </div>
                          <p className="text-sm text-gray-500 mb-4 line-clamp-2 min-h-[40px]">{d.description}</p>
                          <div className="w-full bg-gray-100 h-px mb-4"></div>
                          <div className="flex justify-between items-center text-xs text-gray-500 font-mono">
                              <span className="flex items-center gap-1"><Layers size={12}/> {d.modules.length} Módulos</span>
                              <span className="flex items-center gap-1"><Users size={12}/> 45 Alunos</span>
                          </div>
                      </div>
                  </Tile>
              ))}
          </div>
      )}

      {activeTab === 'create' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                  <Tile>
                      <h2 className="font-bold text-lg mb-6 pb-2 border-b border-gray-100">Criar/Editar Conteúdo</h2>
                      
                      {/* Type Selector */}
                      <div className="flex gap-2 mb-6 bg-gray-50 p-2 rounded flex-wrap">
                          {['discipline', 'module', 'lesson', 'flashcard', 'exercise'].map((t) => (
                              <label key={t} className={`flex items-center cursor-pointer px-3 py-2 rounded transition-colors ${createType === t ? 'bg-white shadow-sm text-carbon-blue font-bold' : 'text-gray-500 hover:bg-gray-200'}`}>
                                  <input 
                                    type="radio" 
                                    name="type" 
                                    checked={createType === t} 
                                    onChange={() => setCreateType(t as any)}
                                    className="hidden"
                                  />
                                  <span className="capitalize text-sm">
                                    {t === 'lesson' ? 'Aula/Tópico' : t === 'module' ? 'Módulo' : t === 'flashcard' ? 'Flashcard' : t === 'exercise' ? 'Exercício' : 'Disciplina'}
                                  </span>
                              </label>
                          ))}
                      </div>

                      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                          <div className="grid grid-cols-2 gap-4">
                             <div className="col-span-2 md:col-span-1">
                                <label className="text-xs font-bold uppercase text-gray-500 mb-1 block">Disciplina Alvo</label>
                                <select className="w-full h-10 bg-gray-100 border-b border-gray-300 px-3 text-sm focus:border-carbon-blue focus:outline-none">
                                    {DISCIPLINES.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                                </select>
                             </div>
                             {(createType === 'lesson' || createType === 'flashcard' || createType === 'exercise') && (
                                <div className="col-span-2 md:col-span-1">
                                    <label className="text-xs font-bold uppercase text-gray-500 mb-1 block">Módulo (Opcional)</label>
                                    <select className="w-full h-10 bg-gray-100 border-b border-gray-300 px-3 text-sm focus:border-carbon-blue focus:outline-none">
                                        <option>Selecione um módulo...</option>
                                        {DISCIPLINES[0].modules.map(m => <option key={m.id} value={m.id}>{m.title}</option>)}
                                    </select>
                                </div>
                             )}
                          </div>

                          {/* --- FLASHCARD FORM --- */}
                          {createType === 'flashcard' && (
                            <div className="space-y-4 animate-in fade-in">
                                <div className="p-4 bg-blue-50 border border-blue-200 rounded text-sm text-blue-800 mb-2">
                                    <BrainCircuit size={16} className="inline mr-2" />
                                    Estes cartões serão usados no algoritmo de repetição espaçada (SRS).
                                </div>
                                <div>
                                    <label className="text-xs font-bold uppercase text-gray-500 mb-1 block">Frente (Pergunta)</label>
                                    <textarea className="w-full h-24 p-3 bg-gray-50 border border-gray-200 focus:border-carbon-blue focus:outline-none text-sm"
                                        placeholder="Ex: Qual é a fórmula de Bhaskara?"
                                        value={fcFront} onChange={(e) => setFcFront(e.target.value)} />
                                </div>
                                <div>
                                    <label className="text-xs font-bold uppercase text-gray-500 mb-1 block">Verso (Resposta)</label>
                                    <textarea className="w-full h-24 p-3 bg-gray-50 border border-gray-200 focus:border-carbon-blue focus:outline-none text-sm"
                                        placeholder="Ex: x = (-b ± √(Δ)) / 2a"
                                        value={fcBack} onChange={(e) => setFcBack(e.target.value)} />
                                </div>
                            </div>
                          )}

                          {/* --- EXERCISE FORM (NEW) --- */}
                          {createType === 'exercise' && (
                              <div className="space-y-4 animate-in fade-in">
                                  <div>
                                      <label className="text-xs font-bold uppercase text-gray-500 mb-1 block">Tipo de Exercício</label>
                                      <select 
                                        className="w-full h-10 bg-gray-100 border-b border-gray-300 px-3 text-sm focus:border-carbon-blue focus:outline-none"
                                        value={exType}
                                        onChange={(e) => setExType(e.target.value as ExerciseType)}
                                      >
                                          <option value={ExerciseType.MULTIPLE_CHOICE}>Múltipla Escolha</option>
                                          <option value={ExerciseType.TRUE_FALSE}>Verdadeiro ou Falso</option>
                                          <option value={ExerciseType.SHORT_ANSWER}>Resposta Curta / Preencher Lacuna</option>
                                          <option value={ExerciseType.MATCHING}>Correspondência (Matching)</option>
                                          <option value={ExerciseType.ORDERING}>Ordenação / Sequência</option>
                                      </select>
                                  </div>

                                  <div>
                                      <label className="text-xs font-bold uppercase text-gray-500 mb-1 block">Enunciado / Pergunta</label>
                                      <textarea 
                                          className="w-full h-20 p-3 bg-gray-50 border border-gray-200 focus:border-carbon-blue focus:outline-none text-sm"
                                          placeholder={exType === ExerciseType.SHORT_ANSWER ? "Ex: 2x + 4 = 10. Qual o valor de x?" : "Escreva a pergunta aqui..."}
                                          value={exStatement}
                                          onChange={(e) => setExStatement(e.target.value)}
                                      />
                                  </div>

                                  {/* Dynamic Inputs based on Type */}
                                  {exType === ExerciseType.MULTIPLE_CHOICE && (
                                      <div className="space-y-2">
                                          <label className="text-xs font-bold uppercase text-gray-500 mb-1 block">Opções</label>
                                          {exOptions.map((opt, i) => (
                                              <div key={i} className="flex items-center gap-2">
                                                  <input type="radio" name="correctOpt" checked={exCorrectIndex === i} onChange={() => setExCorrectIndex(i)} />
                                                  <Input placeholder={`Opção ${String.fromCharCode(65+i)}`} value={opt} onChange={(e) => updateOption(i, e.target.value)} className="mb-0" />
                                              </div>
                                          ))}
                                      </div>
                                  )}

                                  {exType === ExerciseType.TRUE_FALSE && (
                                      <div className="space-y-2">
                                          <label className="text-xs font-bold uppercase text-gray-500 mb-1 block">Resposta Correta</label>
                                          <div className="flex gap-4">
                                              <label className="flex items-center gap-2 border p-3 rounded cursor-pointer hover:bg-gray-50 w-full">
                                                  <input type="radio" name="tf" checked={exCorrectIndex === 0} onChange={() => setExCorrectIndex(0)} />
                                                  Verdadeiro
                                              </label>
                                              <label className="flex items-center gap-2 border p-3 rounded cursor-pointer hover:bg-gray-50 w-full">
                                                  <input type="radio" name="tf" checked={exCorrectIndex === 1} onChange={() => setExCorrectIndex(1)} />
                                                  Falso
                                              </label>
                                          </div>
                                      </div>
                                  )}

                                  {exType === ExerciseType.SHORT_ANSWER && (
                                      <div>
                                          <Input 
                                            label="Resposta Correta (Texto Exato)" 
                                            placeholder="Ex: 3"
                                            value={exCorrectText}
                                            onChange={(e) => setExCorrectText(e.target.value)}
                                            helperText="O aluno deverá digitar exatamente isso (não sensível a maiúsculas)."
                                          />
                                      </div>
                                  )}

                                  {exType === ExerciseType.MATCHING && (
                                      <div className="space-y-2">
                                          <div className="flex justify-between items-center">
                                            <label className="text-xs font-bold uppercase text-gray-500 mb-1 block">Pares (Termo A - Termo B)</label>
                                            <Button size="sm" variant="ghost" onClick={addPair} icon={<Plus size={14}/>}>Add Par</Button>
                                          </div>
                                          {exPairs.map((pair, i) => (
                                              <div key={i} className="flex items-center gap-2">
                                                  <input className="flex-1 h-10 border-b bg-gray-50 px-2 text-sm" placeholder="Esquerda (ex: País)" value={pair.left} onChange={(e) => updatePair(i, 'left', e.target.value)} />
                                                  <span className="text-gray-400">↔</span>
                                                  <input className="flex-1 h-10 border-b bg-gray-50 px-2 text-sm" placeholder="Direita (ex: Capital)" value={pair.right} onChange={(e) => updatePair(i, 'right', e.target.value)} />
                                              </div>
                                          ))}
                                      </div>
                                  )}

                                  {exType === ExerciseType.ORDERING && (
                                      <div className="space-y-2">
                                          <div className="flex justify-between items-center">
                                            <label className="text-xs font-bold uppercase text-gray-500 mb-1 block">Sequência Correta (1º ao último)</label>
                                            <Button size="sm" variant="ghost" onClick={addSeqItem} icon={<Plus size={14}/>}>Add Item</Button>
                                          </div>
                                          {exSequence.map((item, i) => (
                                              <div key={i} className="flex items-center gap-2">
                                                  <span className="text-xs font-mono text-gray-400 w-4">{i+1}.</span>
                                                  <input className="flex-1 h-10 border-b bg-gray-50 px-2 text-sm" placeholder={`Passo ${i+1}`} value={item} onChange={(e) => updateSeqItem(i, e.target.value)} />
                                                  <GripVertical size={14} className="text-gray-300" />
                                              </div>
                                          ))}
                                      </div>
                                  )}

                                  <div>
                                      <label className="text-xs font-bold uppercase text-gray-500 mb-1 block">Explicação / Feedback</label>
                                      <textarea 
                                          className="w-full h-20 p-3 bg-gray-50 border border-gray-200 focus:border-carbon-blue focus:outline-none text-sm"
                                          placeholder="Explique por que esta é a resposta correta..."
                                          value={exExplanation}
                                          onChange={(e) => setExExplanation(e.target.value)}
                                      />
                                  </div>
                              </div>
                          )}

                          {/* --- REGULAR LESSON FORM --- */}
                          {(createType === 'lesson' || createType === 'module' || createType === 'discipline') && (
                             <>
                                <Input 
                                    label="Título" 
                                    placeholder={createType === 'lesson' ? "Ex: Introdução à Trigonometria" : "Ex: Matemática Avançada"}
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />

                                {createType === 'lesson' && (
                                    <div>
                                        <label className="text-xs font-bold uppercase text-gray-500 mb-1 block">Conteúdo (Markdown Suportado)</label>
                                        <textarea 
                                            className="w-full h-64 p-4 bg-gray-50 border border-gray-200 focus:border-carbon-blue focus:outline-none font-mono text-sm"
                                            placeholder="# Título da Aula&#10;&#10;Escreva o conteúdo aqui..."
                                            value={content}
                                            onChange={(e) => setContent(e.target.value)}
                                        ></textarea>
                                        <p className="text-xs text-gray-400 mt-1 text-right">Suporta Markdown básico</p>
                                    </div>
                                )}
                             </>
                          )}

                          <div className="pt-4 flex justify-end gap-2">
                              <Button variant="ghost" onClick={() => setActiveTab('overview')}>Cancelar</Button>
                              <Button icon={<Save size={16} />}>
                                  Guardar
                              </Button>
                          </div>
                      </form>
                  </Tile>
              </div>

              {/* Preview Placeholder */}
              <div>
                  <Tile className="sticky top-8 bg-gray-50 border-dashed min-h-[200px] flex items-center justify-center text-gray-400">
                      <span className="text-sm">Pré-visualização disponível após guardar</span>
                  </Tile>
              </div>
          </div>
      )}

      {/* Student List View (Unchanged from previous logic) */}
      {activeTab === 'students' && (
           <Tile>
               <h2 className="font-bold text-lg mb-4">Lista de Alunos</h2>
               <p className="text-gray-500">Tabela de alunos aqui...</p>
           </Tile>
      )}
    </Layout>
  );
};

const TabButton = ({ active, onClick, label, icon }: any) => (
    <button 
        className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${active ? 'border-carbon-blue text-carbon-blue bg-gray-50' : 'border-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-50'}`}
        onClick={onClick}
    >
        {icon}
        {label}
    </button>
);
