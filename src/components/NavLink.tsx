import Link from 'next/link'

export function NavLink({ href, children, ...props }) {
  return (
    <Link
      href={href}
      className="border-b-2 border-transparent hover:border-degenOrange px-1 py-1 text-light-600"
      {...props}
    >
      {children}
    </Link>
  )
}
