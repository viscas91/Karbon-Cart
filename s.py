import asyncio
import request

async def count_happy_scribe_occurrences():
    url = "https://www.happyscribe.com"

    try:
        response = requests.get(url)
        response.raise_for_status()  # Raise an HTTPError for bad responses
        html_content = response.text

        # Using a regular expression to find exact occurrences of "Happy Scribe"
        happy_scribe_count = html_content.count("Happy Scribe")

        print("Number of exact occurrences of 'Happy Scribe' in HTML:", happy_scribe_count)
    except requests.exceptions.RequestException as e:
        print("Error:", str(e))

# Run the async function
asyncio.run(count_happy_scribe_occurrences())
