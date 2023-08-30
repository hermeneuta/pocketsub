export default function ApplicationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <aside>
        Side nav </aside>
      <main>{children}</main>
    </div>
  )
}
