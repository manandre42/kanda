import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Tile, ProgressBar, Badge, Button } from '../components/CarbonUI';
import { ArrowLeft, Lock, ChevronRight } from 'lucide-react';
import { DISCIPLINES } from '../mockData';

export const SubjectDetail: React.FC = () => {
  const { id } = useParams();
  const discipline = DISCIPLINES.find(d => d.id === id);

  if (!discipline) return <Layout>Disciplina não encontrada.</Layout>;

  return (
    <Layout>
      <Link to="/dashboard" className="inline-flex items-center text-sm text-gray-500 hover:text-carbon-blue mb-6">
        <ArrowLeft size={16} className="mr-2" /> Voltar ao Dashboard
      </Link>

      <div className="flex items-center justify-between mb-8">
        <div>
            <h1 className="text-4xl font-light text-carbon-gray100 mb-2">{discipline.name}</h1>
            <p className="text-gray-600 max-w-2xl">{discipline.description}</p>
        </div>
        <div className="text-right hidden md:block">
            <div className="text-3xl font-bold text-carbon-blue">{discipline.progress}%</div>
            <div className="text-xs text-gray-500 uppercase">Concluído</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
            {discipline.modules.length > 0 ? discipline.modules.map((module) => (
                <div key={module.id} className="group">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-bold text-gray-800 group-hover:text-carbon-blue transition-colors">
                            {module.order}. {module.title}
                        </h3>
                    </div>
                    <Tile className="relative overflow-hidden">
                         <p className="text-sm text-gray-600 mb-4">{module.description}</p>
                         
                         <div className="space-y-0 divide-y divide-gray-100">
                             {module.topics.map(topic => (
                                 <Link key={topic.id} to={`/topic/${discipline.id}/${module.id}/${topic.id}`}>
                                     <div className="flex items-center justify-between py-3 hover:bg-gray-50 cursor-pointer transition-colors -mx-4 px-4">
                                         <div className="flex items-center gap-3">
                                             <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${topic.isCompleted ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                                                 {topic.isCompleted ? '✓' : topic.order}
                                             </div>
                                             <span className={topic.isCompleted ? 'text-gray-800' : 'text-gray-600'}>{topic.title}</span>
                                         </div>
                                         <ChevronRight size={16} className="text-gray-300" />
                                     </div>
                                 </Link>
                             ))}
                             {module.topics.length === 0 && (
                                 <div className="py-4 text-center text-gray-400 text-sm italic">
                                     Conteúdos em breve.
                                 </div>
                             )}
                         </div>
                    </Tile>
                </div>
            )) : (
                <div className="p-12 text-center bg-white border border-dashed border-gray-300">
                    <Lock className="mx-auto text-gray-300 mb-2" size={32} />
                    <p className="text-gray-500">Módulos indisponíveis para esta disciplina no momento.</p>
                </div>
            )}
        </div>

        <div>
            <Tile className="sticky top-24">
                <h3 className="font-bold mb-4">Resumo do Progresso</h3>
                <div className="mb-6">
                    <ProgressBar value={discipline.progress} label="Total" />
                </div>
                <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Módulos Concluídos</span>
                        <span className="font-mono font-bold">0/{discipline.modules.length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Média nos Exercícios</span>
                        <span className="font-mono font-bold text-carbon-blue">--</span>
                    </div>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-100">
                    <Button className="w-full justify-center">Fazer Simulado Geral</Button>
                </div>
            </Tile>
        </div>
      </div>
    </Layout>
  );
};