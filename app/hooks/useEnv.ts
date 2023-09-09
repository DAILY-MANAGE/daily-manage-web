import { useEffect, useState } from 'react'

export enum EnvVariable {
  environment,
  serverEndPoint,
  website,
}

type EnvVariables = { [key in keyof typeof EnvVariable]: string }

const DefaultVariables: EnvVariables = {
  environment: 'local',
  serverEndPoint: 'http://localhost:5000',
  website: 'http://localhost:3000',
}

export function useEnvKey(key: EnvVariable, defaultValue: string) {
  const environmentVaribles = useEnv()
  let variable = environmentVaribles[key]
  if (variable === '') variable = defaultValue
  return variable
}

export function useEnv() {
  const [variables, setVariables] = useState(DefaultVariables)

  const getVariables = () => {
    const variables: EnvVariables = DefaultVariables
    for (const environmentVariable in EnvVariable) {
      let value = process.env[environmentVariable]
      if (value === undefined) value = ''

      variables[environmentVariable] = value
    }

    setVariables(variables)
  }

  useEffect(() => {
    getVariables()
  }, [])

  return variables
}
