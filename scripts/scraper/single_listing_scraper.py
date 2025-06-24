#!/user/bin/env python3

from tokenize import Single
import httpx
from bs4 import BeautifulSoup
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class SingleListingScraper:
    def __init__(self):
        self.session = None

    async def __aenter__(self):
        self.session = httpx.AsyncClient(
            headers={
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.9',
            },
            timeout=30,
            follow_redirects=True
        )
        return self
    
    async def __aexit__(self, exc_type, exc_val, exc_tb):
        if self.session:
            await self.session.aclose()
    
    async def scrape_listing(self, url: str):
        try:
            logger.info(f"Scraping: {url}")
            if self.session is None:
                raise RuntimeError("Session not initialized. Use async context manager.")
            import asyncio
            await asyncio.sleep(2)
            response = await self.session.get(url)
            response.raise_for_status()
            soup = BeautifulSoup(response.text, 'lxml')
            print(soup.prettify()[:1000])
            return soup
        except httpx.HTTPStatusError as e:
            logger.error(f"HTTP Error {e.response.status_code}: {e}")
            logger.error("Response headers:")
            for key, value in e.response.headers.items():
                logger.error(f"  {key}: {value}")
            return None
        except Exception as e:
            logger.error(f"Error scraping {url}: {e}")
            return None

async def main():
    listing_url = "https://www.domain.com.au/1-8-pilley-street-st-kilda-east-vic-3183-2020081940"
    async with SingleListingScraper() as scraper:
        result = await scraper.scrape_listing(listing_url)
        if result:
            print("Success")
        else:
            print("Fail")

if __name__ == "__main__":
    import asyncio
    asyncio.run(main())