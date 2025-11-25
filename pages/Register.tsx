
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Input } from '../components/CarbonUI';
import { CheckCircle, ArrowRight } from 'lucide-react';

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    targetCourse: '' 
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Always navigate to onboarding as this is now student-only
      navigate('/onboarding');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-carbon-gray10 p-4">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-5 shadow-xl rounded-lg overflow-hidden bg-white">
        
        {/* Left Side - Visual/Info */}
        <div className="md:col-span-2 bg-carbon-gray100 text-white p-8 flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-3xl font-mono font-bold tracking-wider mb-2">KANDA<span className="text-carbon-blue">.</span></h1>
            <p className="text-gray-400 text-sm">A plataforma de excelência para preparação pré-universitária.</p>
          </div>

          <div className="relative z-10 space-y-6 my-12">
            <div className="flex items-start gap-3">
              <CheckCircle className="text-carbon-blue mt-1" size={20} />
              <div>
                <h3 className="font-bold text-sm">Conteúdo Estruturado</h3>
                <p className="text-xs text-gray-400">Aulas organizadas por módulos e níveis de dificuldade.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="text-carbon-blue mt-1" size={20} />
              <div>
                <h3 className="font-bold text-sm">Avaliação Inteligente</h3>
                <p className="text-xs text-gray-400">Simulados com feedback imediato e IA.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="text-carbon-blue mt-1" size={20} />
              <div>
                <h3 className="font-bold text-sm">Comunidade</h3>
                <p className="text-xs text-gray-400">Conecte-se com professores e outros alunos.</p>
              </div>
            </div>
          </div>

          <div className="relative z-10">
            <p className="text-xs text-gray-500">© 2024 Kanda Platform</p>
          </div>

          {/* Abstract Background shapes */}
          <div className="absolute top-10 -right-10 w-40 h-40 bg-carbon-gray90 rounded-full opacity-50"></div>
          <div className="absolute bottom-10 -left-10 w-60 h-60 bg-carbon-gray90 rounded-full opacity-50"></div>
        </div>

        {/* Right Side - Form */}
        <div className="md:col-span-3 p-8 md:p-12 bg-white">
          <div className="flex justify-end mb-6">
            <span className="text-sm text-gray-500">Já tens conta? <Link to="/" className="text-carbon-blue font-bold hover:underline">Entrar</Link></span>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Criar Conta de Estudante</h2>
            <p className="text-gray-500 text-sm mt-1">Junta-te a milhares de alunos a preparar o futuro.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input 
                label="Nome Completo" 
                name="name"
                placeholder="Ex: João Manuel" 
                required 
                value={formData.name}
                onChange={handleChange}
              />
              <Input 
                label="Email" 
                type="email" 
                name="email"
                placeholder="email@exemplo.com" 
                required 
                value={formData.email}
                onChange={handleChange}
              />
            </div>

             <div className="mb-4">
               <label className="text-xs text-carbon-gray80 mb-1 font-semibold uppercase tracking-wide block">Curso de Interesse</label>
               <select 
                  name="targetCourse"
                  className="w-full h-10 bg-carbon-gray10 border-b border-carbon-gray80 px-4 text-carbon-gray100 focus:outline-none focus:border-carbon-blue"
                  value={formData.targetCourse}
                  onChange={handleChange}
                  required
               >
                 <option value="">Selecione...</option>
                 <option value="eng_informatica">Engenharia Informática</option>
                 <option value="medicina">Medicina</option>
                 <option value="economia">Economia / Gestão</option>
                 <option value="direito">Direito</option>
                 <option value="arquitetura">Arquitetura</option>
                 <option value="outro">Outro</option>
               </select>
             </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input 
                label="Palavra-passe" 
                type="password" 
                name="password"
                placeholder="••••••••" 
                required 
                value={formData.password}
                onChange={handleChange}
              />
              <Input 
                label="Confirmar Palavra-passe" 
                type="password" 
                name="confirmPassword"
                placeholder="••••••••" 
                required 
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>

            <div className="mt-6 mb-6">
              <label className="flex items-start">
                  <input type="checkbox" className="mt-1 form-checkbox h-4 w-4 text-carbon-blue" required />
                  <span className="ml-2 text-xs text-gray-600">
                    Concordo com os <a href="#" className="text-carbon-blue underline">Termos de Serviço</a> e a <a href="#" className="text-carbon-blue underline">Política de Privacidade</a> da Kanda.
                  </span>
              </label>
            </div>

            <Button 
              type="submit" 
              className="w-full justify-center" 
              size="lg"
              isLoading={isLoading}
              icon={<ArrowRight size={16} />}
            >
              Criar Conta
            </Button>
            
            <div className="mt-6 text-center pt-4 border-t border-gray-100">
               <p className="text-xs text-gray-400">
                 És professor? <span className="text-gray-500">Contacta a administração para obter credenciais.</span>
               </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
