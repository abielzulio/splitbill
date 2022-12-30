const Main = ({ children }: { children: React.ReactNode }) => (
  <main className="w-screen h-screen h-screen-safe bg-white text-black sm:p-[24px]">
    <section className="max-w-[500px] relative h-full mx-auto sm:border-[1px] overflow-hidden sm:border-[#ebebeb] sm:shadow-lg bg-white sm:rounded-xl flex flex-col">
      {children}
    </section>
  </main>
)

export default Main
