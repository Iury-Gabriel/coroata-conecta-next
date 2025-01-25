"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSignIn } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();

  async function handleLogin() {
    if (!isLoaded) return;

    try {
      setLoading(true);
      setError('');
      
      const completeSignIn = await signIn.create({
        identifier: email,
        password,
      });

      await setActive({ session: completeSignIn.createdSessionId });
      router.replace('/profile');
    } catch (err: any) {
      setError(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-white p-8">
      <button 
        className="absolute top-8 left-8 text-gray-800 hover:text-gray-600"
        onClick={() => router.back()}
      >
        <ArrowLeft size={24} />
      </button>

      <div className="max-w-md mx-auto flex flex-col items-center">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">Coroatá Conecta</h1>

        <div className="w-full space-y-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-50 rounded-lg p-4 text-black"
            />

            <Input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-50 rounded-lg p-4 text-black"
            />

          {error && (
            <p className="text-red-500 text-sm text-center">
              {error}
            </p>
          )}

          <Button 
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg"
          >
            {loading ? 'Carregando...' : 'Entrar'}
          </Button>

          <button 
            className="text-gray-600 underline text-center w-full hover:text-gray-800"
            onClick={() => router.push('/register')}
          >
            Não tem uma conta? Cadastre-se
          </button>
        </div>
      </div>
    </div>
  );
}
