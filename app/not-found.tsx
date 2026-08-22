import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "./brand-icons";

export default function NotFound() {
  return (
    <main className="not-found">
      <a className="skip-link" href="#not-found-content">
        Перейти к содержанию
      </a>
      <div className="not-found-brand">
        <Image
          src="/brand/izi-panel-logo-primary.svg"
          alt="IZI PANEL"
          width={600}
          height={160}
          priority
        />
      </div>
      <section id="not-found-content" className="not-found-content" aria-labelledby="not-found-title">
        <p className="not-found-code" aria-hidden="true">404</p>
        <h1 id="not-found-title">Такой страницы нет.</h1>
        <p>Вернитесь на главную, чтобы посмотреть интерьерные решения и получить прайс.</p>
        <Link className="button button-dark" href="/">
          На главную <ArrowIcon direction="right" />
        </Link>
      </section>
      <p className="not-found-note">IZI PANEL · декоративные стеновые панели</p>
    </main>
  );
}
