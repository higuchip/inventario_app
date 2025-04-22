// Versão do cache; incremente para forçar limpeza de cache e atualização do Service Worker
const CACHE_NAME = 'forest-inventory-v2';
const urlsToCache = [
  '.',
  'index.html',
  'project.html',
  'inventory.html',
  'view_trees.html',
  'style.css',
  'manifest.json',
  'icon-192x192.png',
  'icon-512x512.png'
];

// Instalação do Service Worker
self.addEventListener('install', event => {
  // Força o Service Worker a ativar imediatamente após instalação
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aberto e URLs adicionadas:', CACHE_NAME);
        return cache.addAll(urlsToCache);
      })
  );
});

// Ativação do Service Worker
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Removendo cache antigo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
    .then(() => {
      // Assume o controle imediato das páginas abertas
      return self.clients.claim();
    })
  );
});

// Interceptação de requisições
self.addEventListener('fetch', event => {
  // ** NÃO INTERCEPTAR requisições não-HTTP/HTTPS **
  // Ignora extensões, dados, etc., que não podem ser cacheados ou buscados normalmente.
  if (!event.request.url.startsWith('http')) {
    console.log('[SW] Ignorando requisição não-HTTP(S):', event.request.url);
    // Deixa o navegador lidar com ela normalmente, sem interceptar.
    return; 
  }

  // Só continua para requisições HTTP/HTTPS
  console.log('[SW] Interceptando requisição HTTP(S):', event.request.url);
  
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - retorna a resposta do cache
        if (response) {
          console.log('[SW] Cache hit para:', event.request.url);
          return response;
        }
        
        console.log('[SW] Cache miss para:', event.request.url);

        // Clone da requisição
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          response => {
            // Verifica se recebemos uma resposta válida ANTES de tentar cachear
            // Permite respostas não-basic (CORS) mas ainda verifica status 200
            if(!response || response.status !== 200) {
              console.log('[SW] Resposta inválida ou não 200, não cacheando:', event.request.url, response ? response.status : 'sem resposta');
              return response;
            }

            // Clone da resposta para o cache
            const responseToCache = response.clone();

            // Coloca no cache APENAS se for uma resposta válida e básica (mesma origem)
            // A verificação http já foi feita, mas adicionamos a type basic aqui por segurança extra
            if (response.type === 'basic') {
                caches.open(CACHE_NAME)
                  .then(cache => {
                    console.log('[SW] Tentando cachear resposta para:', event.request.url);
                    cache.put(event.request, responseToCache).catch(err => {
                        // Logar erro de put mas não deixar quebrar a resposta principal
                        console.error('[SW] Falha ao executar cache.put:', err, event.request.url);
                    });
                  });
            } else {
                console.log(`[SW] Resposta não é 'basic', pulando cache: ${event.request.url}, Tipo: ${response.type}`);
            }

            return response; // Retorna a resposta original da rede
          }
        ).catch(error => {
          // Ocorreu um erro ao tentar buscar na rede
          console.error('[SW] Erro durante fetch para:', event.request.url, error);
          
          // Estratégia de fallback: se for uma navegação de página, tenta servir o index.html do cache
          if (event.request.mode === 'navigate') {
            console.log('[SW] Falha de rede para navegação, tentando servir index.html do cache...');
            // Retorna a promise diretamente, o navegador lida se não encontrar
            return caches.match('index.html'); 
          }
          
          // Para outros tipos de requisições, falha (retorna undefined implicitamente).
          console.log('[SW] Falha de rede para recurso não-navegação:', event.request.url);
          // Não retorna nada explicitamente, resultando em erro de rede para o recurso.
        });
      })
  );
}); 