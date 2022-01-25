import { Card } from "../../ui/Card/Card"

export const FacebookPage = (): JSX.Element => (
  <Card title="BİZİ BƏYƏN" className={"px-0 py-0"}>
    <div
      className="fb-page object-fill w-full"
      data-href="https://www.facebook.com/quranaz/"
      data-width="500"
      data-small-header="false"
      data-adapt-container-width="true"
      data-hide-cover="false"
      data-show-facepile="true"
      data-lazy="true"
    >
      <blockquote
        cite="https://www.facebook.com/quranaz/"
        className="fb-xfbml-parse-ignore"
      >
        <a href="https://www.facebook.com/quranaz/">Quran.az</a>
      </blockquote>
    </div>
  </Card>
)

export default FacebookPage
