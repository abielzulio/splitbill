import Head from "components/Head"
import React from "react"
import { Icon } from "components/Icon"

const Page = ({
  children,
  title,
  tabState,
}: {
  children: React.ReactNode
  title: string
  tabState?: "Home" | "Setting"
}) => {
  return (
    <>
      <Head title={title + " — Splitbill"} />
      <h1 className="text-black text-[32px] font-bold md:px-[28px] px-[22px] md:pt-[32px] pt-[32px] pb-[14px] bg-white w-full">
        {title}
      </h1>
      <section className="w-full overflow-scroll md:px-[20px] px-[12px] h-full flex flex-col gap-[24px]">
        <section className="h-full mb-[90px]">{children}</section>
      </section>
      {tabState && (
        <footer className="h-[64px] bg-[#f4f4f4]/75 backdrop-blur-lg w-full absolute z-50 inset-x-0 bottom-0 border-[#ebebeb] border-t-[1px]">
          <section className="w-full h-full grid grid-cols-2 items-center justify-center">
            <button className="flex justify-center">
              <Icon.Bill
                className="w-6 h-6"
                style={{ opacity: tabState === "Home" ? 1 : 0.3 }}
              />
            </button>
            <button className="flex justify-center">
              <Icon.User
                className="w-6 h-6"
                style={{ opacity: tabState === "Setting" ? 1 : 0.3 }}
              />
            </button>
          </section>
        </footer>
      )}
    </>
  )
}

export default Page
