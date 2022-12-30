import { Bill } from "type"
import { Avatar, Tooltip } from "antd"
import { Icon } from "components/Icon"

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
    <div
      key={bill.id}
      className="w-full flex items-start gap-[15px] hover:bg-gray-100 transition bg-white rounded-xl px-[12px] pt-[10px] pb-[15px]"
    >
      <Icon.Emoji>{bill.icon}</Icon.Emoji>
      <div className="flex flex-col w-full">
        <p className="text-[12px] opacity-50">
          {new Date(bill.created_at).toLocaleDateString()}
        </p>
        <div className="flex justify-between w-full">
          <div className="flex flex-col">
            <p className="font-semibold">{bill.title}</p>
            {personList && (
              <Avatar.Group size="small" className="mt-[5px]">
                {personList.map(({ name, is_paid, id, amount }) => (
                  <Tooltip
                    className="text-[10px]"
                    key={id}
                    title={`${name} ${
                      is_paid ? "sudah" : "belum"
                    } membayar Rp${amount.toLocaleString()}`}
                    placement="bottomLeft"
                    color={is_paid ? "#30c55e" : "#6b7280"}
                    arrowPointAtCenter
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
            <p className="font-mono tracking-tight font-semibold">
              {unpaidAmount
                ? `Rp${unpaidAmount.toLocaleString()}`
                : `Rp${bill.amount.toLocaleString()}`}
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
