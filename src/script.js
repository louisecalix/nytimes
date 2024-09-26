// LINKS
// const apiKey = 'xGrrl5lSeDM73RvXOHvJA1Zp0exJRHu6'; 
// let popularUrl = `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${apiKey}`;
// let bookUrl = `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${apiKey}`;
// let topUrl = `https://api.nytimes.com/svc/topstories/v2/world.json?api-key=${apiKey}`;
// let searchUrl = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=technology&api-key=xGrrl5lSeDM73RvXOHvJA1Zp0exJRHu6`;


function updateDateTime() {
  const timeElement = document.getElementById('current-time');
  const now = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  timeElement.innerHTML = now.toLocaleDateString('en-US', options);
  timeElement.setAttribute('datetime', now.toISOString());
}

updateDateTime();
setInterval(updateDateTime, 1000);


const fetchData = async (url) => {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    return await res.json();
  } catch (e) {
    console.error('An error occurred:', e.message);
    return { results: [] }; 
  }
};


// Popular News
const popularUrl = 'https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=xGrrl5lSeDM73RvXOHvJA1Zp0exJRHu6';
// const popularUrl = 'data.json';
const PopularNewsLeft = document.getElementById('popular-stories-left');
const PopularNewsRight = document.getElementById('popular-stories-right');
const maxRightSideArticles = 8; 

const updatePopularContainer = (data) => {
  if (!PopularNewsLeft || !PopularNewsRight) return;

  PopularNewsLeft.innerHTML = '';
  PopularNewsRight.innerHTML = '';

  const newTitleContainer = document.createElement('div');
  newTitleContainer.setAttribute('class', 'category-name');
  newTitleContainer.innerHTML = `<h1>POPULAR NEWS</h1>`;
  PopularNewsLeft.appendChild(newTitleContainer);


  const articles = data.results || [];
  
  if (articles.length < 2) {
    PopularNewsLeft.innerHTML = "<p>Not enough articles to display.</p>";
    return;
  }

  const rightArticles = articles.slice(Math.floor(articles.length / 2)); 

  articles.slice(0, Math.floor(articles.length / 2)).forEach((news) => {
    const newsContainer = document.createElement('div');
    newsContainer.setAttribute('class', 'article');
    
    const imageUrl = news.media && news.media[0] && news.media[0]['media-metadata'] && news.media[0]['media-metadata'][2] ? 
                     news.media[0]['media-metadata'][2].url : 
                     'https://res.cloudinary.com/dzvd6o0og/image/upload/v1726562144/placeholder_lz0wd0.jpg';
    const articleUrl = news.url;

    newsContainer.innerHTML = `
      <h1><a href="${articleUrl}" target='_blank'>${news.title || 'No title available'}</a></h1>
      <img src="${imageUrl}" alt="${news.title || 'No title available'}" />
      <p>${news.abstract || 'No description available'}</p>
    `;
    PopularNewsLeft.appendChild(newsContainer);
  });

  rightArticles.slice(0, maxRightSideArticles).forEach((news) => {
    const newsContainer = document.createElement('div');
    newsContainer.setAttribute('class', 'right-article');

    const articleUrl = news.url;
    newsContainer.innerHTML = `
      <h1><a href="${articleUrl}" target='_blank'>${news.title || 'No title available'}</a></h1>
      <p>${news.abstract || 'No description available'}</p>
    `;
    PopularNewsRight.appendChild(newsContainer);
  });
};

(async () => {
  const data = await fetchData(popularUrl);
  updatePopularContainer(data);
})();





// const PopularNews = document.getElementById('popular-stories');

// const updatePopularContainer = (data) => {
//   if (!PopularNews) return;
//   PopularNews.innerHTML = '';
//   (data.results || []).forEach((news) => {
//     const newsContainer = document.createElement('div');
//     newsContainer.setAttribute('class', 'article');

//     const imageUrl = news.media[0]['media-metadata'][2].url || 'https://res.cloudinary.com/dzvd6o0og/image/upload/v1726562144/placeholder_lz0wd0.jpg';
//     const articleUrl = news.url;

//     newsContainer.innerHTML = `
//       <h1><a href="${articleUrl}" target='_blank'>${news.title || 'No title available'}</a></h1>
//       <img src="${imageUrl}" alt="${news.title || 'No title available'}" />
//       <p>${news.abstract || 'No description available'}</p>
//     `;

