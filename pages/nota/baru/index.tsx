import { LoadingOutlined, PlusOutlined } from "@ant-design/icons"
import { Button, Form, Input } from "antd"
import Page from "components/Page"
import { NextPage } from "next"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { onFinishFailed } from "utils/handler"

interface BilledItem {
  id: number
  title: string
  qty: number
  price: number
}

const BilledItem = ({ item }: { item: BilledItem }) => {
  const [state, changeState] = useState({
    title: item.title,
    qty: item.qty,
    price: item.price,
  })

  const onChangeTitle = (e: any) => {
    changeState((state) => ({
      ...state,
      title: e.target.value,
    }))
  }

  const onChangeQty = (e: any) => {
    changeState((state) => ({
      ...state,
      qty: e.target.value,
    }))
  }

  const onChangePrice = (e: any) => {
    changeState((state) => ({
      ...state,
      price: e.target.value,
    }))
  }

  return (
    <Input.Group className="grid grid-cols-8 gap-[10px] w-full" key={item.id}>
      <Input
        defaultValue={state.title}
        value={state.title}
        className="w-full col-span-3 rounded-md"
        onChange={onChangeTitle}
      />
      <Input
        defaultValue={state.qty}
        value={state.qty}
        className="col-span-1 rounded-md"
        onChange={onChangeQty}
      />
      <Input
        defaultValue={state.price}
        value={state.price}
        className="col-span-2 rounded-md"
        onChange={onChangePrice}
      />
      <p className="col-span-2 rounded-md">{state.price * state.qty}</p>
    </Input.Group>
  )
}

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
  }, [imageUrl])

  const ITEMS_BILL = {
    id: "90ec2b5d-acbd-464b-b2c6-0c54760d577c",
    title: "Sushi Tei",
    created_at: Date.now(),
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
          <Form
            layout="vertical"
            className="flex flex-col h-full"
            form={form}
            onFinish={onFinishFirst}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Item Pesanan"
              name="billedItems"
              className="font-medium bg-transparent"
              /*               rules={[
                { required: true, message: "Mohon tulis nama nota Anda" },
              ]} */
              required
            >
              {ITEMS_BILL.items.map((item) => (
                <BilledItem item={item} />
              ))}

              {/*               <Input
                placeholder="Waroeng Steak, Sushi Tei"
                className="h-[36px] bg-white"
              /> */}
            </Form.Item>
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
        )}
      </section>
    </Page>
  )
}

export default NewBillPage
