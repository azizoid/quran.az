import { Card } from "../../ui/Card/Card"

export const FacebookPage = (): JSX.Element => (
  <Card title="BİZİ BƏYƏN" className={"px-0 py-0"}>
    <div id="fb-root"></div>
    <script
      async
      defer
      crossOrigin="anonymous"
      src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v12.0&appId=10177953140&autoLogAppEvents=1"
      nonce="sv0YGg36"
    ></script>
    <div
      className="fb-page object-fill w-full"
      data-href="https://www.facebook.com/quranaz/"
      data-tabs=""
      data-width=""
      data-height=""
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
        <a href="https://www.facebook.com/quranaz/">quran.az</a>
      </blockquote>
    </div>
  </Card>
)

export default FacebookPage
