"use strict";

const titleClickHandler = function(event) {
  console.log("event", event.target);

  /* remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll(".titles a.active");

  for (let activeLink of activeLinks) {
    activeLink.classList.remove("active");
  }
  /* add class 'active' to the clicked link */

  const clickedElement = this;

  console.log("🍕", clickedElement);

  clickedElement.classList.add("active");

  /* remove class 'active' from all articles */

  const posts = document.querySelectorAll(".post");
  console.log(posts);

  for (let post of posts) {
    post.classList.remove("active");
  }

  /* get 'href' attribute from the clicked link */

  const linkHref = clickedElement.getAttribute("href");

  console.log("⚠️ linkHref", linkHref);

  // #article-6
  // article-6

  // <a href="#article-6"></a>
  // <div id="article-6"></div>

  /* find the correct article using the selector (value of 'href' attribute) */
  const correctArticle = document.getElementById(linkHref.replace("#", ""));

  /* add class 'active' to the correct article */

  correctArticle.classList.add("active");
};

const links = document.querySelectorAll(".titles a");

for (let link of links) {
  link.addEventListener("click", titleClickHandler);
}

const posts = document.querySelectorAll(".post");

for (let post of posts) {
  const postId = post.id;
  const postTitle = post.querySelector(".post-title").innerHTML;
}
const optArticleSelector = ".post",
  optTitleSelector = ".post-title",
  optTitleListSelector = ".titles";

function generateTitleLinks() {
  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);

  titleList.innerHTML = "";

  /* for each article */

  /* get the article id */

  /* find the title element */

  /* get the title from the title element */

  /* create HTML of the link */

  /* insert link into titleList */
}

generateTitleLinks();
