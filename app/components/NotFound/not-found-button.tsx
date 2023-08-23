'use client'

interface NotFoundButtonProps {
  text: string,
  callback: () => void,
}

export default function NotFoundButton({ text, callback }: NotFoundButtonProps) {
  return (
    <div className="font-normal cursor-pointer mx-auto w-full text-center p-2 px-4 flex justify-center outline outline-1 rounded-lg group hover:bg-zinc-50 transition-colors">
      <button onClick={callback} className="w-full h-full">
        <span className="font-medium group-hover:text-zinc-700">{ text }</span>
      </button>
    </div>
  );
}
