import { LoadingOutlined, PlusOutlined } from "@ant-design/icons"
import { Button, Form, Input } from "antd"
import Page from "components/Page"
import { NextPage } from "next"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { onFinishFailed } from "utils/handler"

const NewBillPage: NextPage = () => {
  const [form] = Form.useForm()
  const router = useRouter()

  const [stepState, setStepState] = useState<number>(1)

  const onFinish = (values: any) => {
    console.log(values.billName)
  }

  const [imageLoading, setImageloading] = useState<boolean>(false)
  const [imageUrl, setImageUrl] = useState<string>()

  const uploadButton = (
    <div>
      {imageLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Unggah</div>
    </div>
  )

  const onChangeBillImage = (e: any) => {
    e.preventDefault()
    setImageloading(true)
  }

  useEffect(() => {
    if (imageLoading) {
      setTimeout(() => {
        setImageloading(false)
        setImageUrl("/nota.jpg")
      }, 2000)
    }
  }, [imageLoading])

  return (
    <Page title={{ secondary: "Buat baru" }}>
      <section className="w-full flex flex-col gap-[20px] h-full px-[12px]">
        {stepState == 1 && (
          <Form
            layout="vertical"
            className="flex flex-col h-full"
            form={form}
            onFinish={onFinish}
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
                <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
              ) : (
                <Button
                  onClick={onChangeBillImage}
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
              >
                Buat Urunan
              </Button>
            </Form.Item>
          </Form>
        )}
      </section>
    </Page>
  )
}

export default NewBillPage
