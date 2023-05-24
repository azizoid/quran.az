import { Card } from '@/ui'

export const FacebookPage = (): JSX.Element => (
  <Card title="BİZİ BƏYƏN" titleClassName="px-7">
    <div className="flex justify-center">
      <iframe
        src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fquranaz%2F&tabs&width=340&height=130&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=10177953140"
        width="340"
        height="130"
        style={{ border: 'none', overflow: 'hidden' }}
        scrolling="no"
        frameBorder="0"
        allowFullScreen={true}
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
      />
    </div>
  </Card>
)
