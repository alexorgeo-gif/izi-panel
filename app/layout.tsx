import type { Metadata } from "next";
import "./globals.css";

const canonicalUrl = "https://izipanel.ru/";
const title = "Декоративные стеновые панели IZI PANEL — каталог и расчёт";
const description =
  "Декоративные стеновые панели под дерево, камень, ткань и металл. Подбор решения для квартиры, дома и коммерческого интерьера. Получить прайс и расчёт.";
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "IZI PANEL",
  alternateName: "Изи Панель",
  url: canonicalUrl,
};
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "IZI PANEL",
  url: canonicalUrl,
  logo: "https://izipanel.ru/brand/izi-panel-app-icon-512.png",
  email: "Izipanelorder@gmail.com",
  sameAs: ["https://t.me/IZI_PANEL"],
};
const designContract = `
THESIS: material is shown as part of a resolved interior, not as an isolated sample.
OWN-WORLD: warm beige architectural environment, Commissioner, full-bleed imagery, restrained rhythm.
STORY: interior, four spatial scenarios, surface directions, combination rules, lead form.
FIRST VIEWPORT: full-screen interior, IZI PANEL mark, one proposition, two actions.
FORM: owner-pinned Brand System 1; seed key owner-approved-izi-panel-a-20260820.
FINISH: ready for staging; production held for privacy and end-to-end gates.
`;

export const metadata: Metadata = {
  metadataBase: new URL("https://izipanel.ru"),
  title,
  description,
  applicationName: "IZI PANEL",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-izi-v2.svg", type: "image/svg+xml" },
      { url: "/brand/favicon-izi-v2-32.png", sizes: "32x32", type: "image/png" },
      { url: "/brand/favicon-izi-v2-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/brand/izi-panel-touch-v2.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title,
    description,
    type: "website",
    url: canonicalUrl,
    siteName: "IZI PANEL",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: title }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <head>
        <link rel="canonical" href={canonicalUrl} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body>
        <template
          data-design-contract="owner-approved-izi-panel-a-20260820"
          dangerouslySetInnerHTML={{ __html: designContract }}
        />
        {children}
      </body>
    </html>
  );
}
