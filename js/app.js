const form = document.getElementById('search-form');
const searchFiled = document.getElementById('search-keyword');
const responseContainer = document.getElementById('response-container');
let searchForText;

const articleRequest = new XMLHttpRequest();

form.addEventListener('submit', function(e){
  e.preventDefault();
  responseContainer.innerHTML = '';
  searchForText = searchFiled.value;
  getNews();
});

function getNews(){
  articleRequest.open('GET', `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchForText}&api-key=8f6d457603e4440587c864468d2e91dd`);
  articleRequest.onload = addNews;
  articleRequest.onerror = handleError;
  articleRequest.send();
}

function handleError(){
  console.log('se ha presentado un error');
}

function addNews(){
  if (articleRequest.status === 200  && articleRequest.readyState === 4) {
    const data = JSON.parse(this.responseText);
    const article = data.response.docs;
    for(let i = 0; i < article.length; i++) {
      let title = article[i].headline.main;
      let snippet = article[i].snippet;
      let image = article[i].multimedia[2].url

  
      let li = document.createElement('li');
      let img = document.createElement('img');
      li.className = 'articleClass';
      li.innerText = snippet;
      img.src = `https://www.nytimes.com/${image}`
      li.prepend(img);
      responseContainer.appendChild(li);
    }
  }
}
