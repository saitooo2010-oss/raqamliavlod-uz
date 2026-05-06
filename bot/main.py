import asyncio
import logging
import os
import re
import uuid
from io import BytesIO

import aiohttp
from aiogram import Bot, Dispatcher
from aiogram.types import Message

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

BOT_TOKEN = os.environ["BOT_TOKEN"]
CHANNEL_ID = int(os.environ["CHANNEL_ID"])
BACKEND_URL = os.environ["BACKEND_URL"]
BOT_SECRET = os.environ["BOT_SECRET"]

bot = Bot(token=BOT_TOKEN)
dp = Dispatcher()


def extract_title(text: str | None) -> str:
    if not text:
        return "Yangilik"
    first_line = text.strip().split("\n")[0]
    return first_line[:100].strip() or "Yangilik"
import time

processed_media_groups: dict[str, float] = {}  # id -> timestamp

def is_duplicate_group(group_id: str) -> bool:
    now = time.time()
    # 10 sekunddan eski yozuvlarni tozalash
    expired = [k for k, v in processed_media_groups.items() if now - v > 10]
    for k in expired:
        del processed_media_groups[k]
    
    if group_id in processed_media_groups:
        return True
    processed_media_groups[group_id] = now
    return False

# Handler da:


def make_slug(title: str) -> str:
    slug = title.lower()
    slug = re.sub(r"[^a-z0-9\s-]", "", slug)
    slug = re.sub(r"\s+", "-", slug.strip())
    slug = re.sub(r"-+", "-", slug)
    short = slug[:60].rstrip("-")
    unique = str(uuid.uuid4())[:8]
    return f"{short}-{unique}" if short else unique


async def download_file(file_id: str) -> tuple[bytes, str]:
    file = await bot.get_file(file_id)
    file_path = file.file_path
    ext = file_path.rsplit(".", 1)[-1] if "." in file_path else "jpg"
    url = f"https://api.telegram.org/file/bot{BOT_TOKEN}/{file_path}"
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as resp:
            data = await resp.read()
    return data, ext


async def send_to_backend(title, slug, source, image_bytes, image_ext="jpg"):
    url = f"{BACKEND_URL}/news/create-from-bot"
    logger.info("Backend ga yuborilmoqda: %s", url)

    form = aiohttp.FormData()
    form.add_field("title", title)
    form.add_field("slug", slug)
    form.add_field("source", source)
    form.add_field("secret", BOT_SECRET)

    if image_bytes:
        form.add_field(
            "thumbnail",
            BytesIO(image_bytes),
            filename=f"thumbnail.{image_ext}",
            content_type=f"image/{image_ext}",
        )

    try:
        async with aiohttp.ClientSession() as session:
            async with session.post(url, data=form) as resp:
                text = await resp.text()
                logger.info("Backend javob: %s — %s", resp.status, text)
    except Exception as e:
        logger.error("Backend ga ulanishda xato: %s", e)

processed_media_groups: set[str] = set()

@dp.channel_post()
async def handle_channel_post(message: Message):
    logger.info("Post keldi! Chat ID: %s", message.chat.id)
    if message.chat.id != CHANNEL_ID:
        logger.warning("Noto'g'ri kanal: %s", message.chat.id)
        return

    # Media group tekshiruvi — duplicate bo'lsa o'tkazib yuborish
    if message.media_group_id:
        if message.media_group_id in processed_media_groups:
            logger.info("Media group allaqachon ishlandi: %s", message.media_group_id)
            return
        processed_media_groups.add(message.media_group_id)

    # Qolgan kod o'zgarishsiz...
    image_bytes: bytes | None = None
    image_ext = "jpg"
    caption_or_text = message.caption or message.text or ""
    title = extract_title(caption_or_text)
    slug = make_slug(title)


    chat = message.chat
    if chat.username:
        source = f"https://t.me/{chat.username}/{message.message_id}"
    else:
        cid = str(chat.id).replace("-100", "")
        source = f"https://t.me/c/{cid}/{message.message_id}"

    if message.photo:
        photo = message.photo[-1]
        image_bytes, image_ext = await download_file(photo.file_id)
    elif message.video and message.video.thumbnail:
        image_bytes, image_ext = await download_file(message.video.thumbnail.file_id)
    elif message.document and message.document.thumbnail:
        image_bytes, image_ext = await download_file(message.document.thumbnail.file_id)

    if not caption_or_text and image_bytes is None:
        logger.info("Matn ham, rasm ham yo'q — o'tkazib yuborildi")
        return

    await send_to_backend(title, slug, source, image_bytes, image_ext)
    if message.media_group_id and is_duplicate_group(message.media_group_id):
        logger.info("Media group allaqachon ishlandi: %s", message.media_group_id)
        return

async def main():
    logger.info("Bot ishga tushdi...")
    await dp.start_polling(bot, allowed_updates=["channel_post"])


if __name__ == "__main__":
    asyncio.run(main())