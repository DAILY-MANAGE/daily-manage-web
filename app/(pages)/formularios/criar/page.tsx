import { Badge } from '@/app/components/Shadcn/badge';
import { Button } from '@/app/components/Shadcn/button';
import { Card, CardContent } from '@/app/components/Shadcn/card';
import { Input } from '@/app/components/Shadcn/input';
import { Label } from '@/app/components/Shadcn/label';

import { PermittedUsers } from './components/permitted-users';

export default function Criar() {
  return (
    <div className="flex-col flex w-full">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between flex-col md:flex-row bg-titleHeader bg-cover bg-bottom bg-no-repeat px-4 py-3 rounded overflow-hidden">
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Criar Formulário
          </h2>
        </div>
        <div className="flex items-center space-y-4 flex-col w-full">
          <Card className="w-full h-fit flex items-center justify-center flex-col shadow pb-1 px-1">
            <div className="w-full block h-fit">
              <CardContent className="w-full p-3">
                <Label>Nome do Formulário</Label>
                <Input
                  placeholder="Turbina"
                  className="border-black/20"
                ></Input>
              </CardContent>
              <CardContent className="w-1/3 p-3 flex flex-col">
                <Label>Pessoas Permitidas</Label>
                <PermittedUsers />
              </CardContent>
            </div>
            <div className="w-full block h-fit flex items-center justify-center">
              <Button className="text-xl">ADICIONAR +</Button>
            </div>
          </Card>
          <Card className="w-full h-fit flex items-center justify-center flex-col md:flex-row shadow">
            <CardContent className="py-2 pb-4 w-full">
              <Label>Etiquetas</Label>
              <div className="py-2 pb-3 flex gap-2">
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="secondary">Secondary</Badge>
              </div>
              <Input placeholder="Turbina"></Input>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
