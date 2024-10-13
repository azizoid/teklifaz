import Link from "next/link";

export const Header = () => (
  <header className="bg-blue-500 text-white shadow-md">
    <nav className="container mx-auto p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold"><Link href={'/'}>Teklif.az</Link></h1>
      <ul className="flex space-x-6">
        <li>
          <Link href="/projects" className="hover:text-gray-300">
            Projects
          </Link>
        </li>
        <li>
          <a href="#" className="hover:text-gray-300">
            About
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-gray-300">
            Contact
          </a>
        </li>
      </ul>
    </nav>
  </header>
)