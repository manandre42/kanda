
import React, { useState } from 'react';
import { Layout } from '../../components/Layout';
import { Tile, Button, Input, Badge, Modal } from '../../components/CarbonUI';
import { MOCK_STUDENTS_LIST, TEACHERS } from '../../mockData';
import { Search, Edit2, Trash2, UserCheck, Shield, AlertTriangle } from 'lucide-react';

export const AdminUsers: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'students' | 'teachers'>('students');
  const [search, setSearch] = useState('');
  
  // Local state for users to simulate CRUD
  const [studentsList, setStudentsList] = useState(MOCK_STUDENTS_LIST);
  const [teachersList, setTeachersList] = useState(TEACHERS);

  // Modals
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [userToToggle, setUserToToggle] = useState<{id: string, name: string, status: string, role: 'student' | 'teacher'} | null>(null);

  // New User Form State
  const [newUser, setNewUser] = useState({
      name: '',
      email: '',
      role: 'student',
      extra: '' // Course or Specialty
  });

  const students = studentsList.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.email.toLowerCase().includes(search.toLowerCase()));
  const teachers = teachersList.filter(t => t.name.toLowerCase().includes(search.toLowerCase()));

  const handleAddUser = () => {
      const id = `${newUser.role.charAt(0)}${Date.now()}`;
      if (newUser.role === 'student') {
          setStudentsList([...studentsList, {
              id,
              name: newUser.name,
              email: newUser.email,
              role: 'student',
              targetCourse: newUser.extra,
              status: 'active',
              academicLevel: 1,
              streakDays: 0,
              totalXP: 0
          }]);
      } else {
          setTeachersList([...teachersList, {
              id,
              name: newUser.name,
              // @ts-ignore - simulating teacher object structure compatibility
              email: newUser.email,
              specialty: newUser.extra,
              bio: 'Novo professor na plataforma.',
              avatarUrl: 'https://i.pravatar.cc/150',
              role: 'teacher',
              status: 'active'
          }]);
      }
      setAddModalOpen(false);
      setNewUser({ name: '', email: '', role: 'student', extra: '' });
  };

  const openToggleConfirm = (user: any, role: 'student' | 'teacher') => {
      setUserToToggle({
          id: user.id,
          name: user.name,
          status: user.status === 'inactive' ? 'active' : 'inactive', // New status
          role
      });
      setConfirmModalOpen(true);
  };

  const handleToggleStatus = () => {
      if (!userToToggle) return;
      
      if (userToToggle.role === 'student') {
          setStudentsList(studentsList.map(s => s.id === userToToggle.id ? { ...s, status: userToToggle.status as any } : s));
      } else {
          // @ts-ignore
          setTeachersList(teachersList.map(t => t.id === userToToggle.id ? { ...t, status: userToToggle.status } : t));
      }
      setConfirmModalOpen(false);
      setUserToToggle(null);
  };

  return (
    <Layout>
        <header className="mb-6 flex justify-between items-center">
            <div>
                <h1 className="text-3xl font-light text-carbon-gray100 mb-1">Gestão de Usuários</h1>
                <p className="text-gray-600 text-sm">Administre contas de alunos e professores.</p>
            </div>
            <Button icon={<UserCheck size={16}/>} onClick={() => setAddModalOpen(true)}>Adicionar Novo</Button>
        </header>

        <div className="flex border-b border-gray-200 mb-6">
            <button 
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'students' ? 'border-carbon-blue text-carbon-blue' : 'border-transparent text-gray-500'}`}
                onClick={() => setActiveTab('students')}
            >
                Alunos ({students.length})
            </button>
            <button 
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'teachers' ? 'border-carbon-blue text-carbon-blue' : 'border-transparent text-gray-500'}`}
                onClick={() => setActiveTab('teachers')}
            >
                Professores ({teachers.length})
            </button>
        </div>

        <Tile className="p-0 overflow-hidden min-h-[500px]">
            {/* Toolbar */}
            <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                <div className="w-full max-w-md relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input 
                        type="text" 
                        placeholder="Pesquisar por nome ou email..." 
                        className="w-full h-10 pl-10 pr-4 rounded border border-gray-300 focus:border-carbon-blue focus:outline-none text-sm"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="flex gap-2">
                    <select className="h-10 border border-gray-300 rounded px-2 text-sm bg-white">
                        <option>Todos os Status</option>
                        <option>Ativos</option>
                        <option>Inativos</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-100 text-xs font-bold text-gray-500 uppercase">
                            <th className="p-4 border-b border-gray-200">Nome / Email</th>
                            <th className="p-4 border-b border-gray-200">{activeTab === 'students' ? 'Curso Alvo' : 'Especialidade'}</th>
                            <th className="p-4 border-b border-gray-200">Status</th>
                            <th className="p-4 border-b border-gray-200 text-right">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {activeTab === 'students' ? (
                            students.map(user => (
                                <tr key={user.id} className="hover:bg-blue-50 transition-colors group">
                                    <td className="p-4 border-b border-gray-100">
                                        <div className="font-bold text-gray-900">{user.name}</div>
                                        <div className="text-gray-500 text-xs">{user.email}</div>
                                    </td>
                                    <td className="p-4 border-b border-gray-100 text-gray-600">{user.targetCourse}</td>
                                    <td className="p-4 border-b border-gray-100">
                                        <Badge type={user.status === 'inactive' ? 'neutral' : 'success'}>
                                            {user.status === 'inactive' ? 'Inativo' : 'Ativo'}
                                        </Badge>
                                    </td>
                                    <td className="p-4 border-b border-gray-100 text-right">
                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 text-gray-500 hover:text-carbon-blue rounded hover:bg-white" title="Editar"><Edit2 size={16}/></button>
                                            <button 
                                                className={`p-2 rounded hover:bg-white ${user.status === 'inactive' ? 'text-green-600 hover:text-green-700' : 'text-gray-500 hover:text-red-600'}`}
                                                title={user.status === 'inactive' ? 'Ativar' : 'Desativar'}
                                                onClick={() => openToggleConfirm(user, 'student')}
                                            >
                                                {user.status === 'inactive' ? <UserCheck size={16}/> : <Trash2 size={16}/>}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            teachers.map(teacher => (
                                <tr key={teacher.id} className="hover:bg-blue-50 transition-colors group">
                                    <td className="p-4 border-b border-gray-100">
                                        <div className="flex items-center gap-3">
                                            <img src={teacher.avatarUrl} alt="" className="w-8 h-8 rounded-full bg-gray-200" />
                                            <div>
                                                <div className="font-bold text-gray-900">{teacher.name}</div>
                                                <div className="text-xs text-carbon-blue flex items-center gap-1"><Shield size={10}/> Professor Verificado</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 border-b border-gray-100 text-gray-600">{teacher.specialty}</td>
                                    <td className="p-4 border-b border-gray-100">
                                        {/* @ts-ignore status exists in simulation */}
                                        <Badge type={teacher.status === 'inactive' ? 'neutral' : 'success'}>
                                            {/* @ts-ignore */}
                                            {teacher.status === 'inactive' ? 'Inativo' : 'Ativo'}
                                        </Badge>
                                    </td>
                                    <td className="p-4 border-b border-gray-100 text-right">
                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 text-gray-500 hover:text-carbon-blue rounded hover:bg-white"><Edit2 size={16}/></button>
                                            <button 
                                                // @ts-ignore
                                                className={`p-2 rounded hover:bg-white ${teacher.status === 'inactive' ? 'text-green-600 hover:text-green-700' : 'text-gray-500 hover:text-red-600'}`}
                                                onClick={() => openToggleConfirm(teacher, 'teacher')}
                                            >
                                                {/* @ts-ignore */}
                                                {teacher.status === 'inactive' ? <UserCheck size={16}/> : <Trash2 size={16}/>}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                        
                        {(activeTab === 'students' ? students : teachers).length === 0 && (
                            <tr>
                                <td colSpan={4} className="p-8 text-center text-gray-400 italic">
                                    Nenhum usuário encontrado.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </Tile>

        {/* --- MODALS --- */}

        {/* Add User Modal */}
        <Modal
            isOpen={isAddModalOpen}
            onClose={() => setAddModalOpen(false)}
            title="Adicionar Novo Usuário"
            footer={
                <>
                    <Button variant="ghost" onClick={() => setAddModalOpen(false)}>Cancelar</Button>
                    <Button onClick={handleAddUser}>Criar Conta</Button>
                </>
            }
        >
            <div className="space-y-4">
                <div>
                     <label className="text-xs text-carbon-gray80 mb-2 font-semibold uppercase tracking-wide block">Tipo de Conta</label>
                     <div className="flex gap-4">
                         <label className="flex items-center gap-2 border p-3 rounded cursor-pointer w-full hover:bg-gray-50">
                             <input type="radio" name="role" checked={newUser.role === 'student'} onChange={() => setNewUser({...newUser, role: 'student'})} />
                             Aluno
                         </label>
                         <label className="flex items-center gap-2 border p-3 rounded cursor-pointer w-full hover:bg-gray-50">
                             <input type="radio" name="role" checked={newUser.role === 'teacher'} onChange={() => setNewUser({...newUser, role: 'teacher'})} />
                             Professor
                         </label>
                     </div>
                </div>
                <Input 
                    label="Nome Completo" 
                    placeholder="Ex: Ana Silva" 
                    value={newUser.name}
                    onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                />
                <Input 
                    label="Email" 
                    type="email"
                    placeholder="email@kanda.ao" 
                    value={newUser.email}
                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                />
                <Input 
                    label={newUser.role === 'student' ? "Curso Alvo" : "Especialidade"} 
                    placeholder={newUser.role === 'student' ? "Ex: Engenharia" : "Ex: Matemática"} 
                    value={newUser.extra}
                    onChange={(e) => setNewUser({...newUser, extra: e.target.value})}
                />
            </div>
        </Modal>

        {/* Confirmation Modal */}
        <Modal
            isOpen={isConfirmModalOpen}
            onClose={() => setConfirmModalOpen(false)}
            title="Confirmar Ação"
            footer={
                <>
                    <Button variant="ghost" onClick={() => setConfirmModalOpen(false)}>Cancelar</Button>
                    <Button 
                        variant={userToToggle?.status === 'inactive' ? 'danger' : 'primary'} 
                        onClick={handleToggleStatus}
                    >
                        Confirmar
                    </Button>
                </>
            }
        >
            <div className="flex items-center gap-4 text-gray-800">
                <div className="bg-yellow-100 p-3 rounded-full text-yellow-600">
                    <AlertTriangle size={24} />
                </div>
                <div>
                    <h3 className="font-bold">Alterar Status do Usuário?</h3>
                    <p className="text-sm text-gray-600 mt-1">
                        Você está prestes a definir <strong>{userToToggle?.name}</strong> como <strong>{userToToggle?.status === 'active' ? 'ATIVO' : 'INATIVO'}</strong>.
                    </p>
                    {userToToggle?.status === 'inactive' && (
                        <p className="text-xs text-red-500 mt-2">
                            O usuário perderá acesso à plataforma imediatamente.
                        </p>
                    )}
                </div>
            </div>
        </Modal>

    </Layout>
  );
};
