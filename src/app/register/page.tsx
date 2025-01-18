"use client";

import { useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { useSignUp, useClerk, useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import axios from "axios";

const CLERK_API_URL = "https://api.clerk.dev/v1";
const CLERK_SECRET_KEY = 'sk_test_dTdlvglJ59QkLO4u8uJA6uYqCCCRZZIZ6VsG6MnrmT';

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { isLoaded, signUp } = useSignUp();
  const clerk = useClerk();
  const { setActive, signOut } = clerk;
  const { isSignedIn } = useAuth();
  const router = useRouter();

  const generateReferralCode = (name: string) => {
    const baseCode = name.replace(/\s+/g, "").toLowerCase();
    const uniqueId = Math.random().toString(36).substring(2, 6);
    return `${baseCode}-${uniqueId}`;
  };

  async function handleRegister() {
    if (!isLoaded) return;

    // Validação básica dos campos
    if (!firstName || !lastName || !email || !password) {
      setError("Todos os campos são obrigatórios");
      return;
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Por favor, insira um email válido");
      return;
    }

    if (password.length < 8) {
      setError("A senha deve ter pelo menos 8 caracteres");
      return;
    }

    if (password.length > 128) {
      setError("A senha deve ter no máximo 128 caracteres");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // Verificar código de indicação antes de criar a conta
      let referrer = null;
      if (referralCode && referralCode.trim() !== "") {
        try {
          interface ClerkUser {
            id: string;
            unsafe_metadata?: {
              referralCode?: string;
              points?: number;
            };
          }
          
          const { data: users } = await axios.get<ClerkUser[]>('https://iurygabriel.com.br/proxy.php')

          referrer = users.find(
            (u: any) => u.unsafe_metadata?.referralCode === referralCode
          );

          if (!referrer) {
            setError("Código de indicação inválido");
            return;
          }
        } catch (error) {
          console.error("Erro ao verificar código de indicação:", error);
          setError("Erro ao verificar código de indicação");
          return;
        }
      }

      const userReferralCode = generateReferralCode(`${firstName} ${lastName}`);

      // Criar a conta
      const result = await signUp.create({
        firstName,
        lastName,
        emailAddress: email,
        password,
      });

      if (result) {
        if (signUp.status === "complete") {
          try {
            await setActive({ session: signUp.createdSessionId });

            const metadata = {
              referralCode: userReferralCode,
              points: 0,
              usedReferralCode: referralCode || null,
            };

            if (clerk.user) {
              await clerk.user.update({
                unsafeMetadata: metadata,
              });
            }

            if (referrer) {
              try {
                const newPoints = (referrer.unsafe_metadata?.points || 0) + 100;

                await axios.patch(
                  `https://iurygabriel.com.br/proxy.php?user_id=${referrer.id}`,
                  {
                    unsafe_metadata: {
                      ...referrer.unsafe_metadata,
                      points: newPoints,
                    },
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${CLERK_SECRET_KEY}`,
                    },
                  }
                );
              } catch (error) {
                console.error("Erro ao adicionar pontos de indicação:", error);
                setError("Erro ao adicionar pontos de indicação");
                return;
              }
            }

            router.replace("/profile");
            return;
          } catch (updateError) {
            console.error("Erro ao atualizar metadados:", updateError);
            setError("Erro ao configurar conta. Por favor, tente novamente.");
          }
        } else if (signUp.status === "missing_requirements") {
          await signUp.prepareEmailAddressVerification();
          router.replace("/verify-email");
          return;
        }
      }
    } catch (err: any) {
      if (err.errors && err.errors.length > 0) {
        setError(err.errors[0].longMessage || err.errors[0].message);
      } else {
        setError("Ocorreu um erro ao tentar criar a conta. Por favor, tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container px-4 min-h-screen mx-auto max-w-4xl">
      <Button
        className="absolute top-4 left-4"
        onClick={() => router.replace("/")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Voltar
      </Button>

      <Card className="max-w-md mx-auto mt-20">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Criar Conta
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {isSignedIn && (
            <div className="bg-red-50 p-4 rounded-md">
              <p className="text-red-600 text-sm text-center mb-2">
                Você já está logado
              </p>
              <Button
                variant="destructive"
                className="w-full"
                onClick={() => signOut()}
              >
                Sair da conta atual
              </Button>
            </div>
          )}

          <div className="space-y-4">
            <Input
              placeholder="Nome"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <Input
              placeholder="Sobrenome"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <Input
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              placeholder="Código de indicação (opcional)"
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value)}
            />

            {error && (
              <p className="text-red-600 text-sm text-center">{error}</p>
            )}

            <Button className="w-full h-12 text-lg" onClick={handleRegister} disabled={loading}>
              {loading ? "Cadastrando..." : "Cadastrar"}
            </Button>

            <p className="text-sm text-center text-gray-600">
              Já tem uma conta?{" "}
              <button
                className="text-green-600 hover:underline"
                onClick={() => router.push("/login")}
              >
                Faça login
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
