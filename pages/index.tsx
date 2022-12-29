import Page from "components/Page"
import { NextPage } from "next"

import { Avatar, Tooltip } from "antd"

const HomePage: NextPage = () => {
  const empty = false

  const tx = [
    {
      id: "20b0cc8c-88a7-4407-88db-cdc493267594",
      created_at: Date.now(),
      icon: "🥩",
      title: "Waroeng Steak",
      amount: 140_000,
      person: [
        {
          id: "0dad8825-6d7a-44fa-8c6f-b3aacaa5c858",
          name: "Fitrah",
          amount: 20_000,
          isPaid: true,
        },
        {
          id: "0c81303c-a385-40a6-b947-1868c985ec20",
          name: "Annisa",
          amount: 50_000,
          isPaid: false,
        },
        {
          id: "5a55358f-2a60-4369-a315-9edcc1cc6374",
          name: "Alex",
          amount: 30_000,
          isPaid: true,
        },
        {
          id: "c7d354fe-66ff-4657-b3b1-eafece9e837b",
          name: "Joko",
          amount: 40_000,
          isPaid: false,
        },
      ],
    },
    {
      id: "d2f2dd0f-60bb-4c13-b3fb-343ae882f487",
      created_at: Date.now(),
      icon: "🍝",
      title: "Pasta Banget",
      amount: 130_000,
      person: [
        {
          id: "0dad8825-6d7a-44fa-8c6f-b3aacaa5c858",
          name: "Fitrah",
          amount: 20_000,
          isPaid: true,
        },
        {
          id: "0c81303c-a385-40a6-b947-1868c985ec20",
          name: "Annisa",
          amount: 50_000,
          isPaid: false,
        },
        {
          id: "5a55358f-2a60-4369-a315-9edcc1cc6374",
          name: "Alex",
          amount: 30_000,
          isPaid: false,
        },
        {
          id: "c7d354fe-66ff-4657-b3b1-eafece9e837b",
          name: "Joko",
          amount: 40_000,
          isPaid: false,
        },
      ],
    },
  ]
  return (
    <Page title="Transaksi" tabState="Home">
      {empty ? (
        <div />
      ) : (
        <>
          <section className="w-full flex flex-col gap-[30px]">
            <section className="w-full flex flex-col gap-[10px]">
              <h2 className="text-[14px] font-mono uppercase tracking-wide opacity-50">
                Belum DIBAYAR
              </h2>
              <section className="w-full flex flex-col gap-[15px]">
                {tx.map((item) => {
                  const unpaidAmount = item.person
                    .filter(({ isPaid }) => isPaid == false)
                    .map((item) => item.amount)
                    .reduce((item, num) => item + num)
                  return (
                    <div
                      key={item.id}
                      className="w-full flex items-start gap-[15px]"
                    >
                      <div className="w-[48px] h-[40px]">
                        <div className="relative w-full h-full rounded-full flex items-center justify-center overflow-hidden">
                          <p className="text-sm text-center drop-shadow-lg ml-[3px]">
                            {item.icon}
                          </p>
                          <p className="absolute blur opacity-40 scale-150 text-[32px] contrast-200 brightness-10 saturate-200">
                            {item.icon}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col w-full">
                        <p className="text-[12px] opacity-50">
                          {new Date(item.created_at).toLocaleDateString()}
                        </p>

                        <div className="flex justify-between w-full">
                          <div className="flex flex-col">
                            <p className="font-semibold">{item.title}</p>
                            <Avatar.Group size="small" className="mt-[5px]">
                              {item.person
                                .sort(
                                  (a, b) => Number(a.isPaid) - Number(b.isPaid)
                                )
                                .sort((a, b) => Number(a.name) - Number(b.name))
                                .map(({ name, isPaid }) => (
                                  <Tooltip
                                    title={`${name} ${
                                      isPaid ? "sudah" : "belum"
                                    } membayar`}
                                    placement="bottom"
                                  >
                                    <Avatar
                                      className={`${
                                        isPaid ? `bg-green-500` : `bg-gray-500`
                                      } text-[8px]`}
                                    >
                                      {name
                                        .split(" ")
                                        .map((word) =>
                                          word[0].toLocaleUpperCase()
                                        )}
                                    </Avatar>
                                  </Tooltip>
                                ))}
                            </Avatar.Group>
                          </div>
                          <div className="flex flex-col items-end gap-[5px]">
                            <p className="font-mono tracking-tight">
                              Rp{unpaidAmount.toLocaleString()}
                            </p>
                            <p className="font-mono text-[12px] opacity-50 tracking-tight">
                              Rp{item.amount.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
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
