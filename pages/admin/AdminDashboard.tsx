
import React from 'react';
import { Layout } from '../../components/Layout';
import { Tile, ProgressBar } from '../../components/CarbonUI';
import { Users, BookOpen, BrainCircuit, Activity, TrendingUp, AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const activityData = [
  { day: 'Seg', users: 120 },
  { day: 'Ter', users: 145 },
  { day: 'Qua', users: 132 },
  { day: 'Qui', users: 190 },
  { day: 'Sex', users: 154 },
  { day: 'Sáb', users: 90 },
  { day: 'Dom', users: 76 },
];

const contentData = [
  { name: 'Mat', questions: 150 },
  { name: 'Fís', questions: 80 },
  { name: 'Quí', questions: 45 },
  { name: 'Bio', questions: 120 },
];

export const AdminDashboard: React.FC = () => {
  return (
    <Layout>
      <header className="mb-8">
        <h1 className="text-3xl font-light text-carbon-gray100 mb-2">
           Dashboard Administrativo
        </h1>
        <p className="text-gray-600">Visão geral da plataforma KANDA.</p>
      </header>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Tile className="border-l-4 border-l-carbon-blue">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Estudantes</p>
                    <p className="text-3xl font-mono font-bold mt-1">1,248</p>
                </div>
                <Users className="text-carbon-blue opacity-50" size={24} />
            </div>
            <p className="text-xs text-green-600 mt-2 flex items-center"><TrendingUp size={12} className="mr-1"/> +12% este mês</p>
        </Tile>

        <Tile className="border-l-4 border-l-purple-600">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Professores</p>
                    <p className="text-3xl font-mono font-bold mt-1">42</p>
                </div>
                <BookOpen className="text-purple-600 opacity-50" size={24} />
            </div>
            <p className="text-xs text-gray-500 mt-2">Ativos e verificados</p>
        </Tile>

        <Tile className="border-l-4 border-l-teal-600">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Questões</p>
                    <p className="text-3xl font-mono font-bold mt-1">3,500+</p>
                </div>
                <BrainCircuit className="text-teal-600 opacity-50" size={24} />
            </div>
            <p className="text-xs text-gray-500 mt-2">Banco de questões</p>
        </Tile>

        <Tile className="border-l-4 border-l-red-500">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Alertas</p>
                    <p className="text-3xl font-mono font-bold mt-1">5</p>
                </div>
                <AlertCircle className="text-red-500 opacity-50" size={24} />
            </div>
            <p className="text-xs text-red-600 mt-2 cursor-pointer hover:underline">Ver denúncias</p>
        </Tile>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Activity Chart */}
          <div className="lg:col-span-2">
            <Tile className="h-[350px]">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <Activity size={18} /> Atividade da Plataforma (Últimos 7 dias)
                </h3>
                <ResponsiveContainer width="100%" height="85%">
                    <LineChart data={activityData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
                        <XAxis dataKey="day" axisLine={false} tickLine={false} />
                        <YAxis axisLine={false} tickLine={false} />
                        <Tooltip contentStyle={{ border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                        <Line type="monotone" dataKey="users" stroke="#0f62fe" strokeWidth={3} dot={{r: 4, fill: '#0f62fe'}} activeDot={{r: 6}} />
                    </LineChart>
                </ResponsiveContainer>
            </Tile>
          </div>

          {/* Content Distribution */}
          <div>
            <Tile className="h-[350px]">
                <h3 className="font-bold text-lg mb-6">Questões por Disciplina</h3>
                <ResponsiveContainer width="100%" height="85%">
                    <BarChart data={contentData} layout="vertical" margin={{top: 0, right: 30, left: 0, bottom: 0}}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e0e0e0" />
                        <XAxis type="number" hide />
                        <YAxis dataKey="name" type="category" width={40} axisLine={false} tickLine={false} />
                        <Tooltip cursor={{fill: '#f9f9f9'}} />
                        <Bar dataKey="questions" fill="#393939" barSize={20} radius={[0, 4, 4, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </Tile>
          </div>
      </div>

      {/* System Health / Recent Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Tile>
             <h3 className="font-bold text-lg mb-4">Saúde do Sistema</h3>
             <div className="space-y-4">
                 <div>
                     <div className="flex justify-between text-sm mb-1">
                         <span>Uso de CPU (Servidor)</span>
                         <span className="font-mono">12%</span>
                     </div>
                     <ProgressBar value={12} size="sm" />
                 </div>
                 <div>
                     <div className="flex justify-between text-sm mb-1">
                         <span>Banco de Dados</span>
                         <span className="font-mono">45%</span>
                     </div>
                     <ProgressBar value={45} size="sm" />
                 </div>
                 <div>
                     <div className="flex justify-between text-sm mb-1">
                         <span>API Gemini (Cota)</span>
                         <span className="font-mono">8%</span>
                     </div>
                     <ProgressBar value={8} size="sm" />
                 </div>
             </div>
          </Tile>

          <Tile>
              <h3 className="font-bold text-lg mb-4">Ações Recentes</h3>
              <ul className="space-y-3 text-sm">
                  <li className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-800">Nova disciplina "Filosofia" criada</span>
                      <span className="text-gray-400 text-xs">2h atrás</span>
                  </li>
                  <li className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-800">Prof. João reportou erro no Módulo 2</span>
                      <span className="text-gray-400 text-xs">5h atrás</span>
                  </li>
                  <li className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-800">Novo professor registado: Maria L.</span>
                      <span className="text-gray-400 text-xs">1d atrás</span>
                  </li>
              </ul>
          </Tile>
      </div>
    </Layout>
  );
};
