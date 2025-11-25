import React from 'react';
import { Layout } from '../components/Layout';
import { Tile, Button, ProgressBar } from '../components/CarbonUI';
import { ArrowRight, Book, Trophy, Activity, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MOCK_USER, RECOMMENDATIONS, DISCIPLINES } from '../mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mat', nota: 65 },
  { name: 'Fís', nota: 40 },
  { name: 'Quí', nota: 20 },
  { name: 'Bio', nota: 85 },
  { name: 'His', nota: 30 },
];

export const Dashboard: React.FC = () => {
  return (
    <Layout>
      <header className="mb-8">
        <h1 className="text-3xl font-light text-carbon-gray100 mb-2">
          Olá, <span className="font-bold">{MOCK_USER.name}</span>
        </h1>
        <p className="text-gray-600">Estás a preparar-te para <span className="text-carbon-blue font-medium">{MOCK_USER.targetCourse}</span>.</p>
      </header>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Tile className="flex items-center justify-between">
           <div>
             <p className="text-xs text-gray-500 uppercase tracking-wider">Nível Académico</p>
             <p className="text-2xl font-mono font-bold mt-1">{MOCK_USER.academicLevel}</p>
           </div>
           <Activity className="text-carbon-blue opacity-20" size={32} />
        </Tile>
        <Tile className="flex items-center justify-between">
           <div>
             <p className="text-xs text-gray-500 uppercase tracking-wider">Streak</p>
             <p className="text-2xl font-mono font-bold mt-1">{MOCK_USER.streakDays} Dias</p>
           </div>
           <Flame className="text-orange-500 opacity-80" size={32} />
        </Tile>
         <Tile className="flex items-center justify-between">
           <div>
             <p className="text-xs text-gray-500 uppercase tracking-wider">Total XP</p>
             <p className="text-2xl font-mono font-bold mt-1">{MOCK_USER.totalXP}</p>
           </div>
           <Trophy className="text-yellow-500 opacity-80" size={32} />
        </Tile>
         <Tile className="md:col-span-1 bg-carbon-blue text-white border-none">
            <div className="h-full flex flex-col justify-center">
                <p className="text-sm opacity-90 mb-1">Próxima Meta</p>
                <p className="font-bold text-lg">Completar Álgebra</p>
            </div>
        </Tile>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Continue Studying */}
          <section>
            <h2 className="text-lg font-bold mb-4 text-carbon-gray90">Continuar a Estudar</h2>
            <Tile className="group">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs font-bold text-blue-600 uppercase mb-1 block">Matemática</span>
                  <h3 className="text-xl font-bold mb-2">Matrizes e Determinantes</h3>
                  <p className="text-gray-500 text-sm mb-4 max-w-md">
                    Retoma onde paraste. Faltam 2 tópicos para concluir este módulo.
                  </p>
                </div>
                <div className="hidden sm:block bg-blue-50 p-3">
                  <Book className="text-blue-600" size={24} />
                </div>
              </div>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex-1">
                  <ProgressBar value={30} size="sm" />
                </div>
                <Link to="/subject/math">
                    <Button size="sm" icon={<ArrowRight size={16} />}>Continuar</Button>
                </Link>
              </div>
            </Tile>
          </section>

          {/* Performance Chart */}
          <section>
            <h2 className="text-lg font-bold mb-4 text-carbon-gray90">Desempenho por Área</h2>
            <Tile className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip cursor={{fill: '#f4f4f4'}} contentStyle={{ borderRadius: 0, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                  <Bar dataKey="nota" fill="#0f62fe" radius={[2, 2, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </Tile>
          </section>

        </div>

        {/* Sidebar / Recommendations */}
        <div className="space-y-8">
           <section>
            <h2 className="text-lg font-bold mb-4 text-carbon-gray90">Recomendado para Ti</h2>
            <div className="space-y-3">
              {RECOMMENDATIONS.map((rec) => (
                <Tile key={rec.id} className="border-l-4 border-l-carbon-blue">
                  <p className="text-xs text-gray-500 font-mono mb-1 uppercase">{rec.type === 'content' ? 'Aula' : 'Exercício'}</p>
                  <h4 className="font-bold text-sm mb-1">{rec.title}</h4>
                  <p className="text-xs text-gray-500 mb-3">{rec.reason}</p>
                  <Link to={`/subject/${DISCIPLINES[0].id}`}>
                    <span className="text-xs font-bold text-carbon-blue hover:underline cursor-pointer">Aceder</span>
                  </Link>
                </Tile>
              ))}
            </div>
           </section>

           <section>
             <h2 className="text-lg font-bold mb-4 text-carbon-gray90">As tuas Disciplinas</h2>
             <div className="space-y-2">
                {DISCIPLINES.map(d => (
                  <Link key={d.id} to={`/subject/${d.id}`}>
                    <div className="flex items-center justify-between p-3 bg-white border border-gray-200 hover:border-carbon-blue transition-colors cursor-pointer group">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 ${d.color}`}></div>
                        <span className="font-medium text-sm group-hover:text-carbon-blue">{d.name}</span>
                      </div>
                      <span className="text-xs text-gray-400">{d.progress}%</span>
                    </div>
                  </Link>
                ))}
             </div>
           </section>
        </div>
      </div>
    </Layout>
  );
};
