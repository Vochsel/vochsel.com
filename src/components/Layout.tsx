import { Outlet } from 'react-router-dom'
import Header from './Header'

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <Outlet />
      </main>
      <footer className="border-t py-6 text-center text-gray-500 text-sm">
        <p>vochsel.com</p>
      </footer>
    </div>
  )
}
