import Page from "components/Page"
import { NextPage } from "next"

const NewBillPage: NextPage = () => (
  <Page title={{ secondary: "Buat baru" }}>
    <section className="w-full flex flex-col gap-[20px] h-full px-[12px]">
      <p>Nama tempat</p>
      <p>Unggah foto nota</p>
    </section>
  </Page>
)

export default NewBillPage
