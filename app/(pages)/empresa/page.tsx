import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/app/components/Shadcn/tabs';
import Header from './components/header';

export default function Empresa() {
  return (
    <>
      <Header>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="gap-2">
            <TabsTrigger value="forms">Formulários</TabsTrigger>
            <TabsTrigger value="users">Usuários</TabsTrigger>
            <TabsTrigger value="setor">Setores</TabsTrigger>
            <TabsTrigger value="config">Configurações</TabsTrigger>
          </TabsList>
          <TabsContent value="forms" className="space-y-4">
            <p>Formulários aparecem aqui</p>
          </TabsContent>
          <TabsContent value="users" className="space-y-4">
            <p>Usuários aparecem aqui</p>
          </TabsContent>
          <TabsContent value="setor" className="space-y-4">
            <p>Setores aparecem aqui</p>
          </TabsContent>
          <TabsContent value="config" className="space-y-4">
            <p>Configurações aparecem aqui</p>
          </TabsContent>
        </Tabs>
      </Header>
    </>
  );
}
