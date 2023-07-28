import { Metadata } from 'next';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarDateRangePicker } from '../../components/Dashboard/date-range-picker';
import { MainNav } from '../../components/Dashboard/main-nav';
import { Overview } from '../../components/Dashboard/overview';
import { RecentFills } from '../../components/Dashboard/recent-fills';
import { Search } from '../../components/Dashboard/search';
import TeamSwitcher from '../../components/Dashboard/team-switcher';
import { UserNav } from '../../components/Dashboard/user-nav';
import { RxDownload } from 'react-icons/rx';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Example dashboard app using the components.',
};

export default function DashboardPage() {
  return (
    <>
      <div className="md:hidden">
        <Image
          src="/logo_bg_transp_light.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="block dark:hidden"
        />
        <Image
          src="/logo_bg_transp_dark.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="hidden dark:block"
        />
      </div>
      <div className="flex-col flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <TeamSwitcher />
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <Search />
              <UserNav />
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <div className="flex items-center space-x-2">
              <CalendarDateRangePicker />
              <Button className="border flex items-center justify-center gap-2">
                Baixar CSV <RxDownload className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Geral</TabsTrigger>
              <TabsTrigger value="analytics" disabled>
                Análises
              </TabsTrigger>
              <TabsTrigger value="reports" disabled>
                Relatórios
              </TabsTrigger>
              <TabsTrigger value="notifications" disabled>
                Notificações
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Formulários Respondidos
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+573</div>
                    <p className="text-xs text-muted-foreground">
                      +2 desde a última hora
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader className="flex justify-between flex-row">
                    <CardTitle className='leading-none my-auto'>Geral</CardTitle>
                    <div className="w-1/2 h-full flex justify-end">
                      <Select>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Todos" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Todos" className='bg-white'>Todos</SelectItem>
                          <SelectItem value="dark" className='bg-white'>Turbina</SelectItem>
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
                    <CardDescription>
                      Foram preenchidos 300 formulários esse mês.
                    </CardDescription>
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
  );
}
