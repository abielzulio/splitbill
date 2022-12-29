import { BillItem } from "components/Bill/Item"
import Page from "components/Page"
import { PAID_BILLS, UNPAID_BILLS } from "data"
import { NextPage } from "next"

const HomePage: NextPage = () => {
  const empty = false

  return (
    <Page title="Transaksi" tabState="Home">
      {empty ? (
        <div />
      ) : (
        <>
          <section className="w-full flex flex-col gap-[30px]">
            {UNPAID_BILLS && (
              <section className="w-full flex flex-col">
                <h2 className="text-[14px] font-mono uppercase tracking-wide text-gray-400 w-full pb-[10px] sticky top-[0px] bg-white z-10">
                  Belum Dibayar
                </h2>
                <section className="w-full flex flex-col gap-[15px]">
                  {UNPAID_BILLS.map((bill) => {
                    return <BillItem bill={bill} />
                  })}
                </section>
              </section>
            )}
            {PAID_BILLS && (
              <section className="w-full flex flex-col gap-[15px]">
                <h2 className="text-[14px] font-mono uppercase tracking-wide opacity-50">
                  SUDAH DIBAYAR
                </h2>
                <section className="w-full flex flex-col gap-[15px]">
                  {PAID_BILLS.map((bill) => {
                    return <BillItem bill={bill} />
                  })}
                </section>
              </section>
            )}
          </section>
        </>
      )}
    </Page>
  )
}

export default HomePage
