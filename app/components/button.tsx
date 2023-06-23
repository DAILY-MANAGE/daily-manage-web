"use client";
function getClassesFromSize(size: string) {
  type sizeMapType = {
    [key: string]: string;
  }
  const mapOfSizes: sizeMapType = {
    'sm': 'h-[2.5rem]',
    'md': 'h-[3rem]',
    'lg': 'h-[6rem]',
    'full': 'w-full h-[2.5rem]',
  }
  return mapOfSizes[size]
}

function getClassesFromTheme(theme: string) {
  return `bg-${theme} text-${theme}-text hover:bg-${theme}-hover`
}

export function Button({ children, size = 'md', theme = 'primary', customStyle, ...props}: any) {
  return (
    <button
      className={`rounded-lg font-medium my-[0.2rem] ${getClassesFromSize(size)} ${getClassesFromTheme(theme)} ${customStyle}`}
      {...props}
    >
      {children}
    </button>
  );
}
