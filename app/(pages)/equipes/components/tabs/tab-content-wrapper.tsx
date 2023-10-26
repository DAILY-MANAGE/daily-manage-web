import { TabsContent } from "@/app/components/Shadcn/tabs"
import { useFetch } from "@/app/hooks/useFetch"
import { usePermission } from "@/app/hooks/usePermission"
import { VER_TODAS_PERMISSOES } from "@/app/utils/EndpointStorage"
import Forms from "./forms"
import Users from "./users"

interface TabContentWrapperProps {
  equipeId: number
  usuarios: any
}

export default function TabContentWrapper({ equipeId, usuarios }: TabContentWrapperProps) {
  const { permissions } = usePermission(undefined, equipeId)

  return <>
    <TabsContent value="forms" className="space-y-4">
      <Forms />
    </TabsContent>
    <TabsContent value="users" className="space-y-4">
      <Users equipeId={equipeId} userPermissions={permissions} userData={usuarios} />
    </TabsContent>
  </>

}
