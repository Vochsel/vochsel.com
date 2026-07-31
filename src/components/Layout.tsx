import { Outlet } from 'react-router-dom'
import Header from './Header'

export default function Layout() {
  return (
    <div className="site-shell min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto max-w-4xl px-4 py-5">
        <Outlet />
      </main>
    </div>
  )
}
