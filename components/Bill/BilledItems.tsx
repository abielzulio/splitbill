import { Input, Select } from "antd"
import type { BilledItem, BilledPerson } from "data/type"
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react"
import { BilledItemsContext, BilledPersonContext } from "utils/context"

const BilledItemsPersonItem = ({
  options,
  maxQty,
  availableQty,
  setAvailableQty,
}: {
  availableQty: number
  maxQty: number
  options: BilledPerson[]
  setAvailableQty: Dispatch<SetStateAction<number>>
}) => {
  const [personQty, setPersonQty] = useState<number>(0)

  const onChangeBilledPersonQty = (e: any) => {
    setAvailableQty(maxQty - Number(e.target.value))
  }

  useEffect(() => {
    console.log(availableQty)
  }, [availableQty])

  return (
    <div className="flex w-[290px] gap-[5px]">
      <Select
        size="small"
        className="w-full"
        options={options.map(({ name, id }) => ({
          id,
          value: name,
          label: name,
        }))}
      />
      <Input
        placeholder="Kuantitas"
        required
        onChange={onChangeBilledPersonQty}
        style={{ width: "80px" }}
        className="rounded-md text-right bg-transparent"
      />
    </div>
  )
}

const BilledItemsPerson = ({
  maxQty,
  options,
}: {
  maxQty: number
  options: BilledPerson[]
}) => {
  const [showBilledPerson, setShowBilledPerson] = useState<boolean>(false)
  const onClickToInitBilledPerson = (e: any, n: number) => {
    e.preventDefault()
    setShowBilledPerson(!showBilledPerson)
  }

  const [availableQty, setAvailableQty] = useState<number>(maxQty)

  /*   useEffect(() => {
    if (availableQty === 0) {
      setAvailableQty(maxQty)
    }
  }, [availableQty]) */

  return (
    <div className="flex flex-col gap-[10px] w-full">
      {showBilledPerson && (
        <div className="flex flex-col gap-[10px] mt-[5px] w-full">
          {Array.from(
            { length: availableQty <= 1 ? availableQty + 1 : availableQty },
            (_, i) => i
          ).map((_, i) => (
            <BilledItemsPersonItem
              options={options}
              maxQty={maxQty}
              availableQty={availableQty}
              setAvailableQty={setAvailableQty}
            />
          ))}
        </div>
      )}
      <button
        onClick={(e) => onClickToInitBilledPerson(e, maxQty)}
        className="opacity-50 text-[12px] hover:opacity-100 transition mr-auto"
      >
        {showBilledPerson ? "Tutup" : "Siapa"}
      </button>
    </div>
  )
}

export const BilledItems = () => {
  const { billedItems, onChangeBilledItem, deleteBilledItem, addBilledItem } =
    useContext(BilledItemsContext)

  const { billedPerson } = useContext(BilledPersonContext)

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
      id: billedItems[billedItems.length - 1].id + 1,
      title: "",
      qty: 1,
      price: 0,
    })
  }

  return (
    <div className="flex flex-col gap-[10px] justify-start">
      {billedItems.map((item) => (
      {billedItems.map((item, id, arr) => (
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
            <div className="flex gap-[5px] justify-between items-start">
              <BilledItemsPerson maxQty={item.qty} options={billedPerson} />
              {arr.length > 1 && (
                <button
                  onClick={(e) => onClickToDeleteItem(item, e)}
                  className="opacity-50 text-[12px] hover:opacity-100 transition ml-auto"
                >
                  Hapus
                </button>
              )}
            </div>
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
