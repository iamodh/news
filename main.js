const API_KEY = "28160b0d21ec4fe2b2356ab86fb65fe6";
const BASIC = "https://newsapi.org/v2/everything";
const SROTBY = "relavance";
const URL =
  "https://newsapi.org/v2/everything?q=Apple&sortBy=relavance&apiKey=28160b0d21ec4fe2b2356ab86fb65fe6";

const searchBtnNode = document.querySelector(".btn-search");
const resultNode = document.getElementById("result");

searchBtnNode.addEventListener("click", () => {
  // ajax 통신
  const xhr = new XMLHttpRequest();
  xhr.open(
    "get",
    "https://newsapi.org/v2/everything?q=Apple&sortBy=relavance&apiKey=28160b0d21ec4fe2b2356ab86fb65fe6",
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
      if (el.title !== "[Removed]")
        resultNode.innerHTML += `<p>${el.title}</p>`;
    });
  };
  xhr.send();
});
