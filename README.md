# Planilha Florestal App

## Descrição

O **Planilha Florestal App** é um Progressive Web App (PWA) desenvolvido para auxiliar na coleta e gerenciamento de dados de inventário florestal diretamente em campo. Ele permite criar projetos, registrar informações detalhadas de árvores (incluindo coordenadas GPS), visualizar os dados coletados e exportá-los para análise posterior. O aplicativo foi projetado para funcionar offline após a instalação inicial, armazenando os dados localmente no dispositivo do usuário.

Este projeto foi desenvolvido, pensando nas necessidades de engenheiros florestais, técnicos, estudantes e pesquisadores que realizam levantamentos em campo, especialmente em locais sem acesso à internet.


---

## ⚠️ **Status Atual: BETA / EXPERIMENTAL** ⚠️

**Data da Última Revisão Deste README:** 16 de abril de 2025

**ATENÇÃO:** Este aplicativo está em fase de desenvolvimento e testes (Beta). **NÃO HÁ GARANTIAS** de funcionamento perfeito ou de preservação dos dados inseridos. Podem ocorrer bugs, perda de dados ou comportamento inesperado.

**UTILIZE POR SUA CONTA E RISCO.** O desenvolvedor não se responsabiliza por qualquer perda de dados ou problemas decorrentes do uso deste aplicativo nesta fase experimental.

**Backup é Essencial:** Os dados são armazenados **localmente** no cache do seu navegador (IndexedDB). Se você limpar os dados do navegador ou desinstalar o aplicativo, **os dados serão perdidos permanentemente**. **Recomenda-se fortemente fazer backups frequentes dos seus dados utilizando a função "Exportar CSV" disponível no aplicativo.**

---

## Funcionalidades Principais

* **Gerenciamento de Projetos:** Crie e organize inventários por área e ano.
* **Coleta de Dados de Árvores:** Registre informações como parcela, espécie, CAP (Circunferência à Altura do Peito), altura, coordenadas GPS e observações.
* **Geolocalização:** Obtenha coordenadas GPS diretamente pelo dispositivo (requer permissão do usuário).
* **Armazenamento Offline:** Todos os dados de projetos e árvores são salvos localmente no dispositivo usando IndexedDB.
* **Funcionamento Offline:** O aplicativo pode ser usado sem conexão com a internet após ser carregado e instalado pela primeira vez (PWA com Service Worker).
* **Visualização e Edição:** Consulte, edite ou exclua dados de árvores e projetos registrados.
* **Exportação de Dados:** Exporte os dados das árvores de um projeto para um arquivo CSV, compatível com planilhas (Excel, Google Sheets, LibreOffice Calc) e softwares de análise.
* **Instalável (PWA):** Adicione o aplicativo à tela inicial do seu dispositivo (Android/iOS/Desktop) para acesso rápido.

---

## Tecnologias Utilizadas

* HTML5
* CSS3
* JavaScript (Vanilla JS)
* Progressive Web App (PWA)
    * Web App Manifest (`manifest.json`)
    * Service Workers (`sw.js`) para cache e offline
* IndexedDB API (Armazenamento no lado do cliente)
* Geolocation API (Obtenção de coordenadas GPS)
* Hospedagem: GitHub Pages

---

## Como Acessar, Instalar e Desinstalar

### 1. Acesso via Navegador

