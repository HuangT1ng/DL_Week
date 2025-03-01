from googlesearch import search

def search_top_k_sources(title, k):
    link=[]
    query = title
    top_k_results = search(query, tld="com", num=k, stop=k, pause=2)
    for i in top_k_results:
        # print(i)
        link.append(i)
    return link

def get_website_text_content(url):
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3"
    }
    try:
        response = requests.get(url, headers=headers, timeout=10)
        
        if response.status_code == 200:
            html_parse = BeautifulSoup(response.text, 'html.parser') 
            paragraphs = [para.get_text() for para in html_parse.find_all("p")]
            content = "\n\n".join(paragraphs)
            return content
        else:
            print(f"Error: Received status code {response.status_code} from {url}")
            return None
    
    except requests.exceptions.RequestException as e:
        print(f"An error occurred: {e}")
        return None
    
def filter_valid_sources(urls, min_word_count=50):
    if(urls == None):
        return 'no valid articles found'
    for url in urls:
        content = get_website_text_content(url)
        if(content == None):
            continue
        word_count = len(content.split())
        if word_count >= min_word_count:
            return content
    return 'no valid articles found'

def prompt(search_query, trusted_source):
    prompt = f"""
Please examine the following text:
{search_query}

Then compare it with this trusted source:
{trusted_source}

Based on your analysis, produce exactly 3 items in a JSON array. Each item must follow this structure:

[
    {{
        "text": "string",
        "reason": "string",
        "authenticity": "string"
    }}
]
"""
    return prompt

def break_into_sentences(article):
    sentences = sent_tokenize(article)
    return sentences

def api_init():
    client = Groq(
        api_key='',
    )
    return client

def cross_validation_with_LLM(sentences, trusted_source, client, prompt):
    analysis_result = []
    for search_query in sentences:
        messages = [
        {
            "role": "system",
            "content": "you are a helpful assistant that checks the authenticity of a sentence"
        },
        {
            "role": "user",
            "content": prompt(search_query, trusted_source), 
        }
        
        ]

        chat_completion = client.chat.completions.create(
            messages=messages,
            model="llama-3.1-70b-versatile",
        )
        print(chat_completion.choices[0].message.content)
        analysis_result.append(chat_completion.choices[0].message.content)
    return analysis_result

def index_of_false_sentences(list):
    index = []
    for i in list:
        if(i == 'false'):
            index.append(i)
    return index

