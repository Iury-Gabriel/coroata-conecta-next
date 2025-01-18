"use client";
import { useAuth, useClerk, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Share } from "lucide-react";
import { Header } from "@/components/Header";

export default function ProfilePage() {
  const { signOut } = useClerk();
  const { user } = useUser();
  const router = useRouter();
  const { isSignedIn } = useAuth();

  const handleShareReferralCode = async () => {
    try {
      const referralCode = user?.unsafeMetadata?.referralCode || 'SEM-CODIGO';
      const message = `Olá! Use meu código de indicação ${referralCode} no app Coroatá Conecta e ganhe benefícios!\n\nAcesse: https://coroataconecta.com.br`;
      
      if (navigator.share) {
        await navigator.share({
          title: 'Compartilhar Código de Indicação',
          text: message
        });
      } else {
        await navigator.clipboard.writeText(message);
        alert('Código copiado para a área de transferência!');
      }
    } catch (error) {
      console.error('Error sharing referral code:', error);
    }
  };

  return (
    <div className="container px-4 bg-[#f1f1f1] min-h-screen mx-auto max-w-4xl">
        <Header 
                showBackButton={true}
                isLoggedIn={isSignedIn ?? false}
                onLoginPress={() => router.push('/login')}
              />
      <div className="space-y-6">
        {/* User Info */}
        <Card>
          <CardHeader>
            <CardTitle>Perfil do Usuário</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Nome</p>
              <p className="font-medium">{user?.firstName} {user?.lastName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">E-mail</p>
              <p className="font-medium">{user?.primaryEmailAddress?.emailAddress}</p>
            </div>
          </CardContent>
        </Card>

        {/* Referral Program */}
        <Card>
          <CardHeader>
            <CardTitle>Programa de Indicação</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Seu código de indicação</p>
              <p className="font-medium">{String(user?.unsafeMetadata?.referralCode) || 'SEM-CODIGO'}</p>
            </div>
            <Button onClick={handleShareReferralCode} className="w-full py-3">
              <Share className="mr-2 h-4 w-4" />
              Compartilhar Código
            </Button>
          </CardContent>
        </Card>

        {/* Points System */}
        <Card>
          <CardHeader>
            <CardTitle>Seus Pontos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-2xl font-bold">
                {Number(user?.unsafeMetadata?.points) || 0} pontos
              </p>
              <p className="text-sm text-muted-foreground">
                {Math.floor((Number(user?.unsafeMetadata?.points) || 0) / 100)} indicações
              </p>
            </div>
            
            <div className="space-y-2">
              <Progress 
                value={Math.min((Number(user?.unsafeMetadata?.points) || 0) / 500 * 100, 100)}
                className="h-2"
              />
              <p className="text-sm text-muted-foreground">
                {Number(user?.unsafeMetadata?.points) || 0 < 500 ? 
                  `Faltam ${500 - (Number(user?.unsafeMetadata?.points) || 0)} pontos para o próximo nível` :
                  'Você atingiu o nível máximo!'
                }
              </p>
              <p className="text-sm font-medium">
                Nível atual: Explorador Prata
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Rewards Program */}
        <Card>
          <CardHeader>
            <CardTitle>Programa de Recompensas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Ao final de cada mês, o cliente com mais indicações receberá um produto especial de uma de nossas lojas parceiras!
            </p>
            <p className="text-sm text-muted-foreground">
              O valor do prêmio será proporcional aos seus pontos acumulados.
            </p>
            <p className="text-sm text-muted-foreground">
              Continue indicando e aumente suas chances de ganhar!
            </p>
          </CardContent>
        </Card>

        {/* How It Works */}
        <Card>
          <CardHeader>
            <CardTitle>Como Funciona</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground">• Cada indicação bem-sucedida vale 100 pontos</p>
            <p className="text-sm text-muted-foreground">• A cada 500 pontos, o usuário sobe de nível</p>
            <p className="text-sm text-muted-foreground">• Níveis mais altos desbloqueiam benefícios exclusivos</p>
            <p className="text-sm text-muted-foreground">• Pontos são acumulados mensalmente para o ranking de recompensas</p>
            <p className="text-sm text-muted-foreground">• O ranking é zerado no início de cada mês, mas o nível e pontos totais são mantidos</p>
          </CardContent>
        </Card>

        {/* Logout */}
        <Button 
          variant="destructive" 
          className="w-full py-3 mb-3"
          onClick={() => signOut(() => router.push("/"))}
        >
          Sair da Conta
        </Button>
      </div>
    </div>
  );
}
