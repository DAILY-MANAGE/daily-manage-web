'use client'

import { useUnload } from '../hooks/useUnload'

export default function UnloadProvider() {
  useUnload()

  return <></>
}
