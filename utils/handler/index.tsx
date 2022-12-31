import { message } from "antd"

export const onFinishFailed = (errorInfo: any) => {
  errorInfo.errorFields.map((errorField: any) =>
    errorField.errors.map((content: string) => {
      message.open({
        type: "error",
        content,
        duration: 5,
      })
    })
  )
}
