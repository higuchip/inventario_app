class InstallButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.deferredPrompt = null;
    this.isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    this.isAndroid = /Android/.test(navigator.userAgent);
    this.isMac = /Mac/.test(navigator.platform);
    this.isWindows = /Win/.test(navigator.platform);
    this.isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
                       window.matchMedia('(display-mode: fullscreen)').matches;
  }

  connectedCallback() {
    // Se o app já estiver instalado, não mostra o botão
    if (this.isStandalone) {
      this.style.display = 'none';
      return;
    }

    this.render();
    this.setupEventListeners();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .install-button {
          display: inline-flex;
          align-items: center;
          padding: 8px 16px;
          background-color: white;
          color: var(--primary-color);
          border: 2px solid white;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          transition: all 0.2s ease;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .install-button:hover {
          background-color: rgba(255, 255, 255, 0.9);
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.15);
        }

        .install-button:active {
          transform: translateY(0);
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .install-icon {
          margin-right: 8px;
          width: 16px;
          height: 16px;
          transition: transform 0.2s ease;
        }

        .install-button:hover .install-icon {
          transform: scale(1.05);
        }

        @media (max-width: 600px) {
          .install-button {
            padding: 8px 12px;
            font-size: 13px;
          }
          
          .install-icon {
            width: 14px;
            height: 14px;
          }
        }
      </style>
      <button class="install-button" id="installBtn" title="Instalar o aplicativo para acesso offline e rápido">
        <svg class="install-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
        </svg>
        <span id="installText">Instalar Aplicativo</span>
      </button>
    `;
  }

  setupEventListeners() {
    const installBtn = this.shadowRoot.getElementById('installBtn');
    const installText = this.shadowRoot.getElementById('installText');

    // Atualiza o texto do botão baseado na plataforma
    if (this.isIOS) {
      installText.textContent = 'Adicionar à Tela Inicial';
    } else if (this.isAndroid) {
      installText.textContent = 'Instalar Aplicativo';
    } else if (this.isMac || this.isWindows) {
      installText.textContent = 'Instalar Aplicativo';
    }

    // Evento para instalação em Android/Desktop
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
      installBtn.style.display = 'inline-flex';
    });

    // Evento para iOS
    if (this.isIOS) {
      installBtn.style.display = 'inline-flex';
    }

    // Monitora mudanças no modo de exibição
    window.matchMedia('(display-mode: standalone)').addEventListener('change', (e) => {
      if (e.matches) {
        this.style.display = 'none';
      }
    });

    installBtn.addEventListener('click', () => {
      if (this.isIOS) {
        this.showIOSInstructions();
      } else if (this.deferredPrompt) {
        this.deferredPrompt.prompt();
        this.deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('Usuário aceitou a instalação');
            this.style.display = 'none';
          }
          this.deferredPrompt = null;
        });
      }
    });
  }

  showIOSInstructions() {
    const instructions = document.createElement('div');
    instructions.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: white;
      padding: 24px;
      border-radius: 12px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.15);
      z-index: 1000;
      max-width: 90%;
      width: 320px;
      text-align: center;
    `;

    instructions.innerHTML = `
      <h3 style="margin: 0 0 16px 0; color: var(--primary-color); font-size: 18px; font-weight: 600;">Como instalar o aplicativo</h3>
      <ol style="text-align: left; margin: 0 0 24px 0; padding-left: 24px; color: var(--text-color); font-size: 14px;">
        <li style="margin-bottom: 12px;">Toque no botão "Compartilhar"</li>
        <li style="margin-bottom: 12px;">Role para baixo e selecione "Adicionar à Tela Inicial"</li>
        <li style="margin-bottom: 12px;">Toque em "Adicionar" no canto superior direito</li>
      </ol>
      <button style="
        background-color: var(--primary-color);
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 600;
        font-size: 14px;
        width: 100%;
        transition: background-color 0.2s ease;
      ">Entendi</button>
    `;

    document.body.appendChild(instructions);

    const closeButton = instructions.querySelector('button');
    closeButton.addEventListener('click', () => {
      document.body.removeChild(instructions);
    });
  }
}

customElements.define('install-button', InstallButton); 