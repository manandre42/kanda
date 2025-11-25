import React from 'react';
import { Layout } from '../components/Layout';
import { Tile, Button, Badge, ProgressBar } from '../components/CarbonUI';
import { User, Trophy, Star, MessageCircle, Settings, Mail, MapPin } from 'lucide-react';
import { MOCK_USER, ACHIEVEMENTS, TEACHERS, DISCIPLINES } from '../mockData';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const Profile: React.FC = () => {
  const teacher = TEACHERS.find(t => t.id === MOCK_USER.teacherId);

  // Mock data for evolution chart
  const performanceData = DISCIPLINES.map(d => ({
    subject: d.name.substring(0, 3),
    score: d.progress * 0.8 + 20 // Fake score calculation
  }));

  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Identity & Teacher */}
        <div className="space-y-8">
          {/* User Card */}
          <Tile className="text-center relative overflow-hidden border-t-4 border-t-carbon-blue">
            <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl border-4 border-white shadow-lg relative z-10">
              👋
            </div>
            <h2 className="text-2xl font-bold text-gray-900">{MOCK_USER.name}</h2>
            <p className="text-carbon-blue font-medium mb-2">{MOCK_USER.targetCourse}</p>
            <div className="flex justify-center gap-2 text-sm text-gray-500 mb-6">
              <span className="flex items-center"><MapPin size={14} className="mr-1"/> Luanda, AO</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-4">
              <div className="text-center">
                <span className="block font-bold text-xl">{MOCK_USER.academicLevel}</span>
                <span className="text-xs text-gray-500 uppercase">Nível</span>
              </div>
              <div className="text-center">
                <span className="block font-bold text-xl">{MOCK_USER.totalXP}</span>
                <span className="text-xs text-gray-500 uppercase">XP Total</span>
              </div>
            </div>
          </Tile>

          {/* Assigned Teacher */}
          <Tile>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900">Meu Professor</h3>
              <Badge type="success">Online</Badge>
            </div>
            {teacher ? (
              <div className="text-center">
                <img src={teacher.avatarUrl} alt={teacher.name} className="w-16 h-16 rounded-full mx-auto mb-3 object-cover" />
                <h4 className="font-bold">{teacher.name}</h4>
                <p className="text-sm text-gray-500 mb-4">{teacher.specialty}</p>
                <p className="text-sm text-gray-600 mb-6 italic">"{teacher.bio}"</p>
                <Link to="/chat">
                  <Button className="w-full justify-center" icon={<MessageCircle size={16} />}>
                    Falar com Professor
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-500 mb-4">Ainda não tens um professor atribuído.</p>
                <Button variant="secondary">Solicitar Mentor</Button>
              </div>
            )}
          </Tile>

          {/* Settings Teaser */}
          <Tile>
            <h3 className="font-bold mb-4 flex items-center gap-2"><Settings size={18}/> Configurações</h3>
             <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Email</span>
                    <span className="font-mono">{MOCK_USER.email}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Notificações</span>
                    <span className="text-green-600 font-bold">Ativadas</span>
                </div>
                <Button variant="secondary" size="sm" className="w-full justify-center">Editar Perfil</Button>
             </div>
          </Tile>
        </div>

        {/* Right Column: Stats & Achievements */}
        <div className="lg:col-span-2 space-y-8">
          {/* Evolution Chart */}
          <Tile className="h-[300px]">
            <div className="flex justify-between items-center mb-4">
               <h3 className="font-bold text-lg">Evolução por Disciplina</h3>
               <select className="text-sm border-none bg-gray-100 rounded px-2 py-1">
                 <option>Esta Semana</option>
                 <option>Este Mês</option>
               </select>
            </div>
            <ResponsiveContainer width="100%" height="85%">
              <BarChart data={performanceData} layout="vertical" margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f4f4f4" />
                <XAxis type="number" hide />
                <YAxis dataKey="subject" type="category" width={40} tick={{fontSize: 12}} axisLine={false} tickLine={false} />
                <Tooltip cursor={{fill: '#f9f9f9'}} />
                <Bar dataKey="score" fill="#0f62fe" barSize={20} radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Tile>

          {/* Achievements */}
          <Tile>
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
              <Trophy className="text-yellow-500" /> Conquistas Recentes
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {ACHIEVEMENTS.map((ach) => (
                <div key={ach.id} className={`flex items-center p-3 border rounded-lg transition-colors ${ach.unlocked ? 'bg-white border-gray-200' : 'bg-gray-50 border-gray-100 opacity-60'}`}>
                  <div className="text-3xl mr-4">{ach.icon}</div>
                  <div>
                    <h4 className={`text-sm font-bold ${ach.unlocked ? 'text-gray-900' : 'text-gray-400'}`}>{ach.title}</h4>
                    <p className="text-xs text-gray-500">{ach.description}</p>
                  </div>
                  {!ach.unlocked && <div className="ml-auto"><LockIcon /></div>}
                </div>
              ))}
            </div>
          </Tile>
        </div>
      </div>
    </Layout>
  );
};

const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
);