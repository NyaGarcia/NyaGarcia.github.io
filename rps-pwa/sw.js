const CACHE_NAME = 'RPS-game-v1';

const URLS = [
  '/',
  'index.html',
  'controller.js',
  'assets/style.css',
  'app.js',
  'assets/img/paper.png',
  'assets/img/rock.png',
  'assets/img/scissors.png',
  'assets/img/icons'
];

self.addEventListener('install', event => {
  console.log('installing');
  const cache = async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(URLS);
  };
  event.waitUntil(cache());
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match(event.request);
    })
  );
});
