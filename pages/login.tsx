import Page from "components/Page"
import { Button, Form, Input, Radio } from "antd"
import { NextPage } from "next"
import { useRouter } from "next/router"

const LoginPage: NextPage = () => {
  const [form] = Form.useForm()
  const router = useRouter()
  return (
    <Page title="Masuk">
      <section className="h-full w-full flex flex-col items-center">
        <Form layout="vertical" form={form} className="w-full my-auto">
          <Form.Item label="Nomor Handphone" className="font-medium">
            <Input placeholder="08123456790" className="h-[36px]" />
          </Form.Item>
          <Form.Item>
            <Button
              onClick={() => router.push("/")}
              className="w-full bg-black text-white h-[48px] rounded-xl font-semibold hover:bg-black/90 border-none"
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
