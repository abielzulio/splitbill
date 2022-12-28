import React from "react"

const Page = ({
  children,
  title,
}: {
  children: React.ReactNode
  title: string
}) => {
  return (
    <main className="w-screen h-screen bg-white text-black sm:p-[24px]">
      <section className="max-w-[500px] h-full mx-auto sm:border-[1px] sm:border-[#ebebeb] sm:shadow-lg bg-white sm:rounded-xl md:p-[32px] p-[24px] flex flex-col gap-[24px]">
        <h1 className="text-black text-[32px] font-bold">{title}</h1>
        <section className="h-full">{children}</section>
      </section>
    </main>
  )
}

export default Page
