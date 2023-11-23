import { usePermission } from '@/app/hooks/usePermission';
import { useEffect } from 'react';
import Config from '../config/config';

interface TabContentWrapperProps {
  equipeId: number | undefined;
  nomeEquipe: string;
}

export default function ConfigWrapper({
  equipeId,
  nomeEquipe,
}: TabContentWrapperProps) {
  if (!equipeId) {
    return <></>;
  }

  const { permissions, refetch } = usePermission(undefined, equipeId);

  useEffect(() => {
    refetch();
  }, []);

  return (
    <>
      {permissions &&
        (permissions.includes('EDITAR_EQUIPE') ||
          permissions.includes('ADMINISTRADOR')) && (
          <Config nomeEquipe={nomeEquipe} idEquipe={equipeId} />
        )}
    </>
  );
}
