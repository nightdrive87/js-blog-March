"use strict";

const optArticleSelector = ".post",
  optTitleSelector = ".post-title",
  optTitleListSelector = ".titles",
  optArticleTagsSelector = ".post-tags .list",
  optActiveTagsLinks = ".post-tags .list a.active",
  optPostAuthorWrapperSelector = ".post-author";

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

// tags

function generateTags() {
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
      /* generate HTML of the link  <li><a href="#tag-costam">costam</a></li> */
      const tagLink = `<li><a href="#tag-${tag}">${tag}</a>&nbsp;</li>`;
      // poczytać o nbsp;
      /* add generated code to html variable */
      html += tagLink;
      /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.insertAdjacentHTML("beforeend", html);
  }
  /* END LOOP: for every article: */


  // TUTAJ ADD CLICK LISTENERS TO TAGS A Z DOLU WYWALIC
}

function tagClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute("href");
  console.log(href);
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
  console.log(activeTags);
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

  // użycie w addClickListenersToAuthorLinks
  // const authorLinks = document.querySelectorAll('a[data-author="${author}} "]');

  console.log(linkTags);
  // 'a.active[href^="#tag-"]'

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
  for (let article of allArticles) {
    const authorWrapper = article.querySelector(optPostAuthorWrapperSelector);
    const author = article.dataset.author;
    const authorLink = `<li><a href="#" data-author=${author}>${author}</a></li>`;
    authorWrapper.innerHTML = authorLink;
  }
}

function tagClickHandler(event) {}

function addClickListenersToAuthorLinks() {}


generateTitleLinks();
generateTags();
generateAuthors();
addClickListenersToTags();

// https://developer.mozilla.org/pl/docs/Web/JavaScript/Referencje/Obiekty/Array/map
// https://developer.mozilla.org/pl/docs/Web/JavaScript/Referencje/Obiekty/Array/forEach
