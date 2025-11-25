import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Input, Tile } from '../components/CarbonUI';

export const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white md:bg-carbon-gray10 p-4">
      <Tile className="w-full max-w-md p-8 md:shadow-lg border-t-4 border-t-carbon-blue">
        <div className="text-center mb-8">
            <h1 className="text-3xl font-mono font-bold tracking-wider mb-2">KANDA<span className="text-carbon-blue">.</span></h1>
            <p className="text-gray-500 text-sm">Plataforma de Preparação Pré-Universitária</p>
        </div>

        <form onSubmit={handleLogin}>
            <Input label="Email" type="email" placeholder="estudante@exemplo.com" required />
            <Input label="Palavra-passe" type="password" placeholder="••••••••" required />
            
            <div className="flex items-center justify-between mb-6">
                <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox h-4 w-4 text-carbon-blue" />
                    <span className="ml-2 text-sm text-gray-600">Lembrar-me</span>
                </label>
                <a href="#" className="text-sm text-carbon-blue hover:underline">Recuperar conta</a>
            </div>

            <Button type="submit" className="w-full justify-center" size="lg">
                Entrar
            </Button>
        </form>

        <div className="mt-8 text-center border-t border-gray-100 pt-6">
            <p className="text-sm text-gray-600">
                Ainda não tens conta? <Link to="/register" className="text-carbon-blue font-bold hover:underline">Criar Conta</Link>
            </p>
        </div>
      </Tile>
    </div>
  );
};
