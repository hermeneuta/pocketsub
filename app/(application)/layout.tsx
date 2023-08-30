export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <aside>Side Nav</aside>
      <main>{children}</main>
    </div>
  )
}
