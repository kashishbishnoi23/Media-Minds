let latest = Array.from(document.querySelectorAll(".latest"));

let article = Array.from(document.querySelectorAll(".article"));
console.log(article);


import { all_news_array } from "../Health/source.js";
import {getLatest_news} from "./api.js";
import {getArticles} from "./api.js"

let latest_news;
let articles;




getLatest_news().then((response)=>{
    latest_news = response.articles;
    latest_news.forEach((item)=>{
      console.log("l = ", item);
      all_news_array.push(item);

    })

    

    latest.forEach((item, index)=>{
 
       let img = item.querySelector("img");
       let textContainer = item.querySelector(".title");
       let title = latest_news[index+1].title;
       
       console.log(title)

       console.log(index , textContainer);

       
       img.setAttribute('src', `${latest_news[index+1].urlToImage}` ) 
       textContainer.innerHTML = `${latest_news[index+1].title}`
       latest[index].querySelector(".title").setAttribute('href', `content.html?title=${title}`)
       
       let description = item.querySelector(".description");
       if (description){
          description.innerHTML = `${latest_news[index+1].content}`
       }


    })
    


})


getArticles().then((response)=>{
   articles = response.articles;

   articles.forEach((item)=>{
       all_news_array.push(item);
    })


// console.log("article = ", article);

//    console.log("A" , articles);
   
   article.forEach((item, index)=>{
    // console.log("i = ", latest_news[index+1]);
    // console.log(latest_news[index+1].urlToImage);
    let img = item.querySelector("img");
    let textContainer = item.querySelector(".title");
    console.log(index , textContainer);
    let title = articles[index].title;
   
    img.setAttribute('src', `${articles[index+20].urlToImage}` ) 
    textContainer.innerHTML = `${articles[index+20].title}`
    article[index].querySelector(".title").setAttribute('href', `content.html?title=${title}`)


    
   


 })

})








