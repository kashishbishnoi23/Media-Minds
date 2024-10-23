const apikey = 'fe387c23cb13460484b65754816b9c1d';  // Make sure to use a valid key
const gnews_apikey = '61a1dbbf80af0d9a728bb04f40a1337b';
const category = 'everything';  // Updated category to everything
import { doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";



import {db} from '../auth.js'
// import {collection, getFirestore, get}


/*
async function fetch_latest_news(){
    console.log("fetching data..")
    const url = 'https://newsapi.org/v2/everything?q=news&apiKey=fe387c23cb13460484b65754816b9c1d';
    const response = await fetch(url);
    // console.log("response = ", response)
    const data = await response.json();
    const articles = data.articles;
    // console.log(articles);

    return articles;

}
*/

/*
async function fetch_articles(){
    console.log("fetching data..")
    const url = 'https://newsapi.org/v2/everything?q=articles&apiKey=fe387c23cb13460484b65754816b9c1d';
    const response = await fetch(url);
    // console.log("response = ", response)
    const data = await response.json();
    const articles = data.articles;
    // console.log(articles);

    return articles;
}
    */

/*
async function storeDataInFirestore(){
   const latest_news  =  await fetch_latest_news();
   const articles = await fetch_articles();

// get the doc of latest_news:
   const latest_docRef = doc(db, 'HomePage', 'latest news')

  await setDoc(latest_docRef, {
    articles: latest_news
  })

   const articles_docRef = doc(db, 'HomePage', 'articles')
   await setDoc(articles_docRef, {
    articles: articles
  })
  

}
  */

// storeDataInFirestore();




export async function getLatest_news(){

   const latest_docRef = doc(db, 'HomePage', 'latest news');
   const latest_news_array = await getDoc(latest_docRef);
//    console.log("l " , latest_news_array);
   const data = latest_news_array.data();
//    console.log(data );

   return data;



}

export async function getArticles(){
   const articles_docRef = doc(db, 'HomePage', 'articles');
   const articles_array = await getDoc(articles_docRef);
   const data = articles_array.data();

   return data;

}


//  change the language:
const languageMenu = document.querySelector("#languages");
let selectedLanguage = 'en';

languageMenu.addEventListener('change', ()=>{
    selectedLanguage = languageMenu.value;
    updateContent();
})


async function updateContent(){
   const url1 = `https://newsapi.org/v2/everything?q=articles&language=${selectedLanguage}&apiKey=fe387c23cb13460484b65754816b9c1d`;
   console.log(url1);
    const response1 = await fetch(url1);
    // console.log("response = ", response)
    const data1 = await response1.json();
    const articles1 = data1.articles;


    // console.log(" l " , latest_news);

    document.querySelectorAll(".latest").forEach((item, index)=>{
    //    console.log("i = ", latest_news[index+1]);
    //    console.log(latest_news[index+1].urlToImage);
       let img = item.querySelector("img");
       let textContainer = item.querySelector(".title");
       console.log(index , textContainer);

       
       img.setAttribute('src', `${articles1[index+1].urlToImage}` ) 
       textContainer.innerHTML = `${articles1[index+1].title}`
       
       let description = item.querySelector(".description");
       if (description){
          description.innerHTML = `${articles1[index+1].content}`
       }
    })

     

    // console.log(articles);

    const url2 = `https://newsapi.org/v2/everything?q=articles&language=${selectedLanguage}&apiKey=fe387c23cb13460484b65754816b9c1d`;
    const response2 = await fetch(url2);
    // console.log("response = ", response)
    const data2 = await response2.json();
    const articles2 = data2.articles;

    document.querySelectorAll(".article").forEach((item, index)=>{
      // console.log("i = ", latest_news[index+1]);
      // console.log(latest_news[index+1].urlToImage);
      let img = item.querySelector("img");
      let textContainer = item.querySelector(".title");
      console.log(index , textContainer);
      
  
      img.setAttribute('src', `${articles2[index+20].urlToImage}` ) 
      textContainer.innerHTML = `${articles2[index+20].title}`



})
}




