"use strict";

const optArticleSelector = ".post",
  optTitleSelector = ".post-title",
  optTitleListSelector = ".titles",
  optArticleTagsSelector = ".post-tags .list",
  optActiveTagsLinks = ".post-tags .list a.active",
  optPostAuthorWrapperSelector = ".post-author",
  optTagsListSelector = ".tags.list",
  optCloudClassCount = 5,
  optCloudClassPrefix = "tag-size",
  optAuthorsListSelector = ".list .authors";

// title links

function generateTitleLinks(customSelector = "") {
  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = "";

  /* for each article */
  const articles = document.querySelectorAll(
    optArticleSelector + customSelector
  );
  for (let article of articles) {
    /* get the article id */
    const articleId = article.id;

    /* find the title element */
    const title = article.querySelector(optTitleSelector);

    /* get the title from the title element */
    const titleContent = title.innerHTML;

    /* create HTML of the link */
    const linkHtml =
      '<li><a href="#' +
      articleId +
      '"><span>' +
      titleContent +
      "</span></a></li>";

    /* insert link into titleList */
    titleList.insertAdjacentHTML("beforeend", linkHtml);
  }

  addListenersToLinks();
}

const titleClickHandler = function (event) {
  /* remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll(".titles a.active");

  for (let activeLink of activeLinks) {
    activeLink.classList.remove("active");
  }

  /* add class 'active' to the clicked link */
  const clickedElement = this;
  clickedElement.classList.add("active");

  /* remove class 'active' from all articles */
  const posts = document.querySelectorAll(".post");
  for (let post of posts) {
    post.classList.remove("active");
  }

  /* get 'href' attribute from the clicked link */
  const linkHref = clickedElement.getAttribute("href");

  /* find the correct article using the selector (value of 'href' attribute) */
  const correctArticle = document.getElementById(linkHref.replace("#", ""));

  /* add class 'active' to the correct article */
  correctArticle.classList.add("active");
};

function addListenersToLinks() {
  const links = document.querySelectorAll(".titles a");

  for (let link of links) {
    link.addEventListener("click", titleClickHandler);
  }
}

function calculateTagClass(count,params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;

  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1 ) + 1);
  return classNumber;
}

// tags

function generateTags() {
  let allTags = {};
  /* find all articles */
  const allArticles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for (let article of allArticles) {
    /* find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    /* make html variable with empty string */
    let html = "";
    /* get tags from data-tags attribute */
    const articleTags = article.dataset.tags;
    /* split tags into array */
    let tagsArray = articleTags.split(" ");
    /* START LOOP: for each tag */
    for (let tag of tagsArray) {
      /* generate HTML of the link  */
      const tagLink = `<li><a href="#tag-${tag}">${tag}</a>&nbsp;</li>`;
      // poczytać o nbsp;
      /* add generated code to html variable */
      html += tagLink;

      if(!allTags[tag]){
        /* [NEW] add generated code to allTags array */
        allTags[tag] = 1
      } else {
        allTags[tag]++; //podnosi licznik o 1
      }
     
      /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.insertAdjacentHTML("beforeend", html);
  }
  /* END LOOP: for every article: */

  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector('.tags');

  /* [NEW] add html from allTags to tagList */
  // tagList.innerHTML = allTags.join(' ');
  function calculateTagsParams(tags) {
    const params = {
      min: 999999,
      max: 0,
      
    }
   
    for (let tag in tags) {
      if(tags[tag] > params.max){
        params.max = tags[tag]
        
      }
      if(tags[tag] < params.min){
        params.min = tags[tag]
        
      }
      
    }
    return params;

  }
  const tagsParams = calculateTagsParams(allTags);

  let allTagsHTML = '';
  for (let tag in allTags){ // <li><a href="#tag-cats" class="tag-size-5">cats (3)</a></li>
    allTagsHTML += '<span><a href="#tag-' + tag + '" class="tag-size-' + calculateTagClass(allTags[tag], tagsParams)+ '">' + tag + ' </a></span>'; //co to kurwa jest?!
    // allTagsHTML += tag + ' (' + allTags[tag] + ')'; // --> cats (3)      pobierasz wartość z kolekcji i wypluwa liczbę wystąpień
  }
  tagList.innerHTML = allTagsHTML;
  // TUTAJ ADD CLICK LISTENERS TO TAGS A Z DOLU WYWALIC
}

function tagClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute("href");
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace("#tag-", "");

  /* find all tag links with class active */
  const getActiveTagsLinks = document.querySelectorAll(optActiveTagsLinks);
  /* START LOOP: for each active tag link */
  for (let getActiveTagLink of getActiveTagsLinks) {
    /* remove class active */
    getActiveTagLink.classList.remove("active");
    /* END LOOP: for each active tag link */
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  const activeTags = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found tag link */
  for (let activeTag of activeTags) {
    /* add class active */
    activeTag.classList.add("active");
    /* END LOOP: for each found tag link */
  }

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  /* find all links to tags */
  const linkTags = document.querySelectorAll('a[href^="#tag-"]');

  /* START LOOP: for each link */
  for (let linkTag of linkTags) {
    /* add tagClickHandler as event listener for that link */
    linkTag.addEventListener("click", tagClickHandler);
  }
  /* END LOOP: for each link */
}

// authors

function generateAuthors() {
  const allArticles = document.querySelectorAll(optArticleSelector);

  let allAuthors = {};
  let allAuthorsHTML = '';
  for (let article of allArticles) {
    const authorWrapper = article.querySelector(optPostAuthorWrapperSelector);
    let html = "";
    const articleAuthors = article.querySelector(optAuthorsListSelector)
    let author = article.dataset.author;

    if(!allAuthors[author]){
      allAuthors[author] = 1
    } else {
      allAuthors[author]++;
    } 

    const authorLink = `<li><a href="#" data-author='${author}'>${author}</a></li>`;
  
    authorWrapper.innerHTML = authorLink;
    
  }
  for (let author in allAuthors){
    allAuthorsHTML += '<li><a href="#" data-author="' + author + '">' + author +  ' (' + allAuthors[author] + ')';
  }

  let authorList = document.querySelector('.authors');
  authorList.innerHTML = allAuthorsHTML;
}
//START Dodane 13-05-2020
function authorClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute("data-author");
  // console.log(href);

  generateTitleLinks('[data-author="' + href + '"]');
}

function addClickListenersToAuthorLinks() {
  const authorLinks = document.querySelectorAll('a[data-author]');
  for(let authorLink of authorLinks) {
    authorLink.addEventListener("click", authorClickHandler);
  }

}

//KONIEC 13-05-2020


generateTitleLinks();
generateTags();
generateAuthors();
addClickListenersToTags(); // DODANE 13-05-2020
addClickListenersToAuthorLinks(); // DODANE 13-05-2020
// https://developer.mozilla.org/pl/docs/Web/JavaScript/Referencje/Obiekty/Array/map
// https://developer.mozilla.org/pl/docs/Web/JavaScript/Referencje/Obiekty/Array/forEach
