import Image from "next/image";
import Link from 'next/link';

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className=""
          src="/transaction.svg"
          alt="Logo Transacciones"
          width={180}
          height={38}
          priority
        />
        <div className="flex gap-4 items-center flex-col sm:flex-col">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#747474] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="/creacion-prestamo"
          >
            <Image
              className="dark:invert"
              src="/window.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Crear Nuevo Prestamo
          </a>
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#747474] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="/simulacion-prestamo"
          >
            <Image
              className="dark:invert"
              src="/window.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Simular Prestamo
          </a>
        </div>
      </main>
    </div>
  );
}
