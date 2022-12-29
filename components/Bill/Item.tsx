import { Bill } from "type"
import { Avatar, Tooltip } from "antd"

export const BillItem = ({ bill }: { bill: Bill }) => {
  const unpaidAmount = !bill.is_paid
    ? bill.person
        .filter(({ is_paid }) => is_paid == false)
        .map((item) => item.amount)
        .reduce((item, num) => item + num)
    : undefined
  const personList = !bill.is_paid
    ? bill.person
        .sort((a, b) => Number(a.is_paid) - Number(b.is_paid))
        .sort((a, b) => Number(a.name) - Number(b.name))
    : undefined
  return (
    <div key={bill.id} className="w-full flex items-start gap-[15px]">
      <div className="w-[48px] h-[40px]">
        <div className="relative w-full h-full rounded-full flex items-center justify-center overflow-hidden">
          <p className="text-sm text-center drop-shadow-lg ml-[3px]">
            {bill.icon}
          </p>
          <p className="absolute blur opacity-40 scale-150 text-[32px] contrast-200 brightness-10 saturate-200">
            {bill.icon}
          </p>
        </div>
      </div>
      <div className="flex flex-col w-full">
        <p className="text-[12px] opacity-50">
          {new Date(bill.created_at).toLocaleDateString()}
        </p>

        <div className="flex justify-between w-full">
          <div className="flex flex-col">
            <p className="font-semibold">{bill.title}</p>
            {!bill.is_paid && (
              <Avatar.Group size="small" className="mt-[5px]">
                {personList.map(({ name, is_paid, id }) => (
                  <Tooltip
                    key={id}
                    title={`${name} ${is_paid ? "sudah" : "belum"} membayar`}
                    placement="bottom"
                  >
                    <Avatar
                      className={`${
                        is_paid ? `bg-green-500` : `bg-gray-500`
                      } text-[8px]`}
                    >
                      {name
                        .split(" ")
                        .map((word) => word[0].toLocaleUpperCase())}
                    </Avatar>
                  </Tooltip>
                ))}
              </Avatar.Group>
            )}
          </div>
          <div className="flex flex-col items-end gap-[5px]">
            <p className="font-mono tracking-tight">
              {bill.is_paid
                ? `Rp${bill.amount.toLocaleString()}`
                : `Rp${unpaidAmount.toLocaleString()}`}
            </p>
            {!bill.is_paid && (
              <p className="font-mono text-[12px] opacity-50 tracking-tight">
                Rp{bill.amount.toLocaleString()}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
