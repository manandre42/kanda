import React, { useState } from 'react';
import { Layout } from '../../components/Layout';
import { Tile, Button, Badge, Modal, Input } from '../../components/CarbonUI';
import { DISCIPLINES } from '../../mockData';
import { Folder, ChevronRight, ChevronDown, Plus, Settings, Layers, GripVertical, Trash2, Edit3, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Colors for disciplines
const COLORS = ['bg-blue-600', 'bg-purple-600', 'bg-teal-600', 'bg-green-600', 'bg-red-600', 'bg-yellow-600'];

export const AdminContent: React.FC = () => {
  const navigate = useNavigate();
  // State for local manipulation (simulating DB)
  const [disciplines, setDisciplines] = useState(DISCIPLINES);
  const [expandedDisciplines, setExpandedDisciplines] = useState<string[]>([]);

  // Modals State
  const [isDisciplineModalOpen, setDisciplineModalOpen] = useState(false);
  const [isModuleModalOpen, setModuleModalOpen] = useState(false);
  
  // Forms State
  const [newDiscName, setNewDiscName] = useState('');
  const [newDiscDesc, setNewDiscDesc] = useState('');
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  
  const [editingModule, setEditingModule] = useState<{id: string, title: string, order: number} | null>(null);

  const toggleDiscipline = (id: string) => {
      if (expandedDisciplines.includes(id)) {
          setExpandedDisciplines(expandedDisciplines.filter(d => d !== id));
      } else {
          setExpandedDisciplines([...expandedDisciplines, id]);
      }
  };

  const handleCreateDiscipline = () => {
    if (!newDiscName) return;
    const newDisc = {
        id: `d_${Date.now()}`,
        name: newDiscName,
        description: newDiscDesc || 'Sem descrição',
        progress: 0,
        color: selectedColor,
        modules: []
    };
    setDisciplines([...disciplines, newDisc]);
    setDisciplineModalOpen(false);
    setNewDiscName('');
    setNewDiscDesc('');
  };

  const openModuleSettings = (moduleId: string, title: string, order: number) => {
      setEditingModule({ id: moduleId, title, order });
      setModuleModalOpen(true);
  };

  const handleDeleteModule = () => {
      // Logic to delete module would go here (update state)
      alert("Simulação: Módulo apagado com sucesso.");
      setModuleModalOpen(false);
  };

  const handleSaveModule = () => {
      alert("Simulação: Alterações guardadas.");
      setModuleModalOpen(false);
  };

  return (
    <Layout>
      <header className="mb-6 flex justify-between items-center">
          <div>
              <h1 className="text-3xl font-light text-carbon-gray100 mb-1">Gestão de Conteúdo</h1>
              <p className="text-gray-600 text-sm">Estrutura de Cursos, Disciplinas e Módulos.</p>
          </div>
          <Button onClick={() => navigate('/teacher')} variant="secondary" icon={<Plus size={16}/>}>
             Ir para Criador de Aulas
          </Button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Tree View */}
          <div className="lg:col-span-2">
              <Tile className="min-h-[600px] p-0 overflow-hidden">
                  <div className="bg-gray-100 p-4 border-b border-gray-200 flex justify-between items-center">
                      <h3 className="font-bold text-gray-700">Estrutura Curricular</h3>
                      <button 
                        onClick={() => setDisciplineModalOpen(true)}
                        className="text-xs text-carbon-blue font-bold uppercase hover:underline flex items-center gap-1"
                      >
                          <Plus size={14}/> Nova Disciplina
                      </button>
                  </div>
                  
                  <div className="divide-y divide-gray-100">
                      {disciplines.map(disc => {
                          const isExpanded = expandedDisciplines.includes(disc.id);
                          return (
                              <div key={disc.id} className="bg-white">
                                  {/* Discipline Row */}
                                  <div className="flex items-center p-4 hover:bg-gray-50 transition-colors group">
                                      <button onClick={() => toggleDiscipline(disc.id)} className="mr-3 text-gray-400 hover:text-gray-600">
                                          {isExpanded ? <ChevronDown size={20}/> : <ChevronRight size={20}/>}
                                      </button>
                                      <div className={`w-3 h-3 rounded-full ${disc.color} mr-3`}></div>
                                      <div className="flex-1 cursor-pointer" onClick={() => toggleDiscipline(disc.id)}>
                                          <h4 className="font-bold text-gray-800">{disc.name}</h4>
                                          <p className="text-xs text-gray-500">{disc.modules.length} Módulos • {disc.description}</p>
                                      </div>
                                      <div className="opacity-0 group-hover:opacity-100 flex gap-2">
                                          <button className="p-2 text-gray-400 hover:text-carbon-blue" title="Configurações"><Settings size={16}/></button>
                                          <button className="p-2 text-gray-400 hover:text-carbon-blue" title="Adicionar Módulo"><Plus size={16}/></button>
                                      </div>
                                  </div>

                                  {/* Modules List (Expanded) */}
                                  {isExpanded && (
                                      <div className="bg-gray-50 pl-12 pr-4 py-2 border-t border-gray-100 shadow-inner animate-in slide-in-from-top-2">
                                          {disc.modules.length === 0 ? (
                                              <p className="text-xs text-gray-400 italic py-2">Sem módulos criados.</p>
                                          ) : (
                                              <div className="space-y-2 mt-2 mb-2">
                                                  {disc.modules.map(mod => (
                                                      <div key={mod.id} className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded hover:border-blue-300 transition-all cursor-pointer group">
                                                          <div className="flex items-center gap-3">
                                                              <GripVertical size={14} className="text-gray-300 cursor-move" />
                                                              <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded flex items-center justify-center">
                                                                  <Folder size={16} />
                                                              </div>
                                                              <div>
                                                                  <p className="text-sm font-bold text-gray-800">{mod.title}</p>
                                                                  <p className="text-xs text-gray-500">{mod.topics.length} tópicos</p>
                                                              </div>
                                                          </div>
                                                          <div className="flex items-center gap-2">
                                                              <Badge type="neutral">{mod.order}</Badge>
                                                              <button 
                                                                className="text-gray-400 hover:text-carbon-blue p-2 rounded hover:bg-gray-100 transition-colors"
                                                                onClick={() => openModuleSettings(mod.id, mod.title, mod.order)}
                                                              >
                                                                  <Settings size={14}/>
                                                              </button>
                                                          </div>
                                                      </div>
                                                  ))}
                                              </div>
                                          )}
                                          <Button size="sm" variant="ghost" className="mt-2 w-full justify-center border border-dashed border-gray-300 text-gray-500 hover:border-carbon-blue">
                                              + Adicionar Módulo
                                          </Button>
                                      </div>
                                  )}
                              </div>
                          )
                      })}
                  </div>
              </Tile>
          </div>

          {/* Sidebar / Types Overview */}
          <div className="space-y-6">
              <Tile>
                  <h3 className="font-bold text-lg mb-4">Banco de Questões</h3>
                  <div className="space-y-4">
                      <QuestionTypeCard label="Múltipla Escolha" count={1204} color="bg-blue-500" />
                      <QuestionTypeCard label="Drag & Drop (Match)" count={340} color="bg-green-500" />
                      <QuestionTypeCard label="Ordenação" count={115} color="bg-purple-500" />
                      <QuestionTypeCard label="Preencher Lacunas" count={89} color="bg-orange-500" />
                  </div>
                  <div className="mt-6 pt-4 border-t border-gray-100">
                      <Button className="w-full justify-center" variant="secondary">
                          Ver Todas as Questões
                      </Button>
                  </div>
              </Tile>

              <Tile className="bg-carbon-gray90 text-white border-none">
                  <div className="flex items-center gap-2 mb-4">
                      <Layers size={20} className="text-carbon-blue" />
                      <h3 className="font-bold">Backup & Exportação</h3>
                  </div>
                  <p className="text-sm text-gray-400 mb-6">
                      Último backup automático: Hoje, 04:00 AM.
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                      <Button size="sm" variant="secondary" className="justify-center">Exportar CSV</Button>
                      <Button size="sm" variant="secondary" className="justify-center">Backup Manual</Button>
                  </div>
              </Tile>
          </div>
      </div>

      {/* --- MODALS --- */}
      
      {/* Create Discipline Modal */}
      <Modal
        isOpen={isDisciplineModalOpen}
        onClose={() => setDisciplineModalOpen(false)}
        title="Nova Disciplina"
        footer={
            <>
                <Button variant="ghost" onClick={() => setDisciplineModalOpen(false)}>Cancelar</Button>
                <Button onClick={handleCreateDiscipline}>Criar Disciplina</Button>
            </>
        }
      >
        <div className="space-y-4">
            <Input 
                label="Nome da Disciplina" 
                placeholder="Ex: Filosofia, Inglês..." 
                value={newDiscName}
                onChange={(e) => setNewDiscName(e.target.value)}
            />
            <div>
                <label className="text-xs text-carbon-gray80 mb-1 font-semibold uppercase tracking-wide block">Descrição</label>
                <textarea 
                    className="w-full p-3 border-b border-gray-300 bg-gray-50 focus:border-carbon-blue focus:outline-none text-sm min-h-[80px]"
                    placeholder="Breve descrição dos tópicos abordados..."
                    value={newDiscDesc}
                    onChange={(e) => setNewDiscDesc(e.target.value)}
                />
            </div>
            <div>
                <label className="text-xs text-carbon-gray80 mb-2 font-semibold uppercase tracking-wide block">Cor de Identificação</label>
                <div className="flex gap-3">
                    {COLORS.map(c => (
                        <div 
                            key={c} 
                            onClick={() => setSelectedColor(c)}
                            className={`w-8 h-8 rounded-full cursor-pointer transition-transform hover:scale-110 ${c} ${selectedColor === c ? 'ring-2 ring-offset-2 ring-gray-400 scale-110' : ''}`}
                        ></div>
                    ))}
                </div>
            </div>
        </div>
      </Modal>

      {/* Module Settings Modal */}
      <Modal
        isOpen={isModuleModalOpen}
        onClose={() => setModuleModalOpen(false)}
        title="Configurar Módulo"
        footer={
            <>
                 <Button variant="danger" onClick={handleDeleteModule} icon={<Trash2 size={16}/>}>Apagar</Button>
                 <div className="flex-1"></div>
                 <Button variant="ghost" onClick={() => setModuleModalOpen(false)}>Cancelar</Button>
                 <Button onClick={handleSaveModule} icon={<Save size={16}/>}>Salvar</Button>
            </>
        }
      >
        <div className="space-y-4">
            <div className="p-4 bg-gray-50 border rounded mb-4">
                <p className="text-xs text-gray-500 uppercase">Editando Módulo</p>
                <p className="font-bold">{editingModule?.title}</p>
                <p className="text-xs text-gray-400 font-mono">ID: {editingModule?.id}</p>
            </div>
            
            <Input label="Novo Título" defaultValue={editingModule?.title} />
            <div className="grid grid-cols-2 gap-4">
                <Input label="Ordem" type="number" defaultValue={editingModule?.order} />
                <div>
                     <label className="text-xs text-carbon-gray80 mb-1 font-semibold uppercase tracking-wide block">Status</label>
                     <select className="w-full h-10 border-b border-gray-300 bg-gray-50 px-3 text-sm">
                         <option>Publicado</option>
                         <option>Rascunho</option>
                         <option>Arquivado</option>
                     </select>
                </div>
            </div>
        </div>
      </Modal>

    </Layout>
  );
};

// Helper for Sidebar Cards
const QuestionTypeCard = ({ label, count, color }: { label: string, count: number, color: string }) => (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded cursor-pointer hover:bg-gray-100 transition-colors group">
        <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${color}`}></div>
            <span className="text-sm font-medium group-hover:text-carbon-blue">{label}</span>
        </div>
        <span className="font-mono text-sm font-bold">{count}</span>
    </div>
);