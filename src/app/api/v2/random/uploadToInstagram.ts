import fs from 'fs'
import { IgApiClient } from 'instagram-private-api'

export async function uploadToInstagram(imagePath: string, caption: string) {
  const ig = new IgApiClient()

  const accessToken = 'YOUR_ACCESS_TOKEN'
  ig.state.generateDevice('mojkuran')
  ;(async () => {
    await ig.simulate.preLoginFlow()
    const loggedInUser = await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD)

    process.nextTick(async () => await ig.simulate.postLoginFlow())

    const userFeed = ig.feed.user(loggedInUser.pk)
    const myPostsFirstPage = await userFeed.items()

    const myPostsSecondPage = await userFeed.items()
    await ig.publish.photo({})
  })()

  // await ig.account.loginWithToken(accessToken);

  // Upload photo
  const publishResult = await ig.publish.photo({
    file: await fs.promises.readFile(imagePath),
    caption: caption,
  })

  console.log('Image uploaded to Instagram:', publishResult)
}
