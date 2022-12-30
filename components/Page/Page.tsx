import Head from "components/Head"
import { Icon } from "components/Icon"
import type { PageButton } from "components/type"

const Page = ({
  children,
  title,
  button,
  tabState,
}: {
  children: JSX.Element
  button?: PageButton
  title: string
  tabState?: "Home" | "Setting"
}) => {
  return (
    <>
      <Head title={title + " — Splitbill"} />
      <div className="flex justify-between md:px-[32px] px-[24px] md:pt-[32px] pt-[32px] pb-[14px] bg-white w-full">
        <h1 className="text-black text-[32px] font-bold w-fit">{title}</h1>
        {button && (
          <button
            className="w-fit h-full flex flex-row gap-[5px] items-center justify-center"
            onClick={() => button.onClick()}
          >
            {button.icon}
            {button.label && <span>{button.label}</span>}
          </button>
        )}
      </div>
      <section className="w-full overflow-scroll md:px-[20px] px-[12px] h-full flex flex-col gap-[24px]">
        {children}
      </section>
      {tabState && (
        <footer className="h-[64px] bg-[#f4f4f4]/50 backdrop-blur-lg w-full absolute z-50 inset-x-0 bottom-0 border-[#ebebeb] border-t-[1px]">
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
