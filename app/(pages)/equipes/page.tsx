import { Root } from '@/app/components/Root'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/app/components/Shadcn/card'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Equipes | Daily Manage',
  description: 'Lista de equipes.',
}

export default function Equipes() {
  return (
    <Root.Spacing>
      <Root.Header title="Equipes"></Root.Header>
      <Root.Container>
        <Card>
          <CardHeader>
            <CardTitle>Bracell</CardTitle>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
      </Root.Container>
    </Root.Spacing>
  )
}
