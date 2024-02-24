let newsList = [];
let url = new URL(`https://creative-tartufo-aec936.netlify.app/top-headlines?`);

// pagination
let totalResults = 0;
let page = 1;
const pageSize = 10;
const groupSize = 5;

// 메뉴 버튼에 클릭 이벤트 주기
const menus = document.querySelectorAll('.menus button');
menus.forEach(menu => menu.addEventListener('click', (event) => getNewsByCategory(event)));

// 중복코드
// error handling
const getNews = async () => {
  try {
    // &page = page
    url.searchParams.set('page', page);
    url.searchParams.set('pageSize', pageSize);

    const response = await fetch(url);

    const data = await response.json();

    if (response.status === 200) {
      if (data.articles.length === 0) {
        throw new Error('No result for this search');
      }
      newsList = data.articles;
      totalResults = data.totalResults;
      render();
      paginationRender();
    } else {
      throw new Error(data.message);
    }

  } catch(error) {
    errorRender(error.message);
  }
};

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

// pagination
const paginationRender = () => {
  // totalResults, page, pageSize, groupSize
  
  // totalPage
  const totalPage = Math.ceil(totalResults / pageSize);

  // pageGroup
  const pageGroup = Math.ceil(page / groupSize);

  // lastPage
  const lastPage = pageGroup * groupSize;
  // lastPage < groupSize -> lastpage = totalpage
  if (lastPage > totalPage) {
    lastPage = totalPage;
  } 

  // firstPage
  const firstPage = (lastPage - (groupSize - 1)) <= 0 ? 1 : (lastPage - (groupSize - 1));

  let paginationHTML = `<li class="page-item ${page===1?'disabled':''}" onclick="moveToPage(${page-1})"><a class="page-link" href="#">Previous</a></li>`;

  for(let i = firstPage; i <= lastPage; i++) {
    paginationHTML += `<li class="page-item ${i===page?'active':''}" onclick="moveToPage(${i})"><a class="page-link">${i}</a></li>`
  }
  paginationHTML += `<li class="page-item" onclick="moveToPage(${page+1})"><a class="page-link" href="#">Next</a></li>`;

  document.querySelector(".pagination").innerHTML = paginationHTML;
};

// pageNum = ${i}
const moveToPage = (pageNum) => {
  console.log('move to page', pageNum);
  page = pageNum;
  getNews();
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