//     PopularNews.appendChild(newsContainer);
//   });
// };

// (async () => {
//   const data = await fetchData(popularUrl);
//   updatePopularContainer(data);
// })();



// Book Reviews
const bookUrl = 'https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=xGrrl5lSeDM73RvXOHvJA1Zp0exJRHu6';
const bookReviews = document.getElementById("book-review");

const updateBookContainer = (data) => {
  if (!bookReviews) return; 
  bookReviews.innerHTML = '';
  (data.results.books || []).forEach((book) => {
    const bookContainer = document.createElement('div');
    bookContainer.setAttribute('class', 'book');

    const imageUrl = book.book_image || 'https://res.cloudinary.com/dzvd6o0og/image/upload/v1726562144/placeholder_lz0wd0.jpg';
    const amazonUrl = book.amazon_product_url;

    bookContainer.innerHTML = `
      <h1><a href='${amazonUrl}' target='_blank'>${book.title || 'No title available'}</a></h1>
      <img src="${imageUrl}" alt="${book.title || 'No title available'}" />
      <p>${book.description || 'No description available'}</p>
    `;

    bookReviews.appendChild(bookContainer);
  });
};

(async () => {
  const data = await fetchData(bookUrl);
  updateBookContainer(data);
})();





// Top Stories
const topUrl = 'https://api.nytimes.com/svc/topstories/v2/world.json?api-key=xGrrl5lSeDM73RvXOHvJA1Zp0exJRHu6';
const TopNews = document.getElementById('top-stories');


const updateTopContainer = (data) => {
  if (!TopNews) return; 
  TopNews.innerHTML = '';

  
  (data.results || []).forEach((item) => {
    const topContainer = document.createElement('div');
    topContainer.className = 'top';

    const title = item.title || 'No title available';
    const url = item.url || '#';
    const abstract = item.abstract || 'No description available';
    const image =  item.multimedia[0].url || 'https://res.cloudinary.com/dzvd6o0og/image/upload/v1726562144/placeholder_lz0wd0.jpg';

    topContainer.innerHTML = `
      <h1><a href='${url}' target='_blank'>${title}</a></h1>
      <img src="${image}" alt="${title}" />
      <p>${abstract}</p>
    `;

    TopNews.appendChild(topContainer);
  });
};

(async () => {
  const data = await fetchData(topUrl);
  updateTopContainer(data);
})();




// Search
// const searchUrl = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&api-key=xGrrl5lSeDM73RvXOHvJA1Zp0exJRHu6`;
// const searchForm = document.getElementById('search-form');
// const searchInput = document.getElementById('search');
// const SearchNews = document.getElementById('search-news'); 







document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.getElementById('search-form');
  const searchInput = document.getElementById('search');
  const SearchNews = document.getElementById('search-news');

  if (searchForm && searchInput && SearchNews) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const searchQuery = searchInput.value.trim();
      if (searchQuery === "") {
        alert("Please enter a search term.");
        return;
      }

      const searchUrl = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${encodeURIComponent(searchQuery)}&api-key=xGrrl5lSeDM73RvXOHvJA1Zp0exJRHu6`;

      const updateSearchContainer = (data) => {
        SearchNews.innerHTML = '';
        (data.response.docs || []).forEach((searchItem) => {
          const searchContainer = document.createElement('div');
          searchContainer.setAttribute('class', 'searchItem');
          const title = searchItem.headline.main || 'No title available';
          const abstract = searchItem.abstract || 'No abstract available';
          const articleUrl = searchItem.web_url || '#';
          const imageUrl = searchItem.multimedia.length > 0 ? `https://www.nytimes.com/${searchItem.multimedia[0].url}` : 'https://res.cloudinary.com/dzvd6o0og/image/upload/v1726562144/placeholder_lz0wd0.jpg';

          searchContainer.innerHTML = `
            <h1><a href="${articleUrl}" target="_blank">${title}</a></h1>
            <img src="${imageUrl}" alt="${title}" />
            <p>${abstract}</p>
          `;

          SearchNews.appendChild(searchContainer);
        });
      };

      (async () => {
        try {
          const res = await fetch(searchUrl);
          const data = await res.json();
          updateSearchContainer(data);
        } catch (error) {
          console.error("Error fetching search results:", error);
        }
      })();
    });
  }
});

