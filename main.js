let news = [];

const getLatesNews = async () => {
    const url = new URL(
        `http://times-node-env.eba-appvq3ef.ap-northeast-2.elasticbeanstalk.com/top-headlines`
        );
    const response = await fetch(url);
    const data = await response.json();
    news = data.articles;
    console.log('news', news);
}

getLatesNews();