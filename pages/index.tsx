import { BillItem } from "components/Bill/Item"
import { Icon } from "components/Icon"
import Page from "components/Page"
import { PAID_BILLS, UNPAID_BILLS } from "data"
import { NextPage } from "next"
import { useRouter } from "next/router"
import type { PageButton } from "components/type"

const BillsPage: NextPage = () => {
  const empty = false
  const router = useRouter()

  const button: PageButton = {
    icon: <Icon.New className="text-black w-6 h-6 opacity-50" />,
    onClick: () => router.push("/nota/baru"),
  }

  return (
    <Page title="Nota" tabState="Home" button={button}>
      {empty ? (
        <section className="h-full w-full justify-center flex items-center text-center text-[14px] opacity-50">
          <p>Klik ikon "+" untuk membuat urunan pertama Anda</p>
        </section>
      ) : (
        <>
          <section className="w-full flex flex-col gap-[20px] h-full">
            {UNPAID_BILLS && (
              <section className="w-full flex flex-col">
                <h2 className="text-[14px] font-mono uppercase tracking-wide text-gray-400 w-full pb-[10px] sticky top-[0px] bg-white z-10 px-[12px]">
                  Belum Dibayar
                </h2>
                <section className="w-full flex flex-col">
                  {UNPAID_BILLS.map((bill) => bill && <BillItem bill={bill} />)}
                </section>
              </section>
            )}
            {PAID_BILLS && (
              <section className="w-full flex flex-col pb-[72px]">
                <h2 className="text-[14px] font-mono uppercase tracking-wide text-gray-400 w-full pb-[10px] sticky top-[0px] bg-white z-10 px-[12px]">
                  Histori
                </h2>
                <section className="w-full flex flex-col">
                  {PAID_BILLS.map((bill) => bill && <BillItem bill={bill} />)}
                </section>
              </section>
            )}
          </section>
        </>
      )}
    </Page>
  )
}

export default BillsPage
