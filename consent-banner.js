function initializeConsentBanner(gaMeasurementId, privacyPolicyUrl) {
  const CONSENT_STORAGE_KEY = 'lgpd_consent_given';
  const consentGiven = localStorage.getItem(CONSENT_STORAGE_KEY);

  // Função para definir o consentimento padrão e atualizar
  function updateGAConsent(granted) {
    if (typeof gtag !== 'function') {
      console.warn('gtag function not found. GA might not be loaded yet or blocked.');
      return;
    }
    const consentState = granted ? 'granted' : 'denied';
    console.log(`Updating GA consent: analytics_storage = ${consentState}`);
    gtag('consent', 'update', {
      'analytics_storage': consentState
      // Você pode adicionar outros tipos de consentimento aqui se necessário (ex: ad_storage)
    });
  }

  // Define o consentimento padrão como negado ANTES de carregar GA
  // Isso deve ser chamado o mais cedo possível na carga da página
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}

  gtag('consent', 'default', {
    'analytics_storage': 'denied',
    'ad_storage': 'denied', // Boa prática incluir mesmo se não usar anúncios
    'wait_for_update': 500 // Opcional: aguarda um pouco por um update antes de enviar pings
  });

  // Se o consentimento já foi dado, atualiza o GA
  if (consentGiven === 'true') {
    console.log('Consent previously granted. Updating GA consent status.');
    updateGAConsent(true);
  } else if (consentGiven === 'false') {
    console.log('Consent previously denied.');
    // Não precisa fazer nada extra, o padrão já é negado
  }

  // Função para criar e mostrar o banner
  function showConsentBanner() {
    if (document.getElementById('consent-banner')) return; // Evita duplicatas

    const banner = document.createElement('div');
    banner.id = 'consent-banner';
    banner.style.cssText = `
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: #333;
      color: white;
      padding: 15px 20px;
      z-index: 1001;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 15px;
      font-size: 14px;
      border-top: 1px solid #555;
      box-shadow: 0 -2px 5px rgba(0,0,0,0.2);
    `;

    const textContent = document.createElement('div');
    textContent.innerHTML = `
      Usamos cookies para análise e melhoria da experiência. Ao continuar, você concorda com nossa 
      <a href="${privacyPolicyUrl}" target="_blank" style="color: #4CAF50; text-decoration: underline;">Política de Privacidade</a>.
    `;

    const buttonGroup = document.createElement('div');
    buttonGroup.style.cssText = `
      display: flex;
      gap: 10px;
      flex-shrink: 0;
    `;

    const acceptButton = document.createElement('button');
    acceptButton.textContent = 'Aceitar';
    acceptButton.style.cssText = `
      background-color: #4CAF50;
      color: white;
      border: none;
      padding: 8px 15px;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
    `;

    const declineButton = document.createElement('button');
    declineButton.textContent = 'Recusar';
    declineButton.style.cssText = `
      background-color: #757575;
      color: white;
      border: none;
      padding: 8px 15px;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
    `;

    acceptButton.onclick = () => {
      localStorage.setItem(CONSENT_STORAGE_KEY, 'true');
      updateGAConsent(true);
      banner.remove();
    };

    declineButton.onclick = () => {
      localStorage.setItem(CONSENT_STORAGE_KEY, 'false');
      updateGAConsent(false);
      banner.remove();
    };

    buttonGroup.appendChild(declineButton);
    buttonGroup.appendChild(acceptButton);
    banner.appendChild(textContent);
    banner.appendChild(buttonGroup);

    document.body.appendChild(banner);
  }

  // Mostra o banner apenas se o consentimento ainda não foi registrado
  if (consentGiven === null) {
    console.log('No consent decision found. Showing consent banner.');
    // Garante que o DOM está pronto antes de adicionar o banner
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', showConsentBanner);
    } else {
      showConsentBanner();
    }
  }

  // Carrega o script do Google Analytics (após definir consentimento padrão)
  const gaScript = document.createElement('script');
  gaScript.async = true;
  gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`;
  document.head.appendChild(gaScript);

  const gaInitScript = document.createElement('script');
  gaInitScript.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${gaMeasurementId}');
    console.log('GA config called for ${gaMeasurementId}');
  `;
  document.head.appendChild(gaInitScript);

}

// Exemplo de como chamar (você precisará substituir os valores)
// initializeConsentBanner('G-XXXXXXXXXX', '/sua-politica-de-privacidade.html'); 