* Acesse o aplicativo através da URL do GitHub Pages:
    * [**https://higuchip.github.io/inventario_app/index.html**](https://higuchip.github.io/inventario_app/index.html)

### 2. Instalação (Recomendado para Offline)

* **No Celular (Android/iOS):**
    * Abra o link acima no navegador (Chrome no Android, Safari no iOS).
    * Procure pela opção "Instalar aplicativo" ou um ícone similar (Android) ou toque no ícone de Compartilhar e depois em "Adicionar à Tela de Início" (iOS).
    * Siga as instruções na tela. Um ícone será adicionado à sua tela inicial.
* **No Desktop (Chrome/Edge):**
    * Abra o link acima.
    * Um ícone de instalação (geralmente um monitor com uma seta para baixo) aparecerá na barra de endereço. Clique nele e confirme a instalação.

### 3. Como Desinstalar o Aplicativo

* **IMPORTANTE:** Ao desinstalar o aplicativo, **todos os dados armazenados localmente (projetos, árvores) serão PERDIDOS permanentemente**. Certifique-se de ter feito backup (Exportar CSV) de tudo que for importante antes de desinstalar.
* **No Celular (Android):**
    * Pressione e segure o ícone do aplicativo na tela inicial ou na gaveta de aplicativos.
    * Escolha a opção "Desinstalar" ou arraste o ícone para a área de desinstalação.
    * Alternativamente, vá em Configurações > Aplicativos, encontre o "Planilha Florestal App" (ou o nome que ele tiver) e selecione "Desinstalar".
* **No Celular (iOS):**
    * Pressione e segure o ícone do aplicativo na tela inicial até que os ícones comecem a tremer.
    * Toque no ícone de "-" ou "X" que aparece sobre o ícone do aplicativo.
    * Confirme a exclusão ("Apagar App").
* **No Desktop (Windows):**
    * Vá em Configurações > Aplicativos > Aplicativos e recursos.
    * Encontre o "Planilha Florestal App" na lista.
    * Clique nele e selecione "Desinstalar".
    * Alternativamente, procure pelo app no Menu Iniciar, clique com o botão direito e veja se a opção "Desinstalar" está disponível.
* **No Desktop (macOS/Linux via Chrome/Edge):**
    * Abra o navegador Chrome ou Edge.
    * Digite `chrome://apps` (para Chrome) ou `edge://apps` (para Edge) na barra de endereço.
    * Encontre o ícone do "Planilha Florestal App".
    * Clique com o botão direito no ícone e escolha "Remover" ou "Desinstalar".
    * Confirme a remoção, marcando também a opção para limpar os dados, se disponível.

---

## Como Usar o Aplicativo (Guia Detalhado)

Após acessar ou instalar o aplicativo:

### 1. Tela Inicial (Splash Screen)

* Uma tela de carregamento (`index.html`) será exibida brevemente e redirecionará automaticamente para a tela de seleção de projetos.

### 2. Gerenciando Projetos (`project.html`)

* **Criando um Novo Projeto:**
    1.  Clique no botão "Novo Projeto".
    2.  Uma janela (modal) aparecerá. Preencha os campos "Área do Inventário" (ex: Fazenda Santa Maria, Talhão 5) e "Ano".
    3.  Clique em "Salvar". O novo projeto será listado na tela.
* **Selecionando um Projeto para Ações:**
    * Cada projeto listado terá botões:
        * `Cadastrar Árvores`: Leva à tela de cadastro de árvores para *este* projeto.
        * `Ver Árvores`: Leva à tela de visualização/edição das árvores já cadastradas para *este* projeto.
        * `Excluir`: Remove o projeto e **TODAS** as árvores associadas a ele (ação irreversível, requer confirmação).

### 3. Cadastrando Árvores (`inventory.html`)

* Você chegará a esta tela após clicar em "Cadastrar Árvores" em um projeto específico.
* **Preenchendo os Dados:**
    1.  **Parcela:** Identificador da unidade amostral.
    2.  **Coordenadas:**
        * Clique no botão "Obter GPS". O navegador solicitará permissão para acessar sua localização.
        * Se a permissão for concedida e o GPS estiver ativo, as coordenadas (Latitude, Longitude) serão preenchidas automaticamente.
        * Se não conseguir obter o GPS, o campo pode ficar vazio ou você pode inserir manualmente (se souber as coordenadas).
    3.  **Espécie:** Nome da espécie da árvore.
    4.  **CAP (cm):** Insira a Circunferência à Altura do Peito em centímetros. Use ponto para decimais se necessário (ex: `45.5`).
    5.  **Altura (m):** Insira a altura estimada ou medida em metros (opcional). Use ponto para decimais.
    6.  **Observação:** Qualquer informação adicional relevante (ex: árvore bifurcada, presença de cipó, etc.).
* **Salvando a Árvore:**
    * Clique no botão "Salvar Árvore". Uma notificação de sucesso aparecerá.
    * O formulário será limpo (exceto talvez a Parcela, para facilitar registros sequenciais), pronto para cadastrar a próxima árvore no mesmo projeto.
* **Voltando:** Clique no botão "Voltar" para retornar à tela de seleção de projetos.

### 4. Visualizando e Editando Árvores (`view_trees.html`)

* Você chegará a esta tela após clicar em "Ver Árvores" em um projeto específico.
* **Visualizando:** Uma tabela exibirá todas das árvores cadastradas para o projeto selecionado, com suas informações.
* **Editando uma Árvore:**
    1.  Encontre a árvore desejada na tabela.
    2.  Clique no botão "Editar" na linha correspondente.
    3.  Você será levado de volta à tela de cadastro (`inventory.html`), mas com os dados da árvore selecionada já preenchidos.
    4.  Modifique os campos que desejar.
    5.  Clique no botão "Atualizar Árvore". Você será redirecionado de volta para a lista de árvores após a atualização.
* **Excluindo uma Árvore:**
    1.  Encontre a árvore desejada na tabela.
    2.  Clique no botão "Excluir" na linha correspondente.
    3.  Uma janela de confirmação aparecerá. Clique em "Excluir" para confirmar. A árvore será removida permanentemente.
* **Adicionando Nova Árvore a partir desta Tela:**
    * Clique no botão "Nova Árvore". Você será levado para a tela de cadastro (`inventory.html`) para adicionar uma nova árvore a este projeto.
* **Exportando para CSV:**
    1.  Clique no botão "Exportar CSV".
    2.  O aplicativo gerará um arquivo `.csv` contendo todas as árvores do projeto atual. O nome do arquivo incluirá a área e o ano do projeto (ex: `inventario_Fazenda_Santa_Maria_2025.csv`).
    3.  O download do arquivo iniciará automaticamente. Use ponto e vírgula (`;`) como separador e codificação UTF-8 (compatível com Excel/LibreOffice em português).
* **Voltando:** Clique no botão "Voltar" para retornar à tela de seleção de projetos.

---

## Gerenciamento de Dados e Backup (IMPORTANTE!)

* **Armazenamento Local:** Todos os dados que você insere (projetos e árvores) são salvos **apenas no armazenamento local do navegador (IndexedDB) do dispositivo que você está usando**. Os dados não são enviados para nenhum servidor na nuvem.
* **Risco de Perda de Dados:** Se você:
    * Limpar os dados de navegação/cache/cookies do seu navegador.
    * Desinstalar o PWA (remover da tela inicial).
    * Tiver algum problema grave no navegador ou sistema operacional.
    * **OS SEUS DADOS PODEM SER PERDIDOS IRREVERSIVELMENTE!**
* **Backup via CSV:** A **única** forma de garantir a segurança dos seus dados é exportá-los regularmente usando o botão **"Exportar CSV"** na tela "Ver Árvores". Salve esses arquivos CSV em um local seguro (computador, nuvem, etc.).

---

## Funcionamento Offline

* Graças ao Service Worker, após acessar o aplicativo online pela primeira vez e instalá-lo ("Adicionar à Tela de Início"), você pode usá-lo sem conexão com a internet.
* O aplicativo carregará a partir dos arquivos salvos no cache.
* Você poderá criar projetos, adicionar/editar/visualizar árvores e todos os dados serão salvos localmente no IndexedDB.
* **Nota:** A função "Obter GPS" só funcionará offline se o seu dispositivo conseguir obter um sinal de GPS sem depender de redes assistidas (A-GPS), o que pode variar. A exportação para CSV requer que o aplicativo esteja carregado, mas não necessariamente conexão ativa no momento do clique (pois os dados são locais).

---

## Solução de Problemas (Troubleshooting)

Encontrou algum comportamento inesperado na aplicação, seja acessando pelo navegador ou usando o aplicativo instalado (PWA)? Tente os seguintes passos:

1.  **Fechar e Reabrir / Recarregar:**
    * **Se estiver usando o PWA instalado:** Feche completamente a janela do aplicativo e abra-o novamente.
    * **Se estiver usando no navegador:** Tente recarregar a página (F5 ou Ctrl+R / Cmd+R).
2.  **Recarregamento Forçado (Hard Refresh - Principalmente para uso no Navegador):** Force o navegador a ignorar o cache local. Pressione `Ctrl+Shift+R` (Windows/Linux) ou `Cmd+Shift+R` (Mac). Com as Ferramentas do Desenvolvedor (F12) abertas, você também pode clicar e segurar o botão de recarregar e escolher "Esvaziar cache e recarregamento forçado".
3.  **Verificar o Console (Usuários Técnicos / Navegador):** Abra as Ferramentas do Desenvolvedor (`F12`) e vá para a aba "Console". Procure por mensagens de erro (em vermelho) que possam indicar o problema.
4.  **Desinstalar e Reinstalar o PWA (Para App Instalado):** Se estiver usando o PWA instalado e os problemas persistirem, desinstalar e reinstalar o aplicativo pode resolver.
    * **⚠️ ATENÇÃO:** Conforme avisado na seção "Como Desinstalar o Aplicativo", esta ação **APAGARÁ PERMANENTEMENTE** todos os projetos e árvores que você cadastrou localmente. Certifique-se de ter backups (CSV)!
    * Siga as instruções de desinstalação para seu sistema (Android, iOS, Desktop) na seção correspondente do README. Após desinstalar, instale o PWA novamente.
5.  **Limpar Dados do Site Manualmente (Alternativa / Navegador):** Como alternativa à reinstalação do PWA ou para problemas no navegador, você pode limpar os dados manualmente.
    * Abra as Ferramentas do Desenvolvedor (`F12`).
    * Vá para a aba "Application" (Aplicativo) -> "Storage" (Armazenamento).
    * Clique no botão **"Clear site data"** (Limpar dados do site).
    * **⚠️ ATENÇÃO:** Esta ação também **APAGARÁ PERMANENTEMENTE** todos os dados locais. Faça backup (CSV)!
    * Após limpar, recarregue a página ou reabra o PWA.
6.  **Desativar Extensões (Menos comum para PWA):** Extensões do navegador podem interferir. Tente desativá-las temporariamente.

Se o problema persistir após seguir estes passos, considere reportar um erro (veja a seção "Desenvolvedor, Contribuição e Reportar Erros").

---

## Planos Futuros (Ideias)

* Sincronização de dados com a nuvem (requer backend e autenticação).
* Importação de dados.
* Melhorias na interface e usabilidade.
* Mapas interativos.

---

## Desenvolvedor, Contribuição e Reportar Erros

* **Desenvolvido por:** Pedro Higuchi
* Como este é um projeto em desenvolvimento, feedback e relatos de bugs são bem-vindos. Você pode:
    * Abrir uma "Issue" no repositório do GitHub: [https://github.com/higuchip/inventario_app/issues](https://github.com/higuchip/inventario_app/issues)
    * Entrar em contato via email: higuchip@gmail.com

---

## Licença

Este projeto é distribuído sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes (se existir no repositório).