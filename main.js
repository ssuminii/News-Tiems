let newsList = [];
let url = new URL(`https://creative-tartufo-aec936.netlify.app/top-headlines?`);

// 메뉴 버튼에 클릭 이벤트 주기
const menus = document.querySelectorAll('.menus button');
menus.forEach(menu => menu.addEventListener('click', (event) => getNewsByCategory(event)));

// 중복코드
// error handling
const getNews = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (response.status === 200) {
      if (data.articles.length === 0) {
        throw new Error('No result for this search');
      }
      newsList = data.articles;
      render();
    } else {
      throw new Error(data.message);
    }

  } catch(error) {
    errorRender(error.message);
  }
};

// 중복 코드
// const getNews = async () => {
//     const response = await fetch(url);
//     const data = await response.json();
//     newsList = data.articles;
//     render();
// }

// main news 가져오기
const getLatesNews = async () => {
    url = new URL(`https://creative-tartufo-aec936.netlify.app/top-headlines?`);
    getNews();
    console.log('news', newsList);
}

// 카테고리별 뉴스 가져오기
const getNewsByCategory = async (event) => {
    const category = event.target.textContent.toLowerCase();
    console.log('category', category);
    url = new URL(`https://creative-tartufo-aec936.netlify.app/top-headlines?category=${category}`);
    getNews();
}

// 키워드별 검색
const getNewsByKeyword = async () => {
    const keyword = document.getElementById('search-input').value;
    console.log('keyword', keyword);
    url = new URL(`https://creative-tartufo-aec936.netlify.app/top-headlines?q=${keyword}`);
    getNews();
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

// error message
const errorRender = (errorMessage) => {
  const errorHTML = `<div class="alert alert-danger" role="alert">
  ${errorMessage}
  </div>`;

  document.getElementById('news-board').innerHTML = errorHTML;
};

getLatesNews();

// side navigation
function openNav() {
  document.getElementById('mySidenav').style.width = '100%';
}

function closeNav() {
  document.getElementById('mySidenav').style.width = '0';
}

// search Button
const openSearchBox = () => {
    let inputArea = document.getElementById("input-area");
    if (inputArea.style.display === "inline") {
      inputArea.style.display = "none";
    } else {
      inputArea.style.display = "inline";
    }
  };
