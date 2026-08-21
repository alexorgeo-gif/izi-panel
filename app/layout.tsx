import type { Metadata } from "next";
import "./globals.css";

const title = "IZI PANEL — декоративные панели в интерьере";
const description = "Декоративные стеновые панели, прайс и предварительный расчёт под ваш объект.";
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
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/brand/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/brand/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title,
    description,
    type: "website",
    url: "https://izipanel.ru/",
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
