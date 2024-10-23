const apikey = 'fe387c23cb13460484b65754816b9c1d';  // Make sure to use a valid key
const gnews_apikey = '61a1dbbf80af0d9a728bb04f40a1337b';
const category = 'health';  // Updated category to health

import { db } from '../auth.js';
import { doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Store Data in Firestore
async function storeDataInFirestore(collectionName, docName, data) {
    try {
        const docRef = doc(db, collectionName, docName);
        await setDoc(docRef, data);
        console.log("Document successfully written to Firestore!");
    } catch (error) {
        console.error("Error writing document to Firestore: ", error);
    }
}

// Get Data from Firestore
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
        console.error("Error retrieving document from Firestore: ", error);
        return null;
    }
}

// Fetch and Store News in Firestore
async function fetchAndStoreNews(url, collectionName, docName) {
    const response = await fetch(url);
    const data = await response.json();

    // Ensure that data contains valid articles before storing in Firestore
    if (data.articles && data.articles.length > 0) {
        await storeDataInFirestore(collectionName, docName, { articles: data.articles });
        return data.articles;
    } else {
        throw new Error("No articles found in the fetched data");
    }
}

// Top News Fetcher for Health
export async function fetch_top_news() {
    let stored_data = await getDataFromFirestore('Health', 'top_news');  // Updated collection to 'Health'
    if (stored_data && stored_data.articles) {
        return stored_data.articles;
    } else {
        const url = `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=us&max=10&apikey=${gnews_apikey}`;
        return await fetchAndStoreNews(url, 'Health', 'top_news');  // Store in 'Health' collection
    }
}

// Latest News Fetcher for Health
export async function fetch_latest_news() {
    let stored_data = await getDataFromFirestore('Health', 'latest_news');  // Updated collection to 'Health'
    if (stored_data && stored_data.articles) {
        return stored_data.articles;
    } else {
        const url = `https://newsapi.org/v2/everything?q=health&from=2024-09-27&to=2024-09-27&sortBy=publishedAt&apiKey=${apikey}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Error fetching data: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();

            if (!data.articles || data.articles.length === 0) {
                throw new Error('No articles found in the fetched data');
            }

            // Store in Firestore in 'Health' collection
            await storeDataInFirestore('Health', 'latest_news', { articles: data.articles });
            return data.articles;
        } catch (error) {
            console.error("Error in fetch_latest_news: ", error.message);
            return []; // Return an empty array if there is an error
        }
    }
}

// Popular News Fetcher for Health
export async function fetch_popular_news() {
    let stored_data = await getDataFromFirestore('Health', 'popular_news');  // Updated collection to 'Health'
    if (stored_data && stored_data.articles) {
        return stored_data.articles;
    } else {
        const url = `https://newsapi.org/v2/everything?q=health&from=2024-09-27&to=2024-09-27&sortBy=popularity&apiKey=${apikey}`;
        return await fetchAndStoreNews(url, 'Health', 'popular_news');  // Store in 'Health' collection
    }
}

// Related News Fetcher for Health
export async function fetch_related_news() {
    let stored_data = await getDataFromFirestore('Health', 'related_news');  // Updated collection to 'Health'
    if (stored_data && stored_data.articles) {
        return stored_data.articles;
    } else {
        const url = `https://newsapi.org/v2/everything?q=health&from=2024-09-27&to=2024-09-27&sortBy=relevancy&apiKey=${apikey}`;
        return await fetchAndStoreNews(url, 'Health', 'related_news');  // Store in 'Health' collection
    }
}
