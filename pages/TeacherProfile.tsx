
import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { Tile, Button, Input, Badge } from '../components/CarbonUI';
import { User, MapPin, Mail, Award, Book, Star, Edit3, CheckCircle, Users } from 'lucide-react';
import { MOCK_TEACHER_ACCOUNT } from '../mockData';

export const TeacherProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const teacher = MOCK_TEACHER_ACCOUNT;

  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Identity Card */}
        <div className="space-y-6">
          <Tile className="text-center border-t-4 border-t-carbon-blue">
            <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden border-4 border-white shadow-md">
               <img src="https://i.pravatar.cc/300?u=t1" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">{teacher.name}</h2>
            <p className="text-carbon-blue font-medium mb-2">{teacher.specialty}</p>
            <div className="flex justify-center gap-2 text-sm text-gray-500 mb-6">
              <span className="flex items-center"><MapPin size={14} className="mr-1"/> Luanda, AO</span>
            </div>
            
            <div className="flex justify-center gap-2">
                 <Button variant="secondary" size="sm" icon={<Edit3 size={14}/>} onClick={() => setIsEditing(!isEditing)}>
                     Editar Perfil
                 </Button>
            </div>
          </Tile>
          
          <Tile>
              <h3 className="font-bold text-sm text-gray-500 uppercase mb-4">Credenciais</h3>
              <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                      <Award className="text-carbon-blue shrink-0" size={18} />
                      <div>
                          <span className="font-bold block">Mestrado em Engenharia</span>
                          <span className="text-gray-500">Universidade Agostinho Neto</span>
                      </div>
                  </li>
                  <li className="flex items-start gap-3">
                      <CheckCircle className="text-carbon-blue shrink-0" size={18} />
                      <div>
                          <span className="font-bold block">Certificado Pedagógico</span>
                          <span className="text-gray-500">Ministério da Educação</span>
                      </div>
                  </li>
              </ul>
          </Tile>
        </div>

        {/* Right Column: Details & Stats */}
        <div className="lg:col-span-2 space-y-6">
             {/* Bio Section */}
             <Tile>
                 <h3 className="text-lg font-bold mb-4">Sobre Mim</h3>
                 {isEditing ? (
                     <textarea 
                        className="w-full h-32 p-3 border border-gray-300 rounded focus:border-carbon-blue focus:outline-none"
                        defaultValue={teacher.bio}
                     />
                 ) : (
                     <p className="text-gray-600 leading-relaxed">
                        {teacher.bio}
                     </p>
                 )}
             </Tile>

             {/* Teaching Stats - Distinct from Student Stats */}
             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                 <Tile className="bg-gray-900 text-white border-none">
                     <div className="flex items-center gap-3 mb-2 opacity-80">
                         <Users size={20} />
                         <span className="text-xs font-bold uppercase tracking-wider">Alunos Ativos</span>
                     </div>
                     <span className="text-3xl font-mono font-bold">142</span>
                 </Tile>
                 <Tile className="bg-carbon-blue text-white border-none">
                     <div className="flex items-center gap-3 mb-2 opacity-80">
                         <Book size={20} />
                         <span className="text-xs font-bold uppercase tracking-wider">Conteúdos</span>
                     </div>
                     <span className="text-3xl font-mono font-bold">28</span>
                 </Tile>
                 <Tile className="bg-white text-gray-900 border border-gray-200">
                     <div className="flex items-center gap-3 mb-2 text-yellow-500">
                         <Star size={20} fill="currentColor" />
                         <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Avaliação Média</span>
                     </div>
                     <span className="text-3xl font-mono font-bold">4.9</span>
                 </Tile>
             </div>

             {/* Reviews Section (Mock) */}
             <Tile>
                 <div className="flex justify-between items-center mb-6">
                     <h3 className="text-lg font-bold">Avaliações dos Alunos</h3>
                     <span className="text-sm text-carbon-blue font-bold cursor-pointer">Ver todas</span>
                 </div>
                 
                 <div className="space-y-6">
                     {[1, 2].map((rev) => (
                         <div key={rev} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                             <div className="flex items-center justify-between mb-2">
                                 <div className="flex items-center gap-2">
                                     <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold">AL</div>
                                     <span className="font-bold text-sm">Aluno Anónimo</span>
                                 </div>
                                 <div className="flex text-yellow-400">
                                     {[1,2,3,4,5].map(s => <Star key={s} size={12} fill="currentColor" />)}
                                 </div>
                             </div>
                             <p className="text-sm text-gray-600 italic">"As explicações de Álgebra foram essenciais para o meu exame. Muito obrigado prof!"</p>
                         </div>
                     ))}
                 </div>
             </Tile>
        </div>
      </div>
    </Layout>
  );
};
