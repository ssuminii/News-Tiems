let newsList = [];

const getLatesNews = async () => {
    const url = new URL(
        `https://creative-tartufo-aec936.netlify.app/top-headlines?`
        );
    const response = await fetch(url);
    const data = await response.json();
    newsList = data.articles;
    render();
    console.log('news', newsList);
}

const render = () => {
    const newsHTML = newsList.map(
      (news) => `<div class="row news">
      <div class="col-lg-4">
          <img class="news-img-size" src="${news.urlToImage}" alt="">
      </div>
      <div class="col-lg-8">
          <h2>${news.title}</h2>
          <p>${news.description}</p>
          <div>${news.source.name} * ${news.publishedAt}</div>
      </div>
  </div>`
    ).join('');

    document.getElementById("news-board").innerHTML = newsHTML;
};

getLatesNews();