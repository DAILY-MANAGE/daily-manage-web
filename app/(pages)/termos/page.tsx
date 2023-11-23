import BackButton from '@/app/components/BackButton'
import Logo from '@/app/components/Logo'
import Link from 'next/link'

export default function Termos() {
  return (
    <div className="w-full min-h-screen">
      <div className="w-full h-fit flex justify-center items-center pt-10">
        <Logo width={100} height={100} />
      </div>
      <div className="mx-auto w-1/2 px-8 py-16 prose h-full w-full">
        <h3>Termos e Condições</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          suscipit nunc eget consectetur mattis. In non neque consequat, mollis
          nisi at, suscipit turpis. Pellentesque habitant morbi tristique
          senectus et netus et malesuada fames ac turpis egestas. Ut finibus
          luctus lectus, id commodo mi ornare eu. Sed laoreet quis ante sit amet
          pharetra. Integer sed lectus at sapien gravida tincidunt. Sed semper
          suscipit ex, id commodo ipsum maximus in. Nulla vel ultricies nisi.
          Aliquam erat volutpat. Phasellus ac pharetra urna. Nam pharetra
          scelerisque enim, sed vehicula est lobortis id. Aliquam hendrerit,
          orci sodales mollis finibus, sem dui aliquet risus, in sollicitudin
          libero libero et augue. Duis ut vulputate libero. Duis sagittis tortor
          at neque varius interdum. Praesent hendrerit lobortis dui id feugiat.
          Vestibulum interdum, quam eget dictum accumsan, tellus turpis
          fermentum purus, id pulvinar neque sapien at justo. Donec ultricies
          felis sit amet dui dictum feugiat. Suspendisse consectetur sem et
          lorem efficitur commodo. Vivamus quis erat eu nibh porttitor placerat
          vitae in erat. Integer convallis, nisl ut vulputate lacinia, orci
          metus semper ex, in accumsan tortor metus quis velit. Cras vitae
          turpis et ligula sollicitudin venenatis in ac odio. Integer quis diam
          non libero mattis suscipit. Suspendisse interdum massa in turpis
          dictum, non iaculis nisl consequat. In faucibus sit amet sapien at
          pretium. Etiam varius purus in enim facilisis egestas. Nam suscipit
          tristique pellentesque. Cras at vehicula purus, id laoreet tortor. Sed
          lectus felis, vulputate eget tristique non, scelerisque quis urna.
          Suspendisse tristique, tortor id tempus ornare, tortor ante elementum
          nulla, eu tristique elit tellus non neque. In mollis consectetur arcu,
          et luctus nunc molestie eget. Vivamus venenatis imperdiet magna, eget
          bibendum dui varius ac. Nulla rhoncus turpis in imperdiet porttitor.
          In volutpat orci ut bibendum fringilla. Morbi commodo, arcu vel varius
          ornare, est nisi eleifend nisi, non vehicula arcu velit a tellus. Ut
          sollicitudin congue magna nec aliquet. Nullam mollis, lorem et
          imperdiet finibus, felis mi maximus nibh, placerat convallis orci
          libero a est. Maecenas consectetur euismod nisl, ac venenatis tortor
          ornare sed. Sed auctor quam nec dolor rutrum blandit. Duis id varius
          odio. Vestibulum quis tempor sapien. Ut hendrerit maximus euismod.
        </p>
        <div className="grid grid-cols-2 items-center">
          <p className="font-bold">Copyright © 2023 Lutherik.</p>
          <div className="flex justify-end">
            <Link href="/cadastro" className="no-underline">
              <BackButton />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
