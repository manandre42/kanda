import React, { useState } from 'react';
import { Layout } from '../../components/Layout';
import { Tile, Button, Input } from '../../components/CarbonUI';
import { Save, Bell, Shield, Server, Globe, Lock } from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const [platformName, setPlatformName] = useState('KANDA — Preparação Pré-Universitária');
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [registrationOpen, setRegistrationOpen] = useState(true);

  return (
    <Layout>
      <header className="mb-8">
        <h1 className="text-3xl font-light text-carbon-gray100 mb-2">Configurações</h1>
        <p className="text-gray-600">Ajustes gerais da plataforma.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Main Settings Column */}
          <div className="md:col-span-2 space-y-6">
              
              {/* General Info */}
              <Tile>
                  <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                      <Globe size={20} className="text-carbon-blue" />
                      Informações Gerais
                  </h2>
                  <div className="space-y-4">
                      <Input 
                        label="Nome da Plataforma" 
                        value={platformName} 
                        onChange={(e) => setPlatformName(e.target.value)} 
                        helperText="Visível no título da página e emails."
                      />
                      <Input 
                        label="URL de Suporte" 
                        defaultValue="https://suporte.kanda.ao" 
                      />
                      <div className="grid grid-cols-2 gap-4">
                          <Input label="Email de Contato" defaultValue="admin@kanda.ao" />
                          <div>
                               <label className="text-xs text-carbon-gray80 mb-1 font-semibold uppercase tracking-wide block">Fuso Horário</label>
                               <select className="w-full h-10 border-b border-gray-300 bg-gray-50 px-3 text-sm focus:border-carbon-blue focus:outline-none">
                                   <option>Africa/Luanda (GMT+1)</option>
                                   <option>Europe/Lisbon (GMT+0)</option>
                               </select>
                          </div>
                      </div>
                  </div>
                  <div className="mt-6 flex justify-end">
                      <Button icon={<Save size={16}/>}>Guardar Alterações</Button>
                  </div>
              </Tile>

              {/* Security & Access */}
              <Tile>
                  <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                      <Shield size={20} className="text-green-600" />
                      Acesso e Segurança
                  </h2>
                  
                  <div className="space-y-6">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded border border-gray-100">
                          <div>
                              <p className="font-bold text-gray-800">Permitir Novos Registos</p>
                              <p className="text-sm text-gray-500">Se desativado, apenas admins podem criar contas.</p>
                          </div>
                          <Toggle checked={registrationOpen} onChange={() => setRegistrationOpen(!registrationOpen)} />
                      </div>

                      <div className="flex items-center justify-between p-4 bg-red-50 rounded border border-red-100">
                          <div>
                              <p className="font-bold text-red-800 flex items-center gap-2"><Lock size={16}/> Modo de Manutenção</p>
                              <p className="text-sm text-red-600">Desativa o acesso para todos os alunos e professores.</p>
                          </div>
                          <Toggle checked={maintenanceMode} onChange={() => setMaintenanceMode(!maintenanceMode)} color="bg-red-600" />
                      </div>
                  </div>
              </Tile>
          </div>

          {/* Sidebar Settings */}
          <div className="space-y-6">
              <Tile>
                  <h3 className="font-bold mb-4 flex items-center gap-2">
                      <Bell size={18} /> Notificações do Sistema
                  </h3>
                  <div className="space-y-3">
                      <label className="flex items-center gap-3 cursor-pointer">
                          <input type="checkbox" defaultChecked className="w-4 h-4 text-carbon-blue" />
                          <span className="text-sm">Alertas de novos usuários</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                          <input type="checkbox" defaultChecked className="w-4 h-4 text-carbon-blue" />
                          <span className="text-sm">Relatórios semanais por email</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                          <input type="checkbox" className="w-4 h-4 text-carbon-blue" />
                          <span className="text-sm">Notificar falhas de backup</span>
                      </label>
                  </div>
              </Tile>

              <Tile>
                  <h3 className="font-bold mb-4 flex items-center gap-2">
                      <Server size={18} /> Cache e Dados
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                      Limpar cache pode resolver problemas de visualização, mas deixará o carregamento inicial mais lento.
                  </p>
                  <Button variant="secondary" size="sm" className="w-full justify-center">Limpar Cache do Sistema</Button>
              </Tile>
          </div>
      </div>
    </Layout>
  );
};

const Toggle = ({ checked, onChange, color = 'bg-green-500' }: { checked: boolean, onChange: () => void, color?: string }) => (
    <div 
        onClick={onChange}
        className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${checked ? color : 'bg-gray-300'}`}
    >
        <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${checked ? 'translate-x-6' : 'translate-x-0'}`}></div>
    </div>
);