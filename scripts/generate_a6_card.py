from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance
from reportlab.graphics import renderPDF
from reportlab.graphics.barcode.qr import QrCodeWidget
from reportlab.graphics.shapes import Drawing, Group, Rect
from reportlab.lib.colors import Color, HexColor, white
from reportlab.lib.pagesizes import A6
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_PDF = ROOT / "output/pdf/open-village-a6-card.pdf"
OUTPUT_QR = ROOT / "output/qr/open-village-a6-qr.png"
TMP_HERO = ROOT / "tmp/pdfs/a6-hero.jpg"
HERO_SOURCE = ROOT / "public/catalog-interiors/open-village-hero-wood.webp"

QR_URL = (
    "https://izi-panel.netlify.app/"
    "?utm_source=open_village&utm_medium=qr"
    "&utm_campaign=open_village_2026&utm_content=a6_card#lead"
)

INK = HexColor("#151713")
PAPER = HexColor("#F2EFE8")
ACID = HexColor("#D9FF43")
MUTED = HexColor("#6A6C66")


def register_fonts():
    pdfmetrics.registerFont(TTFont("Arial", "/System/Library/Fonts/Supplemental/Arial.ttf"))
    pdfmetrics.registerFont(TTFont("Arial-Bold", "/System/Library/Fonts/Supplemental/Arial Bold.ttf"))


def prepare_hero():
    target_ratio = 105 / 73
    image = Image.open(HERO_SOURCE).convert("RGB")
    source_ratio = image.width / image.height
    if source_ratio > target_ratio:
        target_width = int(image.height * target_ratio)
        left = (image.width - target_width) // 2
        image = image.crop((left, 0, left + target_width, image.height))
    else:
        target_height = int(image.width / target_ratio)
        top = max(0, int((image.height - target_height) * 0.34))
        image = image.crop((0, top, image.width, top + target_height))
    image = ImageEnhance.Brightness(image).enhance(0.72)
    image = ImageEnhance.Contrast(image).enhance(1.05)
    image.save(TMP_HERO, quality=94, optimize=True)


def qr_drawing(size):
    widget = QrCodeWidget(QR_URL)
    widget.barLevel = "H"
    widget.barBorder = 4
    x1, y1, x2, y2 = widget.getBounds()
    width = x2 - x1
    height = y2 - y1
    drawing = Drawing(size, size)
    drawing.add(Rect(0, 0, size, size, fillColor=white, strokeColor=None))
    scale = size / max(width, height)
    group = Group(widget)
    group.transform = [scale, 0, 0, scale, -x1 * scale, -y1 * scale]
    drawing.add(group)
    return drawing


def generate_pdf():
    width, height = A6
    pdf = canvas.Canvas(str(OUTPUT_PDF), pagesize=A6)
    pdf.setTitle("Open Village - QR-карточка A6")
    pdf.setAuthor("FORM / PANEL")
    pdf.setSubject(QR_URL)

    pdf.setFillColor(PAPER)
    pdf.rect(0, 0, width, height, fill=1, stroke=0)

    hero_height = 73 * mm
    hero_y = height - hero_height
    pdf.drawImage(str(TMP_HERO), 0, hero_y, width=width, height=hero_height, mask="auto")

    pdf.setFillColor(INK)
    pdf.rect(0, height - 11 * mm, width, 11 * mm, fill=1, stroke=0)
    pdf.setFillColor(white)
    pdf.setFont("Arial-Bold", 7.5)
    pdf.drawString(8 * mm, height - 7 * mm, "F/P  FORM / PANEL")
    pdf.setFont("Arial-Bold", 6.5)
    pdf.drawRightString(width - 8 * mm, height - 7 * mm, "OPEN VILLAGE 2026")

    pdf.setFillColor(white)
    pdf.setFont("Arial-Bold", 22)
    pdf.drawString(8 * mm, height - 35 * mm, "ПАНЕЛИ,")
    pdf.drawString(8 * mm, height - 44 * mm, "КОТОРЫЕ ВИДНО.")
    pdf.setFont("Arial", 8.5)
    pdf.drawString(8 * mm, height - 52 * mm, "Для дома, отелей, ресторанов и общественных зон")

    pdf.setFillColor(ACID)
    pdf.rect(0, hero_y - 11 * mm, width, 11 * mm, fill=1, stroke=0)
    pdf.setFillColor(INK)
    pdf.setFont("Arial-Bold", 8)
    pdf.drawString(8 * mm, hero_y - 7 * mm, "ПРАЙС  ·  ПОДБОР  ·  РАСЧЁТ")
    pdf.drawRightString(width - 8 * mm, hero_y - 7 * mm, "СКИДКА ДО 50%*")

    qr_size = 42 * mm
    qr_x = 7 * mm
    qr_y = 8 * mm
    renderPDF.draw(qr_drawing(qr_size), pdf, qr_x, qr_y)

    text_x = 54 * mm
    pdf.setFillColor(INK)
    pdf.setFont("Arial-Bold", 13)
    pdf.drawString(text_x, 57 * mm, "Сканируйте QR")
    pdf.setFont("Arial", 8.5)
    pdf.drawString(text_x, 50 * mm, "3 коротких вопроса")
    pdf.drawString(text_x, 45 * mm, "и прайс откроется сразу.")

    pdf.setFillColor(INK)
    pdf.setFont("Arial-Bold", 8.5)
    pdf.drawString(text_x, 34 * mm, "Telegram")
    pdf.setFont("Arial", 11)
    pdf.drawString(text_x, 28.5 * mm, "@IZI_PANEL")

    pdf.setStrokeColor(Color(0.08, 0.09, 0.07, alpha=0.24))
    pdf.line(text_x, 22 * mm, width - 8 * mm, 22 * mm)
    pdf.setFillColor(MUTED)
    pdf.setFont("Arial", 5.8)
    pdf.drawString(text_x, 17.5 * mm, "izi-panel.netlify.app")
    pdf.drawString(text_x, 13.2 * mm, "* Условия скидки - по конкретной позиции.")

    pdf.showPage()
    pdf.save()


def generate_qr_png():
    widget = QrCodeWidget(QR_URL)
    widget.barLevel = "H"
    widget.qr.make()
    matrix = widget.qr.modules
    border = 4
    canvas_size = 1200
    modules = len(matrix) + border * 2
    module_size = canvas_size // modules
    qr_size = module_size * modules
    offset = (canvas_size - qr_size) // 2
    image = Image.new("RGB", (canvas_size, canvas_size), "white")
    draw = ImageDraw.Draw(image)
    for row_index, row in enumerate(matrix):
        for column_index, dark in enumerate(row):
            if dark:
                x = offset + (column_index + border) * module_size
                y = offset + (row_index + border) * module_size
                draw.rectangle((x, y, x + module_size - 1, y + module_size - 1), fill="black")
    image.save(OUTPUT_QR, dpi=(300, 300), optimize=True)


if __name__ == "__main__":
    register_fonts()
    prepare_hero()
    generate_pdf()
    generate_qr_png()
    print(OUTPUT_PDF)
    print(OUTPUT_QR)
    print(QR_URL)
