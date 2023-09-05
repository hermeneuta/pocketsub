interface AppContentHeaderProps {
  title: string;
}

export default async function AppContentHeader({ title }: AppContentHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <div className="flex items-center gap-4">
        <button className="rounded-md border-2 border-zinc-500 bg-zinc-100 px-4 py-1 text-sm text-zinc-500">
          command palette ⌘+k
        </button>
        <button className="rounded-md border-2 border-zinc-500 bg-zinc-100 px-4 py-1 text-sm text-zinc-500">
          export CSV
        </button>
      </div>
    </div>
  )

}
