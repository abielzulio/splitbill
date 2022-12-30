import { Button, Form, Input } from "antd"
import Page from "components/Page"
import { NextPage } from "next"
import { useRouter } from "next/router"

const LoginPage: NextPage = () => {
  const [form] = Form.useForm()
  const router = useRouter()
  return (
    <Page title="Masuk">
      <section className="h-full w-full flex flex-col items-center px-[12px]">
        <Form layout="vertical" form={form} className="w-full my-auto">
          <Form.Item
            label="Nomor Handphone"
            className="font-medium bg-transparent"
          >
            <Input placeholder="08123456790" className="h-[36px] bg-white" />
          </Form.Item>
          <Form.Item className="text-white">
            <Button
              type="default"
              onClick={() => router.push("/")}
              className="w-full h-[48px] rounded-xl font-semibold"
            >
              Log-in
            </Button>
          </Form.Item>
        </Form>
      </section>
    </Page>
  )
}

export default LoginPage
