import Link from "next/link";

export const Header = () => (
  <header className="bg-white shadow-sm p-4">
    <nav className="container mx-auto flex justify-between items-center">
      <h1 className="text-xl font-semibold text-teklif-600"><Link href={'/'}>Teklif.az</Link></h1>
      <ul className="flex space-x-6">
        <li>
          <Link href="/projects" className="text-gray-700 hover:text-teklif-600">
            Projects
          </Link>
        </li>
        <li>
          <a href="#" className="text-gray-700 hover:text-teklif-600">
            About
          </a>
        </li>
        <li>
          <a href="#" className="text-gray-700 hover:text-teklif-600">
            Contact
          </a>
        </li>
      </ul>
    </nav>
  </header>
)