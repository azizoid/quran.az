import '@/styles/global.css'

type RootLayoutProps = {
  children?: React.ReactNode
}

export const RootLayout = ({ children }: RootLayoutProps) => (
  <html lang="az">
    <body>
      {children}
    </body>
  </html>
)

export default RootLayout