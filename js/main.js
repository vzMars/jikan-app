const scrollBtn = document.querySelector('#scrollToTop');
const top25 = document.querySelector('.top-25');
const mangaBtn = document.querySelector('#manga-btn');
const animeBtn = document.querySelector('#anime-btn');
const h1 = document.querySelector('h1');

window.addEventListener('scroll', () => {
  if (window.scrollY > window.outerHeight + window.outerHeight / 2) {
    scrollBtn.classList.add('active');
  } else {
    scrollBtn.classList.remove('active');
  }
});

scrollBtn.addEventListener('click', () => {
  // const htmlBody = document.querySelector('html, body');
  // htmlBody.animate({ sc: 0 }, 500);
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

mangaBtn.addEventListener('click', async () => {
  top25.replaceChildren();
  h1.textContent = 'Top 25 Manga';
  const series = await getTopManga();
  createSeriesList(series);
});

animeBtn.addEventListener('click', async () => {
  top25.replaceChildren();
  h1.textContent = 'Top 25 Anime';
  const series = await getTopAnime();
  createSeriesList(series);
});

const getTopManga = async () => {
  try {
    const response = await fetch(
      'https://api.jikan.moe/v4/top/manga?type=manga'
    );
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

const getTopAnime = async () => {
  try {
    const reponse = await fetch('https://api.jikan.moe/v4/top/anime?type=tv');
    const data = await reponse.json();
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

const createSeriesList = (series) => {
  for (let i = 0; i < series.length; i++) {
    top25.append(createSeries(series[i]));
  }
};

const createSeries = (series) => {
  const seriesContainer = document.createElement('div');
  const seriesInfo = document.createElement('div');
  const img = document.createElement('img');
  const title = document.createElement('h2');
  const authorStudio = document.createElement('span');
  const airedPublished = document.createElement('span');
  const score = document.createElement('span');
  const synopsis = document.createElement('p');

  seriesContainer.className = 'series';
  seriesInfo.className = 'info';

  seriesContainer.id = series.rank;
  img.src = series.images.webp.image_url;
  title.textContent = series.title;
  score.textContent = series.score;
  synopsis.textContent = series.synopsis;

  if (series.url.includes('manga')) {
    authorStudio.textContent = series.authors[0].name
      .split(',')
      .reverse()
      .join(' ');
    airedPublished.textContent = series.published.string.replaceAll('to', '-');
  } else {
    authorStudio.textContent = series.studios[0].name;
    airedPublished.textContent = series.aired.string;
  }

  seriesInfo.append(title, authorStudio, airedPublished, score, synopsis);
  seriesContainer.append(img, seriesInfo);
  return seriesContainer;
};
