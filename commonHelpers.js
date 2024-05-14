import{a as m,S as p,i as y}from"./assets/vendor-09d7c26e.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function s(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerPolicy&&(n.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?n.credentials="include":t.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(t){if(t.ep)return;t.ep=!0;const n=s(t);fetch(t.href,n)}})();const f="https://pixabay.com/api/",h="43780784-35e4285ec8f2021d0fe97b31d";async function g(e,o=1){try{return(await m.get(f,{params:{key:h,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:o,per_page:15}})).data}catch(s){return console.error("Error fetching images:",s),[]}}const u=new p(".gallery-item a");function w(){const e=document.querySelector(".gallery");e&&(e.innerHTML="")}function L(e){const o=document.querySelector(".gallery"),s=e.map(r=>`<li class ='gallery-item'>
    <a href="${r.largeImageURL}" class="gallery-link">
      <img class ="gallery-img" src="${r.webformatURL}" alt="${r.tags}" />
      <div class="image-info">
        <span>Likes: ${r.likes}</span>
        <span>Views: ${r.views}</span>
        <span>Comments: ${r.comments}</span>
        <span>Downloads: ${r.downloads}</span>
      </div>
  </a>
</li>`).join("");o.insertAdjacentHTML("beforeend",s),u.refresh()}function b(){const e=document.querySelector(".loader");e&&(e.style.display="block")}function v(){const e=document.querySelector(".loader");e&&(e.style.display="none")}function i(e){y.error({title:"Error",message:e,position:"topRight"})}function S(){u.on("show.simplelightbox",function(e){const o=e.currentImage;if(o){const{likes:s,views:r,comments:t,downloads:n}=o,a=`
        <div>
          <span>Likes: ${s}</span>
          <span>Views: ${r}</span>
          <span>Comments: ${t}</span>
          <span>Downloads: ${n}</span>
        </div>
      `;this.$caption.html(a)}})}let c=1,l="";document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".form"),o=document.getElementById("gallery"),s=document.querySelector(".load-more-btn");e.addEventListener("submit",async r=>{if(r.preventDefault(),l=o.value.trim(),!l){i("Please enter a search query.");return}w(),c=1,await d()}),s.addEventListener("click",async()=>{c++,await d(),s.style.display="none",setTimeout(()=>{s.style.display="block"},500)})});async function d(){try{b();const e=await g(l,c);if(v(),e.hits.length===0){i("Sorry, there are no images matching your search query. Please try again!");return}L(e.hits);const o=document.querySelector(".load-more-btn");e.totalHits<=c*15?(o.style.display="none",i("We're sorry, but you've reached the end of search results.")):o.style.display="block",S(),I()}catch{i("Failed to fetch images. Please try again later.")}}function I(){window.scrollBy({top:window.innerHeight*2,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
