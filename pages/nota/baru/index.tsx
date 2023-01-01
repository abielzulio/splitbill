import { LoadingOutlined, PlusOutlined } from "@ant-design/icons"
import { Button, Form, Input } from "antd"
import Page from "components/Page"
import { BILLED_ITEMS } from "data"
import type { BilledItem } from "data/type"
import { NextPage } from "next"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { BilledItemsContext } from "utils/context"
import { onFinishFailed } from "utils/handler"
import { BilledItems } from "components/Bill/BilledItems"
import Image from "next/image"

const NewBillPage: NextPage = () => {
  const [form] = Form.useForm()
  const router = useRouter()

  const [stepState, setStepState] = useState<number>(1)

  const [imageLoading, setImageloading] = useState<boolean>(false)
  const [imageUrl, setImageUrl] = useState<string>()
  const [firstStepLoading, setFirstStepLoading] = useState<boolean>(false)

  const uploadButton = (
    <div>
      {imageLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Unggah</div>
    </div>
  )

  const onFinishFirst = () => {
    setFirstStepLoading(true)
  }

  const onUploadBillImage = (e: any) => {
    e.preventDefault()
    setImageloading(true)
  }

  const onRemoveBillImage = (e: any) => {
    e.preventDefault()
    setImageUrl("")
  }

  useEffect(() => {
    if (imageLoading) {
      setTimeout(() => {
        setImageloading(false)
        setImageUrl("/nota.jpg")
      }, 2000)
    }
  }, [imageLoading])

  useEffect(() => {
    if (firstStepLoading) {
      setTimeout(() => {
        setStepState(2)
      }, 4000)
    }
  }, [firstStepLoading])

  const onGoingFirstFromSecond = (e: any) => {
    e.preventDefault()
    setFirstStepLoading(false)
    setStepState(1)
  }

  useEffect(() => {
    if (imageUrl) {
      form.setFieldsValue({ billImg: imageUrl })
    } else {
      form.setFieldsValue({ billImg: undefined })
    }
  }, [imageUrl, form])

  const [billedItems, setBilledItems] = useState<BilledItem[]>(
    BILLED_ITEMS.items
  )

  const onChangeBilledItem = (billedItem: BilledItem) => {
    setBilledItems((prevBilledItems) =>
      prevBilledItems.map((item) =>
        item.id === billedItem.id ? billedItem : item
      )
    )
  }

  const deleteBilledItem = (billedItem: BilledItem) => {
    setBilledItems((prevBilledItems) =>
      prevBilledItems.filter((item) => item.id !== billedItem.id)
    )
  }

  const addBilledItem = (billedItem: BilledItem) => {
    setBilledItems((prevBilledItems) => [...prevBilledItems, billedItem])
  }

  return (
    <Page title={{ secondary: "Buat baru" }}>
      <section className="w-full flex flex-col gap-[20px] h-full px-[12px]">
        {stepState == 1 && (
          <Form
            layout="vertical"
            className="flex flex-col h-full"
            form={form}
            onFinish={onFinishFirst}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Nama Nota"
              name="billName"
              className="font-medium bg-transparent"
              rules={[
                { required: true, message: "Mohon tulis nama nota Anda" },
              ]}
              required
            >
              <Input
                placeholder="Waroeng Steak, Sushi Tei"
                className="h-[36px] bg-white"
              />
            </Form.Item>
            <Form.Item
              name="billImg"
              label="Unggah Nota"
              required
              rules={
                imageUrl
                  ? undefined
                  : [{ required: true, message: "Mohon unggah foto nota Anda" }]
              }
              className="font-medium bg-transparent w-full"
            >
              {imageUrl ? (
                <div className="flex flex-col gap-[5px]">
                  <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
                  <Button
                    type="text"
                    className="w-full"
                    onClick={onRemoveBillImage}
                  >
                    Ganti foto nota
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={onUploadBillImage}
                  className="w-full h-[200px] bg-gray-50 border-gray-300 border-dashed border-[1px] rounded-sm hover:border-gray-800 transition"
                >
                  {uploadButton}
                </Button>
              )}
            </Form.Item>
            <Form.Item className="text-white mt-auto">
              <Button
                type="primary"
                className="w-full h-[48px] rounded-xl font-semibold"
                htmlType="submit"
                loading={firstStepLoading}
              >
                {firstStepLoading ? "Memproses Nota" : "Buat Urunan"}
              </Button>
            </Form.Item>
          </Form>
        )}
        {stepState == 2 && (
          <>
            <p>{form.getFieldValue("billName")}</p>
            <Form
              layout="vertical"
              className="flex flex-col h-full"
              form={form}
              onFinish={onFinishFirst}
              onFinishFailed={onFinishFailed}
            >
              <div className="grid grid-cols-10 gap-[10px] w-full mb-[10px] font-semibold">
                <p className="w-full col-span-4">Nama</p>
                <p className="w-full col-span-2">Harga</p>
                <p className="w-full col-span-1">Qty</p>
                <p className="w-full col-span-3 text-right">Total</p>
              </div>
              <BilledItemsContext.Provider
                value={{
                  billedItems,
                  onChangeBilledItem,
                  deleteBilledItem,
                  addBilledItem,
                }}
              >
                <Form.Item
                  name="billedItems"
                  className="font-medium bg-transparent"
                  required
                >
                  <BilledItems />
                </Form.Item>
              </BilledItemsContext.Provider>
              <div className="grid grid-cols-10 gap-[10px] w-full -mt-[10px]">
                <p className="w-full col-span-6 opacity-50">Total item</p>
                <p className="w-full col-span-1 text-center font-semibold font-mono">
                  {billedItems
                    .map(({ qty }) => qty)
                    .reduce((qty, num) => qty + num)}
                </p>
                <p className="w-full col-span-3 font-semibold font-mono text-right">
                  {billedItems
                    .map((item) => item.qty * item.price)
                    .reduce((total, num) => total + num)
                    .toLocaleString()}
                </p>
              </div>
              <div className="grid grid-cols-10 gap-[10px] w-full mt-[10px]">
                <p className="w-full col-span-7 row-span-full h-full opacity-50">
                  Biaya pajak & pelayanan resto
                </p>
                <p className="w-full col-span-3 row-span-full h-full text-right font-semibold font-mono">
                  {BILLED_ITEMS.fees
                    .map(({ price }) => price)
                    .reduce((total, num) => total + num)
                    .toLocaleString()}
                </p>
              </div>
              <div className="grid grid-cols-10 gap-[10px] w-full mt-[10px]">
                <p className="w-full col-span-7 row-span-full h-full opacity-50">
                  Biaya layanan
                </p>
                <p className="w-full col-span-3 row-span-full h-full text-right font-semibold font-mono">
                  {Number("2000").toLocaleString()}
                </p>
              </div>
              <div className="grid grid-cols-8 gap-[10px] w-full mt-[10px]">
                <p className="w-full col-span-6 row-span-full h-full font-semibold">
                  Total semua
                </p>
                <p className="w-full col-span-2 row-span-full h-full text-right font-semibold font-mono">
                  {(
                    billedItems
                      .map((item) => item.qty * item.price)
                      .reduce((total, num) => total + num) +
                    BILLED_ITEMS.fees
                      .map(({ price }) => price)
                      .reduce((total, num) => total + num) +
                    Number("2000")
                  ).toLocaleString()}
                </p>
              </div>
              <Form.Item className="text-white mt-auto">
                <Button
                  type="primary"
                  className="w-full h-[48px] rounded-xl font-semibold"
                  htmlType="submit"
                >
                  Bagikan Urunan
                </Button>
                <Button
                  onClick={onGoingFirstFromSecond}
                  className="w-full h-[48px] rounded-xl mt-[10px] font-semibold"
                >
                  Ganti Nota
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </section>
    </Page>
  )
}

export default NewBillPage
