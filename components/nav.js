import Link from "next/link";

export default function Nav() {
  return (
    <nav>
      <ul className="container flex items-center justify-between p-8">
        <li>
          <Link href="/">
            <a className="text-red-700 no-underline">
              Nextflix
            </a>
          </Link>
        </li>
        <ul className="flex items-center justify-between space-x-2">
          <li>
            <Link href="/profile">
              <a className="no-underline btn-blue">Conta</a>
            </Link>
            <Link href="/search">
              <a className="no-underline btn-blue">Procurar</a>
            </Link>
          </li>
        </ul>
      </ul>
    </nav>
  );
}
