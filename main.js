const API_KEY = "28160b0d21ec4fe2b2356ab86fb65fe6";
const BASIC = "https://newsapi.org/v2/everything";
const SROTBY = "relavance";
const URL =
  "https://newsapi.org/v2/everything?q=Apple&sortBy=relavance&apiKey=28160b0d21ec4fe2b2356ab86fb65fe6";

const searchBtnNode = document.querySelector(".btn-search");
const resultNode = document.getElementById("result");

searchBtnNode.addEventListener("click", (e) => {
  const inputNode = document.getElementById("input");
  const keyword = inputNode.value;

  // ajax 통신
  const xhr = new XMLHttpRequest();
  xhr.open(
    "get",
    `${BASIC}?q=${keyword}&sortBy=${SROTBY}&searchIn=title&apiKey=${API_KEY}`,
    true
  );

  xhr.onprogress = function () {
    resultNode.textContent = "검색중입니다...";
  };

  xhr.onload = function () {
    const result = xhr.responseText;
    const resultObj = JSON.parse(result);
    const articles = resultObj.articles;
    console.log(articles);
    resultNode.innerHTML = "";
    articles.forEach((el) => {
      if (el.title !== "[Removed]" && el.author !== null) {
        const IndexOfKeyword = el.title
          .toLowerCase()
          .indexOf(keyword.toLowerCase());

        // 키워드 bold 처리
        resultNode.innerHTML += `<li><a href=${
          el.url
        }><article class="article"><h2 class="article-title">${el.title.slice(
          0,
          IndexOfKeyword
        )}<strong>${el.title.slice(
          IndexOfKeyword,
          IndexOfKeyword + keyword.length
        )}</strong>${el.title.slice(IndexOfKeyword + keyword.length)}</h2>
        <p class="article-meta"><span class="author">${
          el.author
        }</span><span class="createdAt">${el.publishedAt}<span></p>
        </article>
        <figure class="cover"><img src=${el.urlToImage} /></figure></a></li>`;
      }
    });
  };
  xhr.send();
});
