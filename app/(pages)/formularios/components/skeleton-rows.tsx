import { TableCell, TableRow } from '@/app/components/Shadcn/table'
import { tv } from 'tailwind-variants'

const cell = tv({
  base: 'h-2 bg-slate-200 rounded col-span-2',
  variants: {
    size: {
      default: 'w-full',
      half: 'w-1/2',
      sixth: 'w-1/6',
    },
  },
  defaultVariants: {
    size: 'default',
  },
})

export default function SkeletonRows() {
  const getRandomSize = (): 'default' | 'half' | 'sixth' => {
    const options: ('default' | 'half' | 'sixth')[] = [
      'default',
      'half',
      'sixth',
    ]
    return options[Math.floor(Math.random() * options.length)]
  }

  return (
    <>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(
        (index: number) => {
          return (
            <TableRow className="animate-pulse" key={index}>
              <TableCell className="font-medium border border-r-1 animate-fade animate-once animate-duration-[2000ms] animate-ease-out animate-normal animate-fill-forwards">
                <div className={cell({ size: getRandomSize() })}></div>
              </TableCell>
              <TableCell className="font-medium border border-r-1 animate-fade animate-once animate-duration-[2000ms] animate-ease-out animate-normal animate-fill-forwards">
                <div className={cell({ size: getRandomSize() })}></div>
              </TableCell>
              <TableCell className="font-medium border border-r-1 animate-fade animate-once animate-duration-[2000ms] animate-ease-out animate-normal animate-fill-forwards">
                <div className={cell({ size: getRandomSize() })}></div>
              </TableCell>
              <TableCell className="font-medium border animate-fade animate-once animate-duration-[2000ms] animate-ease-out animate-normal animate-fill-forwards">
                <div className={cell({ size: getRandomSize() })}></div>
              </TableCell>
            </TableRow>
          )
        },
      )}
    </>
  )
}
