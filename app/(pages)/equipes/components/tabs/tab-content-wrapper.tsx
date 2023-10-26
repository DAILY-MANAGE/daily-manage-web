import { TabsContent } from "@/app/components/Shadcn/tabs"
import { usePermission } from "@/app/hooks/usePermission"
import { useEffect } from "react"

import Forms from "./forms"
import Users from "./users"

interface TabContentWrapperProps {
  equipeId: number
  usuarios: any
}

export default function TabContentWrapper({ equipeId, usuarios }: TabContentWrapperProps) {
  const { permissions, refetch } = usePermission(undefined, equipeId)

  useEffect(() => {
    refetch()
  }, [])

  return <>
    <TabsContent value="forms" className="space-y-4">
      <Forms />
    </TabsContent>
    <TabsContent value="users" className="space-y-4">
      <Users equipeId={equipeId} userPermissions={permissions} userData={usuarios} />
    </TabsContent>
  </>

}
