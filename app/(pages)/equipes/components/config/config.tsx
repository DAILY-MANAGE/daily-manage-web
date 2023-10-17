import { Form } from "@/app/components/Form";
import { Fragment } from "react";
import { RxReload } from "react-icons/rx";
import { Subtitle } from "../subtitle";
import ChangeName from "./change-name";

export interface ConfigProps {
  nomeEquipe: string
  idEquipe: number
}

function Loading() {
    return <Subtitle>
    <RxReload className="w-4 h-4 my-auto leading-none animate-spin" />
    Carregando configurações...
  </Subtitle>
}

export default function Config({ nomeEquipe, idEquipe }: ConfigProps) {
  return <>
    {
      (nomeEquipe && idEquipe) ? <Fragment>
        <ChangeName nomeEquipe={nomeEquipe} idEquipe={idEquipe}/>

      </Fragment> : <Loading />
    }
  </>
}
