'use client';

import { Button } from "@/app/components/Shadcn/button";
import { useAuth } from "@/app/hooks/useAuth";
import { RxExit } from "react-icons/rx";

export default function Exit() {

  const { signOut } = useAuth()

  return (
    <Button
      className="border flex items-center justify-center gap-2 border-black/20 bg-red-400 hover:bg-red-200 hover:animate-pulse mt-2 md:mt-0 font-semibold text-red-900"
      variant={'outline'}
      onClick={signOut}
    >
      Sair da Conta <RxExit className="w-4 h-4" />
    </Button>
  );
}
