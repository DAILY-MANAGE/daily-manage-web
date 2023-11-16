import { Root } from "@/app/components/Root"
import RequiresAuth from "@/app/providers/requires-auth"
import { Metadata } from "next"
import NavNotification from '../../components/Navbar/notification/nav-notification';
import NotificationProvider from "./components/notification-provider";

export const metadata: Metadata = {
  title: 'Notificações | Daily Manage',
  description: 'Lista de notificações.',
}

export default function Notificacoes() {
  return <RequiresAuth>
    <Root.Spacing>
      <Root.Header title="Notificações" />
      <Root.Container>
        <NotificationProvider />
      </Root.Container>
    </Root.Spacing>
  </RequiresAuth>
}
