import Link from "next/link";

export default function Nav() {
  return (
    <nav>
      <ul className="flex items-center justify-between p-8">
        <li>
          <Link href="/">
            <a className="text-blue-500 no-underline text-accent-1 dark:text-blue-300">
              Nextflix
            </a>
          </Link>
        </li>
        <ul className="flex items-center justify-between space-x-3">
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
