interface UsersProps {
  data: string[]
}

export default function Users({ data }: UsersProps) {
  return <>
    <p>{JSON.stringify(data)}</p>
  </>
}
