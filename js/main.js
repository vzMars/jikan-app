//getTopAnime - Query Parameters example
// this example gets the top 5 favorited tv anime starting from page
// https://api.jikan.moe/v4/top/anime?type=tv&filter=favorite&page=1&limit=5
const mangaList = document.querySelector('.container');
const topManga = [];

const getTopManga = () => {
  fetch('https://api.jikan.moe/v4/top/manga?type=manga')
    .then((res) => res.json())
    .then((data) => {
      topManga.splice(0, data.data.length, ...data.data);
      createMangaList();
    })
    .catch((err) => {
      console.log(`error: ${err}`);
    });
};

const createMangaList = () => {
  for (let i = 0; i < topManga.length; i++) {
    mangaList.append(createManga(topManga[i]));
  }
};

const createManga = (manga) => {
  const mangaContainer = document.createElement('div');
  const mangaInfo = document.createElement('div');
  const img = document.createElement('img');
  const title = document.createElement('h2');
  const author = document.createElement('span');
  const published = document.createElement('span');
  const score = document.createElement('span');
  const synopsis = document.createElement('p');

  mangaContainer.className = 'manga';
  mangaContainer.id = manga.rank;
  mangaInfo.className = 'info';

  img.src = manga.images.webp.image_url;
  title.textContent = manga.title_english;
  author.textContent = manga.authors[0].name.split(',').reverse().join(' ');
  published.textContent = manga.published.string.replaceAll('to', '-');
  score.textContent = manga.score;
  synopsis.textContent = manga.synopsis;

  mangaInfo.append(title, author, published, score, synopsis);
  mangaContainer.append(img, mangaInfo);
  return mangaContainer;
};

getTopManga();
