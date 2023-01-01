import { Input } from "antd"
import type { BilledItem } from "data/type"
import { useContext } from "react"
import { BilledItemsContext } from "utils/context"

export const BilledItems = () => {
  const { billedItems, onChangeBilledItem } = useContext(BilledItemsContext)

  const onChangeItemTitle = (item: BilledItem, title: string) => {
    onChangeBilledItem({
      ...item,
      title,
    })
  }

  const onChangeItemQty = (item: BilledItem, qty: number) => {
    onChangeBilledItem({
      ...item,
      qty,
    })
  }

  const onChangeItemPrice = (item: BilledItem, price: number) => {
    onChangeBilledItem({
      ...item,
      price,
    })
  }

  return (
    <>
      {billedItems.map((item) => (
        <Input.Group
          className="grid grid-cols-10 gap-[5px] w-full h-full"
          key={item.id}
        >
          <Input
            defaultValue={item.title}
            required
            value={item.title}
            className="w-full col-span-4 rounded-none bg-transparent"
            onChange={(e) => onChangeItemTitle(item, e.target.value)}
          />
          <Input
            defaultValue={item.price}
            value={item.price}
            required
            className="col-span-2 rounded-md text-right bg-transparent"
            onChange={(e) => onChangeItemPrice(item, Number(e.target.value))}
          />
          <Input
            defaultValue={item.qty}
            value={item.qty}
            required
            className="col-span-1 rounded-md text-right bg-transparent"
            onChange={(e) => onChangeItemQty(item, Number(e.target.value))}
          />
          <p className="col-span-3 rounded-md border-transparent w-full text-right font-mono pt-[8px]">
            {(item.price * item.qty).toLocaleString()}
          </p>
        </Input.Group>
      ))}
    </>
  )
}
