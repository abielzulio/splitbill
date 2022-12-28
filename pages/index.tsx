import Page from "components/Page"
import { NextPage } from "next"

const HomePage: NextPage = () => {
  const empty = false

  const tx = [
    {
      id: "20b0cc8c-88a7-4407-88db-cdc493267594",
      icon: "🥩",
      title: "Waroeng Steak",
      amount: 140_000,
      person: [
        {
          id: "0dad8825-6d7a-44fa-8c6f-b3aacaa5c858",
          name: "Fitrah",
          amount: 20_0000,
          isPaid: true,
        },
        {
          id: "0c81303c-a385-40a6-b947-1868c985ec20",
          name: "Annisa",
          amount: 50_0000,
          isPaid: false,
        },
        {
          id: "5a55358f-2a60-4369-a315-9edcc1cc6374",
          name: "Alex",
          amount: 30_0000,
          isPaid: false,
        },
        {
          id: "c7d354fe-66ff-4657-b3b1-eafece9e837b",
          name: "Joko",
          amount: 40_0000,
          isPaid: false,
        },
      ],
    },
    {
      id: "d2f2dd0f-60bb-4c13-b3fb-343ae882f487",
      icon: "🍝",
      title: "Pasta Banget",
      amount: 130_000,
      person: [
        {
          id: "0dad8825-6d7a-44fa-8c6f-b3aacaa5c858",
          name: "Fitrah",
          amount: 20_0000,
          isPaid: true,
        },
        {
          id: "0c81303c-a385-40a6-b947-1868c985ec20",
          name: "Annisa",
          amount: 50_0000,
          isPaid: false,
        },
        {
          id: "5a55358f-2a60-4369-a315-9edcc1cc6374",
          name: "Alex",
          amount: 30_0000,
          isPaid: false,
        },
        {
          id: "c7d354fe-66ff-4657-b3b1-eafece9e837b",
          name: "Joko",
          amount: 40_0000,
          isPaid: false,
        },
      ],
    },
  ]
  return (
    <Page title="Transaksi">
      {empty ? (
        <div />
      ) : (
        <>
          <section className="w-full flex flex-col gap-[30px]">
            <section className="w-full flex flex-col gap-[10px]">
              <h2 className="text-[14px] font-mono uppercase tracking-wide opacity-50">
                Belum Terbayar
              </h2>
              <section className="w-full flex flex-col gap-[15px]">
                {tx.map((item) => (
                  <div
                    key={item.id}
                    className="w-full flex items-center gap-[15px]"
                  >
                    <div className="w-[48px] h-[40px]">
                      <div className="relative w-full h-full rounded-full flex items-center justify-center overflow-hidden">
                        <p className="text-sm text-center drop-shadow-lg ml-[4px] mb-[1px]">
                          {item.icon}
                        </p>
                        <p className="absolute blur opacity-40 scale-150 text-[32px] contrast-200 brightness-10 saturate-200">
                          {item.icon}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between w-full">
                      <div className="flex flex-col">
                        <p>{item.title}</p>
                        <p className="text-[12px]">3/4</p>
                      </div>
                      <p className="font-mono tracking-tight">
                        Rp{item.amount.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </section>
            </section>
            <h2 className="text-[14px] font-mono uppercase tracking-wide opacity-50">
              SUDAH DIBAYAR
            </h2>
          </section>
        </>
      )}
    </Page>
  )
}

export default HomePage
