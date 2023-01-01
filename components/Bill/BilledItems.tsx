import { Input } from "antd"
import type { BilledItem } from "data/type"
import { useContext } from "react"
import { BilledItemsContext } from "utils/context"

export const BilledItems = () => {
  const { billedItems, onChangeBilledItem, deleteBilledItem, addBilledItem } =
    useContext(BilledItemsContext)

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

  const onClickToDeleteItem = (item: BilledItem, e: any) => {
    e.preventDefault()
    deleteBilledItem(item)
  }

  const onClickToAddItem = (e: any) => {
    e.preventDefault()
    addBilledItem({
      id: billedItems.length + 1 + 1,
      title: "",
      qty: 1,
      price: 0,
    })
  }

  return (
    <div className="flex flex-col gap-[10px] justify-start">
      {billedItems.map((item) => (
        <>
          <Input.Group
            className="grid grid-cols-10 gap-[5px] w-full h-full"
            key={item.id}
          >
            <Input
              defaultValue={item.title}
              placeholder="Nama item"
              required
              value={item.title}
              className="w-full col-span-4 rounded-none bg-transparent"
              onChange={(e) => onChangeItemTitle(item, e.target.value)}
            />
            <Input
              defaultValue={item.price}
              placeholder="Harga item"
              value={item.price}
              required
              className="col-span-2 rounded-md text-right bg-transparent"
              onChange={(e) => onChangeItemPrice(item, Number(e.target.value))}
            />
            <Input
              defaultValue={item.qty}
              value={item.qty}
              placeholder="Kuantitas"
              required
              className="col-span-1 rounded-md text-right bg-transparent"
              onChange={(e) => onChangeItemQty(item, Number(e.target.value))}
            />
            <p className="col-span-3 rounded-md border-transparent w-full text-right font-mono pt-[8px]">
              {(item.price * item.qty).toLocaleString()}
            </p>
            <button
              onClick={(e) => onClickToDeleteItem(item, e)}
              className="opacity-50 text-[12px] hover:opacity-100 transition"
            >
              Hapus
            </button>
          </Input.Group>
        </>
      ))}
      <button
        onClick={(e) => onClickToAddItem(e)}
        className="opacity-50 text-[12px] hover:opacity-100 transition"
      >
        + Tambah Item
      </button>
    </div>
  )
}
