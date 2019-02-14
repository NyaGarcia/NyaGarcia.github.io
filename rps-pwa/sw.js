const CACHE_NAME = 'RPS-game-v1';

const URLS = [
  '/rps-pwa',
  'index.html',
  'controller.js',
  'assets/style.css',
  'app.js',
  'assets/img/paper.png',
  'assets/img/rock.png',
  'assets/img/scissors.png',
  'assets/img/icons/android-icon-144x144.png'
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
