const apikey = 'fe387c23cb13460484b65754816b9c1d';  // Make sure to use a valid key
const gnews_apikey = '61a1dbbf80af0d9a728bb04f40a1337b';
const category = 'science';

import { db } from '../auth.js';
import { doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

async function storeDataInFirestore(collectionName, docName, data) {
    try {
        const docRef = doc(db, collectionName, docName);
        await setDoc(docRef, data);
        console.log("Document successfully written!");
    } catch (error) {
        console.error("Error adding document: ", error);
    }
}

async function getDataFromFirestore(collectionName, docName) {
    try {
        const docRef = doc(db, collectionName, docName);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            return null; // No such document
        }
    } catch (error) {
        console.error("Error getting document: ", error);
        return null;
    }
}

// Helper function to fetch news data and handle Firestore storage
async function fetchAndStoreNews(url, collectionName, docName) {
    const response = await fetch(url);
    const data = await response.json();

    // Check if data contains valid articles before storing in Firestore
    if (data.articles && data.articles.length > 0) {
        await storeDataInFirestore(collectionName, docName, { articles: data.articles });
        return data.articles;
    } else {
        throw new Error("No articles found in the fetched data");
    }
}

// Top News Fetcher
export async function fetch_top_news() {
    let stored_data = await getDataFromFirestore('Science', 'top_news');
    if (stored_data && stored_data.articles) {
        return stored_data.articles;
    } else {
        const url = `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=us&max=10&apikey=${gnews_apikey}`;
        return await fetchAndStoreNews(url, 'Science', 'top_news');
    }
}

// Latest News Fetcher
export async function fetch_latest_news() {
    let stored_data = await getDataFromFirestore('Science', 'latest_news');
    if (stored_data && stored_data.articles) {
        return stored_data.articles;
    } else {
        const url = 'https://newsapi.org/v2/everything?q=science&from=2024-09-27&to=2024-09-27&sortBy=publishedAt&apiKey=' + apikey; // Ensure apikey is set
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Error fetching data: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();

            if (!data.articles || data.articles.length === 0) {
                throw new Error('No articles found in the fetched data');
            }

            // Store in Firestore instead of localStorage
            await storeDataInFirestore('Science', 'latest_news', { articles: data.articles });
            return data.articles;
        } catch (error) {
            console.error("Error in fetch_latest_news: ", error.message);
            return []; // Return an empty array if there is an error
        }
    }
}


// Popular News Fetcher
export async function fetch_popular_news() {
    let stored_data = await getDataFromFirestore('Science', 'popular_news');
    if (stored_data && stored_data.articles) {
        return stored_data.articles;
    } else {
        const url = `https://newsapi.org/v2/everything?q=science&from=2024-09-27&to=2024-09-27&sortBy=popularity&apiKey=${apikey}`;
        return await fetchAndStoreNews(url, 'Science', 'popular_news');
    }
}

// Related News Fetcher
export async function fetch_related_news() {
    let stored_data = await getDataFromFirestore('Science', 'related_news');
    if (stored_data && stored_data.articles) {
        return stored_data.articles;
    } else {
        const url = `https://newsapi.org/v2/everything?q=science&from=2024-09-27&to=2024-09-27&sortBy=relevancy&apiKey=${apikey}`;
        return await fetchAndStoreNews(url, 'Science', 'related_news');
    }
}










// local storage me basically key-value pairs store hote hain -> key-value pairs are strings -> isliye hame apne data ko string me convert krna padta hai 

// response = await fetch(url) -> fetch(url) -> returns a promise -> when the promise is fulfilled -> response stores the data returned

// fetch(url) se raw data ata ha -> usually in JSON format that javascript does not understand -> so we do response.json() -> ab ye data ek normal javascript object me convert ho jata hai

// localStorage.setItem('data.articles' , JSON.stringify(data.articles)) -> key-value in form of strings are stored in localStorage

// localStorage.getItem('data.articles') -> returns the string 

// JSON.parse -> converts the JSON string back to Javascript object or array

// since fetch_top_news() is an async function -> it returns a promise 

// so top_news_array me ham await ka use krte hain
