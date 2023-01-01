import { Input } from "antd"
import type { BilledItem } from "data/type"
import { useContext } from "react"
import { BilledItemsPersonContext } from "utils/context"

export const BilledItems = () => {
  const {
    billedPerson,
    billedItems,
    onChangeBilledItem,
    deleteBilledItem,
    addBilledItem,
  } = useContext(BilledItemsPersonContext)

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
            className="flex flex-col gap-[5px] w-full h-full"
            key={item.id}
          >
            <div className="flex flex-row w-full gap-[10px]">
              <Input
                defaultValue={item.title}
                placeholder="Nama item"
                required
                value={item.title}
                className="w-full rounded-none bg-transparent"
                onChange={(e) => onChangeItemTitle(item, e.target.value)}
              />
              <Input
                defaultValue={item.price}
                placeholder="Harga item"
                value={item.price}
                style={{ width: "200px" }}
                required
                className="rounded-md text-right bg-transparent w-[50px]"
                onChange={(e) =>
                  onChangeItemPrice(item, Number(e.target.value))
                }
              />
              <Input
                defaultValue={item.qty}
                value={item.qty}
                placeholder="Kuantitas"
                required
                style={{ width: "80px" }}
                className="rounded-md text-right bg-transparent"
                onChange={(e) => onChangeItemQty(item, Number(e.target.value))}
              />
              <p className="col-span-3 rounded-md border-transparent w-full text-right font-mono pt-[8px]">
                {(item.price * item.qty).toLocaleString()}
              </p>
            </div>
            <button
              onClick={(e) => onClickToDeleteItem(item, e)}
              className="opacity-50 text-[12px] hover:opacity-100 transition mr-auto"
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
