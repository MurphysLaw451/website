import Link from 'next/link'

export function NavLink({ href, children, ...props }) {
  return (
    <Link
      href={href}
      className="inline-block rounded-lg py-1 px-2 text-sm text-slate-700 dark:text-slate-400 hover:bg-slate-100 hover:text-slate-900 dark:hover:text-slate-500 dark:hover:bg-slate-800"
      {...props}
    >
      {children}
    </Link>
  )
}
