let news = [];

const getLatesNews = async () => {
    const url = new URL(
        `https://creative-tartufo-aec936.netlify.app`
        );
    const response = await fetch(url);
    const data = await response.json();
    news = data.articles;
    console.log('news', news);
}

getLatesNews();