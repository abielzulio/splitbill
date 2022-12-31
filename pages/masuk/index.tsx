import { Button, Form, Input } from "antd"
import Page from "components/Page"
import { NextPage } from "next"
import { useRouter } from "next/router"
import { onFinishFailed } from "utils/handler"

const LoginPage: NextPage = () => {
  const [form] = Form.useForm()
  const router = useRouter()

  const onFinish = (value: any) => {
    value.phoneNumber && router.push("/")
  }
  return (
    <Page title={{ primary: "Masuk" }}>
      <section className="h-full w-full flex flex-col items-center px-[12px]">
        <Form
          layout="vertical"
          form={form}
          className="w-full flex flex-col h-full"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Nomor Handphone"
            className="font-medium bg-transparent my-auto"
            required
            name="phoneNumber"
            rules={[
              {
                required: true,
                message: "Mohon masukkan nomor handphone Anda",
              },
            ]}
          >
            <Input placeholder="08123456790" className="h-[36px] bg-white" />
          </Form.Item>
          <Form.Item className="text-white mt-auto">
            <Button
              type="primary"
              htmlType="submit"
              className="w-full h-[48px] rounded-xl font-semibold"
            >
              Masuk
            </Button>
          </Form.Item>
        </Form>
      </section>
    </Page>
  )
}

export default LoginPage
