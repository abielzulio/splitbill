import { LoadingOutlined, PlusOutlined } from "@ant-design/icons"
import { Button, Form, Input, Select } from "antd"
import { BilledItems } from "components/Bill/BilledItems"
import Page from "components/Page"
import { BilledItem, BilledPerson, OCRBill } from "data/type"
import { NextPage } from "next"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import { BilledItemsContext, BilledPersonContext } from "utils/context"
import { onFinishFailed } from "utils/handler"
import { uuid } from "uuidv4"

const NewBillPage: NextPage = () => {
  const [form] = Form.useForm()
  const router = useRouter()

  const [stepState, setStepState] = useState<number>(2)

  const [bill, setBill] = useState<OCRBill>({
    id: uuid(),
    created_at: Date.now(),
    title: "",
    img: "",
    person: [
      {
        id: "7c2b3184-2cf4-4927-812c-064182bd4ba7",
        name: "Alya",
        amount: 0,
        is_paid: false,
      },
      {
        id: "7966ad99-f5dc-40a9-b4ea-455a6ac4d23b",
        name: "Abiel",
        amount: 0,
        is_paid: false,
      },
    ],
    items: [
      {
        id: 1,
        title: "Hot Ocha",
        qty: 2,
        price: 3_000,
      },
      {
        id: 2,
        title: "Spicy Salmon Head",
        qty: 1,
        price: 68_000,
      },
      {
        id: 3,
        title: "Unagi Yanagawa",
        qty: 1,
        price: 95_000,
      },
      {
        id: 4,
        title: "Gohan",
        qty: 1,
        price: 12_000,
      },
    ],
    fees: [
      {
        id: 1,
        price: 13_575,
      },
      {
        id: 2,
        price: 19_458,
      },
    ],
  })

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
    setBill((prevBill) => ({
      ...prevBill,
      title: form.getFieldValue("billName"),
      img: imageUrl,
    }))
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

  const [billedItems, setBilledItems] = useState<BilledItem[]>(bill.items)
  const [billedPerson, setBilledPerson] = useState<BilledPerson[]>(bill.person)

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

  useEffect(() => {
    if (billedItems) {
      setBill((prevBill) => ({ ...prevBill, items: billedItems }))
    }
  }, [billedItems])

  useEffect(() => {
    if (bill.person) {
      setBilledPerson(bill.person)
    }
  }, [bill.person])

  const handleChange = (value: string[]) => {
    const person: BilledPerson[] = value.map((item) => ({
      id: uuid(),
      name: item,
      amount: 0,
      is_paid: false,
    }))
    setBill((prevBill) => ({ ...prevBill, person: person }))
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
            <Form.Item
              label="Siapa saja yang akan ikut membayar urunan?"
              name="billedPerson"
              className="font-medium bg-transparent"
              rules={
                bill.person && bill.person.length === 0
                  ? [
                      {
                        required: true,
                        message:
                          "Mohon tulis siapa saja yang akan ikut membayar urunan",
                      },
                    ]
                  : undefined
              }
              required
            >
              <p className="text-[12px] opacity-50 -mt-[5px] mb-[5px]">
                Pisah nama dengan koma (,)
              </p>
              <Select
                mode="tags"
                value={bill.person.map(({ name }) => name)}
                style={{ width: "100%" }}
                tokenSeparators={[","]}
                onChange={handleChange}
              />
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
            {form.getFieldValue("billName") && (
              <h3 className="text-[18px] font-semibold">
                {form.getFieldValue("billName")}
              </h3>
            )}
            {bill.created_at && (
              <p className="text-[12px] opacity-50 -mt-[15px]">
                {new Date(bill.created_at).toLocaleDateString()}
              </p>
            )}
            <Form
              layout="vertical"
              className="flex flex-col h-full"
              form={form}
              onFinish={onFinishFirst}
              onFinishFailed={onFinishFailed}
            >
              <div className="flex gap-[10px] w-full mb-[10px] font-semibold">
                <p className="w-full">Nama</p>
                <p className="w-[200px] text-left">Harga</p>
                <p className="w-[100px] text-right">Qty</p>
                <p className="w-full text-right">Total</p>
              </div>
              <BilledItemsContext.Provider
                value={{
                  billedItems,
                  onChangeBilledItem,
                  deleteBilledItem,
                  addBilledItem,
                }}
              >
                <BilledPersonContext.Provider value={{ billedPerson }}>
                  <Form.Item
                    name="billedItems"
                    className="font-medium bg-transparent"
                    required
                  >
                    <BilledItems />
                  </Form.Item>
                </BilledPersonContext.Provider>
              </BilledItemsContext.Provider>
              <div className="flex flex-col gap-[10px] w-full -mt-[10px] mb-[40px]">
                <div className="flex gap-[10px] w-full justify-between">
                  <p className="w-full opacity-50">Total item</p>
                  <p className="w-full font-semibold font-mono text-right">
                    {billedItems
                      .map((item) => item.qty * item.price)
                      .reduce((total, num) => total + num)
                      .toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-[10px] w-full justify-between">
                  <p className="w-full opacity-50">
                    Biaya pajak & pelayanan resto
                  </p>
                  <p className="w-full text-right font-semibold font-mono">
                    {bill.fees
                      .map(({ price }) => price)
                      .reduce((total, num) => total + num)
                      .toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-[10px] w-full justify-between">
                  <p className="w-full opacity-50">Biaya layanan</p>
                  <p className="w-full text-right font-semibold font-mono">
                    {Number("1000").toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-[10px] w-full justify-between">
                  <p className="w-full font-semibold">Total semua</p>
                  <p className="w-full text-right font-semibold font-mono">
                    {(
                      billedItems
                        .map((item) => item.qty * item.price)
                        .reduce((total, num) => total + num) +
                      bill.fees
                        .map(({ price }) => price)
                        .reduce((total, num) => total + num) +
                      Number("2000")
                    ).toLocaleString()}
                  </p>
                </div>
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
