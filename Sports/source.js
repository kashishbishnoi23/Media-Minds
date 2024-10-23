
import { fetch_popular_news, fetch_top_news, fetch_latest_news, fetch_related_news } from './api.js'


// localStorage.clear();
const top_news_array = await fetch_top_news();

const latest_news_array = await fetch_latest_news();

const popular_news_array = await fetch_popular_news();
// console.log(latest_news_array);

const related_news_array = await fetch_related_news();

export const all_news_array = [...top_news_array, ...latest_news_array, ...popular_news_array, ...related_news_array];




let breaking_news = Array.from(document.querySelectorAll(".breaking_news"));
let a = 0;
let top_fetched = false;
top_news_array.forEach((item) => {
    const title = item.title;


    const description = item.description;

    const content = item.content;

    const image = item.image;

    if (image != null) {
        if (a < breaking_news.length) {
            breaking_news[a].querySelector('img').src = image;
            breaking_news[a].querySelector(".title").innerHTML = title;
            breaking_news[a].querySelector(".title").setAttribute('href', `content.html?title=${title}`)
            if (breaking_news[a].querySelector(".description")) {
                breaking_news[a].querySelector(".description").innerHTML = description;

            }
        }
        a++;
    }

    // let left = document.querySelector(".left_breaking");
    // let right = document.querySelectorAll(".right_breaking");
    
    // if (a == breaking_news.length) {
    //     console.log('hello');
        
    //     // Add the slide-left animation to the left section
    //     left.classList.add('animate-slideInLeft');
    //     left.classList.remove('opacity-0');
    
    //     // Add staggered animations to the right sections
    //     right.forEach((item, index) => {
    //         // Correct class name: animate-slideInRight{index+1}
    //         item.classList.add(`animate-slideInRight${index+1}`);
    //         item.classList.remove('opacity-0');
    //     });
    // }    
})




let latest_news = Array.from(document.querySelectorAll(".latest_news"));
let k = 0;

latest_news_array.forEach((item) => {
    const title = item.title;
    const image = item.urlToImage;


    if (image != null) {
        if (k < latest_news.length) {
            latest_news[k].querySelector(".title").innerHTML = title;
            latest_news[k].querySelector(".title").setAttribute('href', `content.html?title=${title}`)
            latest_news[k].querySelector("img").src = image;
            k++;
        }
    }
})

let popular_news = Array.from(document.querySelectorAll(".popular_news"));
let j = 0;

popular_news_array.forEach((item, index) => {
    const title = item.title;
    const image = item.urlToImage;


    if (image != null) {
        if (j < popular_news.length) {
            popular_news[j].querySelector(".title").innerHTML = title;
            popular_news[j].querySelector(".title").setAttribute('href', `content.html?title=${title}`)
            popular_news[j].querySelector("img").src = image;
            j++;
        }
    }
})

let related_news = Array.from(document.querySelectorAll(".related_news"));




let i = 0;


related_news_array.forEach((item) => {
    const title = item.title;
    const image = item.urlToImage;


    if (i < related_news.length) {

        if (image != null) {

            related_news[i].querySelector(".title").innerHTML = title;
            related_news[i].querySelector(".title").setAttribute('href', `content.html?title=${title}`)

            related_news[i].style.backgroundImage = `url(${image})`;
            related_news[i].style.backgroundRepeat = 'noRepeat';
            related_news[i].style.backgroundPosition = 'top';
            related_news[i].style.backgroundSize = 'cover';
            i++;

        }
    }

})


// related (slider):



