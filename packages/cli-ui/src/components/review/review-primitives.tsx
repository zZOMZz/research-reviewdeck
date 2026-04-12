import { Button } from '../ui/button'

export function SummaryTile({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="rounded-2xl border border-stone-800 bg-stone-900/80 px-4 py-3">
      <p className="text-xs uppercase tracking-[0.24em] text-stone-500">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-stone-50">{value}</p>
    </div>
  )
}

export function MetaItem({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.24em] text-stone-500">{label}</p>
      <p className="mt-1 font-medium text-stone-800">{value}</p>
    </div>
  )
}

export function DecisionButton({
  active,
  label,
  onClick,
}: {
  active: boolean
  label: string
  onClick: () => void
}) {
  return (
    <Button
      className={active ? 'border-stone-900 bg-stone-900 text-stone-50 hover:bg-stone-800' : undefined}
      onClick={onClick}
      size="sm"
      type="button"
      variant="secondary"
    >
      {label}
    </Button>
  )
}

export function LineNumberCell({ value }: { value?: number }) {
  return (
    <div className="border-r border-stone-200 px-3 py-2 text-right text-xs text-stone-400">
      {value ?? ''}
    </div>
  )
}
