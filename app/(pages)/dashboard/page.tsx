import { Metadata } from 'next'

import { Button } from '@/app/components/Shadcn/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/components/Shadcn/card'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/app/components/Shadcn/tabs'

import { CalendarDateRangePicker } from './components/date-range-picker'
import { Overview } from './components/overview'
import { RecentFills } from './components/recent-fills'

import { RxClipboard, RxDownload } from 'react-icons/rx'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/Shadcn/select'

export const metadata: Metadata = {
  title: 'Dashboard | Daily Manage',
  description: 'Dashboard com dados e estatisticas sobre os formulários.',
}

export default function DashboardPage() {
  return (
    <>
      <div className="flex-col flex">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between flex-col md:flex-row bg-recuperarSenha bg-cover bg-no-repeat px-4 py-3 rounded">
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Dashboard
            </h2>
            <div className="flex items-center gap-2">
              <Button
                className="border flex items-center justify-center gap-2 border-black/20"
                variant={'outline'}
              >
                Baixar CSV <RxDownload className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="gap-2">
              <TabsTrigger value="overview">Geral</TabsTrigger>
              <TabsTrigger value="analytics">Análises</TabsTrigger>
              <TabsTrigger value="reports">Relatórios</TabsTrigger>
              <TabsTrigger value="notifications">Notificações</TabsTrigger>
            </TabsList>
            <TabsContent value="analytics" className="space-y-4">
              <p>Análises</p>
            </TabsContent>
            <TabsContent value="reports" className="space-y-4">
              <p>Relatórios</p>
            </TabsContent>
            <TabsContent value="notifications" className="space-y-4">
              <p>Notificações</p>
            </TabsContent>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Formulários Respondidos
                    </CardTitle>
                    <RxClipboard className="w-4 h-4" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">573</div>
                    <p className="text-xs text-muted-foreground">
                      +300 desde o último mês
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Formulários Respondidos
                    </CardTitle>
                    <RxClipboard className="w-4 h-4" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">573</div>
                    <p className="text-xs text-muted-foreground">
                      +300 desde o último mês
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Formulários Respondidos
                    </CardTitle>
                    <RxClipboard className="w-4 h-4" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">573</div>
                    <p className="text-xs text-muted-foreground">
                      +300 desde o último mês
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Formulários Respondidos
                    </CardTitle>
                    <RxClipboard className="w-4 h-4" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">573</div>
                    <p className="text-xs text-muted-foreground">
                      +300 desde o último mês
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader className="flex justify-between flex-row">
                    <CardTitle className="leading-none my-auto">
                      Geral
                    </CardTitle>
                    <div className="w-1/2 h-full flex justify-end gap-2">
                      <CalendarDateRangePicker />
                      <Select defaultValue="Todos">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Todos" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Todos">Todos</SelectItem>
                          <SelectItem value="Turbina">Turbina</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <Overview />
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Formulários Recentes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RecentFills />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}
