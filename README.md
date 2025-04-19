# Planilha Florestal App

## Descrição

O **Planilha Florestal App** é um Progressive Web App (PWA) otimizado para a coleta e gerenciamento de dados de inventário florestal diretamente em campo. Ele permite criar projetos, registrar informações detalhadas de árvores (incluindo CAP de múltiplos troncos e coordenadas GPS), visualizar os dados coletados e exportá-los. Crucialmente, o aplicativo foi projetado para **funcionar offline** após a instalação inicial, armazenando todos os dados localmente no dispositivo do usuário, ideal para locais sem acesso à internet.

Este projeto foi desenvolvido pensando nas necessidades de engenheiros florestais, técnicos, estudantes e pesquisadores que realizam levantamentos em campo.

---

## ⚠️ **Status Atual: BETA / EXPERIMENTAL** ⚠️

**Data da Última Revisão Deste README:** 18 de abril de 2025

**ATENÇÃO:** Este aplicativo está em fase de desenvolvimento e testes (Beta). **NÃO HÁ GARANTIAS** de funcionamento perfeito ou de preservação dos dados inseridos. Podem ocorrer bugs, perda de dados ou comportamento inesperado.

**UTILIZE POR SUA CONTA E RISCO.** O desenvolvedor não se responsabiliza por qualquer perda de dados ou problemas decorrentes do uso deste aplicativo nesta fase experimental.

**Backup é Essencial:** Os dados são armazenados **localmente** no IndexedDB do seu navegador/dispositivo. Se você limpar os dados do navegador, desinstalar o aplicativo ou ocorrerem problemas no sistema, **os dados serão perdidos permanentemente**. **Recomenda-se fortemente fazer backups frequentes utilizando a função "Exportar CSV" disponível na tela de visualização de árvores.**

---

## Funcionalidades Principais

* **Gerenciamento de Projetos:** Crie e organize inventários por área e ano.
* **Coleta Detalhada de Árvores:** Registre parcela, ID customizável da árvore, espécie (com autocomplete), CAP (Circunferência à Altura do Peito - suporta cálculo para múltiplos troncos), altura, coordenadas GPS e observações.
* **Geolocalização:** Obtenha coordenadas GPS diretamente pelo dispositivo (requer permissão do usuário e sinal de GPS).
* **Armazenamento 100% Offline:** Todos os dados de projetos e árvores são salvos localmente no dispositivo usando IndexedDB.
* **Funcionamento Offline:** O aplicativo pode ser usado sem conexão com a internet após ser carregado e instalado (PWA com Service Worker).
* **Instalável (PWA):** Adicione o aplicativo à tela inicial do seu dispositivo (Android/iOS/Desktop) para acesso rápido e experiência de app nativo (sem barra de navegador).
* **Interface Adaptada para Instalação:** Botão inteligente (`install-button.js`) que oferece a opção de instalar (Android/Desktop) ou adicionar à tela inicial (iOS) com instruções claras.
* **Visualização e Edição:** Consulte, edite ou exclua dados de árvores e projetos registrados.
* **Exportação de Dados:** Exporte os dados das árvores de um projeto para um arquivo CSV (separado por ponto e vírgula, codificação UTF-8), compatível com planilhas (Excel, Google Sheets, LibreOffice Calc) e softwares de análise.

---

## Tecnologias Utilizadas

* HTML5
* CSS3
* JavaScript (Vanilla JS)
* Progressive Web App (PWA)
    * Web App Manifest (`manifest.json`)
    * Service Workers (`sw.js`) para cache e offline
    * Web Component para Botão de Instalação (`install-button.js`)
* IndexedDB API (Armazenamento no lado do cliente)
* Geolocation API (Obtenção de coordenadas GPS)
* Hospedagem: GitHub Pages (Exemplo)

---

## Estrutura dos Arquivos Principais

* `index.html`: Tela inicial (splash screen) que redireciona para os projetos. Registra o Service Worker.
* `project.html`: Página principal para visualizar, criar e gerenciar projetos de inventário. Usa o `<install-button>`.
* `inventory.html`: Formulário para cadastrar ou editar informações de uma árvore específica (CAP, espécie, GPS, etc.). Inclui lógica para múltiplos troncos e autocomplete de espécies.
* `view_trees.html`: Exibe a tabela com as árvores cadastradas para um projeto, permitindo edição, exclusão e exportação para CSV.
* `sw.js`: Service Worker responsável pelo cache dos arquivos da aplicação e pela funcionalidade offline.
* `manifest.json`: Arquivo de manifesto do PWA, define nome, ícones, cores, modo de exibição (standalone), etc.
* `install-button.js`: Web Component customizado que implementa o botão de instalação/adicionar à tela inicial, adaptando-se ao sistema operacional (Android/iOS/Desktop).
* `style.css`: Estilos básicos (embora muitas páginas usem estilos `<style>` internos).

---

## Como Acessar, Instalar e Desinstalar

### 1. Acesso via Navegador

* Acesse o aplicativo através da URL:
    * [**https://higuchip.github.io/inventario_app/index.html**](https://higuchip.github.io/inventario_app/index.html) (Substitua se hospedado em outro local)

### 2. Instalação (Recomendado para Offline e Acesso Rápido)

A instalação transforma o site em um aplicativo que você pode abrir diretamente da sua tela inicial ou área de trabalho, funcionando offline.

* **No Celular (Android) ou Desktop (Chrome/Edge):**
    1.  Abra o link acima no navegador Chrome (Android/Desktop) ou Edge (Desktop).
    2.  Procure pelo **botão "Instalar Aplicativo"** (com um ícone de download) geralmente exibido no cabeçalho da página de projetos (`project.html`).
    3.  Alternativamente, procure por um ícone de instalação na barra de endereço do navegador.
    4.  Clique no botão/ícone e confirme a instalação no prompt que aparecerá.
    5.  Um ícone será adicionado à sua tela inicial (Android) ou menu/área de trabalho (Desktop).
* **No Celular (iOS - iPhone/iPad):**
    1.  Abra o link acima no navegador **Safari**.
    2.  Procure pelo **botão "Adicionar à Tela"** (ou similar) exibido no cabeçalho da página de projetos (`project.html`).
    3.  Ao clicar nele, instruções aparecerão: toque no ícone de **Compartilhar** (quadrado com seta para cima) na barra de ferramentas do Safari.
    4.  Role para baixo nas opções de compartilhamento e toque em **"Adicionar à Tela de Início"**.
    5.  Confirme o nome e toque em "Adicionar".
    6.  Um ícone será adicionado à sua tela inicial.

### 3. Como Desinstalar o Aplicativo

* **IMPORTANTE:** Ao desinstalar o aplicativo PWA, **todos os dados armazenados localmente (projetos, árvores salvos no IndexedDB) serão PERDIDOS permanentemente**. Faça backup (Exportar CSV) antes!
* **No Celular (Android):** Pressione e segure o ícone do app > Informações do app > Desinstalar. Ou Configurações > Aplicativos > Encontre o app > Desinstalar.
* **No Celular (iOS):** Pressione e segure o ícone do app até ele tremer > Toque no "X" ou "-" > Apagar App.
* **No Desktop (Windows):** Configurações > Aplicativos > Aplicativos e recursos > Encontre o app > Desinstalar.
* **No Desktop (macOS/Linux via Chrome/Edge):** Abra o navegador > Digite `chrome://apps` ou `edge://apps` > Clique com o botão direito no ícone do app > Remover/Desinstalar > Confirme (marque para limpar dados se perguntado).

---

## Como Usar o Aplicativo (Guia Detalhado)

Após acessar ou instalar o aplicativo:

### 1. Tela Inicial (`index.html`)

* Uma tela de carregamento será exibida brevemente e redirecionará automaticamente para a tela de seleção de projetos.

### 2. Gerenciando Projetos (`project.html`)

* **Listagem:** Exibe os projetos existentes com nome (Área - Ano), data de criação e contagem de árvores.
* **Criando um Novo Projeto:**
    1.  Clique no botão "+ Novo Projeto".
    2.  Preencha "Área do Inventário" e "Ano".
    3.  Clique em "Salvar". O projeto aparecerá na lista (se não houver duplicatas de Área+Ano).
* **Ações do Projeto:**
    * `📝 Adicionar Árvore`: Leva à tela de cadastro (`inventory.html`) para *este* projeto.
    * `🔍 Ver Árvores`: Leva à tela de visualização/edição (`view_trees.html`) das árvores *deste* projeto.
    * `🗑️ Excluir`: Remove o projeto e **TODAS** as árvores associadas a ele (irreversível, requer confirmação).

### 3. Cadastrando/Editando Árvores (`inventory.html`)

* Você chegará aqui ao clicar em "Adicionar Árvore" ou "Editar" (na tela de visualização).
* **Preenchendo os Dados:**
    1.  **Parcela:** Identificador da unidade amostral.
    2.  **ID da Árvore:** Um identificador único definido por você para a árvore dentro do projeto.
    3.  **Coordenadas:** Clique em "Obter GPS" para tentar preencher automaticamente (requer permissão e sinal). O campo é somente leitura.
    4.  **Espécie:** Digite o nome. Sugestões baseadas em espécies comuns e já usadas no projeto podem aparecer.
    5.  **CAP (cm):** Insira a circunferência.
        * **Múltiplos Troncos:** Marque a caixa "Árvore com troncos múltiplos" se aplicável. Campos para inserir o CAP de cada tronco aparecerão. O CAP equivalente será calculado e preenchido automaticamente no campo CAP principal (que fica desabilitado neste modo). Use o botão "+ Adicionar tronco" e "✕" para gerenciar os CAPs individuais.
    6.  **Altura (m):** Insira a altura (opcional).
    7.  **Observação:** Qualquer informação adicional.
* **Salvando/Atualizando:**
    * Clique em "Salvar Árvore" (se for nova) ou "Atualizar Árvore" (se estiver editando).
    * Se salvou uma nova, o formulário é limpo (exceto Parcela e ID) para facilitar o próximo cadastro.
    * Se atualizou, você será redirecionado de volta para a lista (`view_trees.html`).
* **Voltando:** Clique em "Voltar ao Projeto" para ir para `project.html`.

### 4. Visualizando Árvores (`view_trees.html`)

* Você chegará aqui ao clicar em "Ver Árvores".
* **Informações do Projeto:** O nome do projeto atual é exibido no topo.
* **Tabela de Árvores:** Lista todas as árvores do projeto com seus dados. O CAP exibe a contagem de troncos se for múltiplo.
* **Ações Principais:**
    * `+ Nova Árvore`: Atalho para ir à tela de cadastro (`inventory.html`) para este projeto.
    * `↓ Exportar CSV`: Gera e baixa um arquivo `.csv` com todas as árvores do projeto atual. **Use esta função para fazer backup dos seus dados!**
    * `← Voltar`: Retorna para a tela de projetos (`project.html`).
* **Ações por Árvore (na tabela):**
    * `✎ Editar`: Leva à tela de cadastro (`inventory.html`) com os dados da árvore preenchidos para edição.
    * `✕ Excluir`: Remove a árvore permanentemente (requer confirmação).

---

## Gerenciamento de Dados e Backup (MUITO IMPORTANTE!)

* **Armazenamento 100% Local:** Todos os dados (projetos, árvores) são salvos **apenas no armazenamento local do navegador (IndexedDB) do dispositivo e perfil de usuário que você está usando**. Os dados NÃO são enviados para nenhum servidor na nuvem.
* **Risco REAL de Perda de Dados:** Se você:
    * Limpar os dados de navegação/cache/cookies do seu navegador (especificamente para este site ou todos).
    * Desinstalar o PWA (remover da tela inicial/aplicativos).
    * Usar um navegador/perfil diferente no mesmo dispositivo.
    * Tiver problemas graves no navegador, sistema operacional ou dispositivo.
    * **OS SEUS DADOS SERÃO PERDIDOS IRREVERSIVELMENTE!**
* **Backup via CSV é FUNDAMENTAL:** A **única** forma de garantir a segurança dos seus dados é exportá-los regularmente usando o botão **"Exportar CSV"** na tela "Ver Árvores". Salve esses arquivos CSV em um local seguro (computador, nuvem como Google Drive/Dropbox, pendrive, etc.). Faça isso com frequência, especialmente após dias de coleta intensiva.

---

## Funcionamento Offline

* Após acessar o aplicativo online pela primeira vez (e preferencialmente instalá-lo), o Service Worker (`sw.js`) salva os arquivos essenciais do aplicativo (HTML, CSS, JS) no cache.
* Isso permite que você abra e use o aplicativo **sem conexão com a internet**.
* Você poderá criar projetos, adicionar/editar/visualizar árvores, e todos os dados serão salvos localmente no IndexedDB.
* **Nota:** A função "Obter GPS" offline depende exclusivamente da capacidade do hardware GPS do seu dispositivo obter sinal (geralmente requer céu aberto) sem ajuda da rede (A-GPS). A exportação para CSV funciona offline, pois os dados são locais.

---

## Solução de Problemas (Troubleshooting)

* **App não carrega/comportamento estranho:**
    1.  Feche e reabra o PWA ou recarregue a página no navegador.
    2.  **Recarregamento Forçado (Hard Refresh):** No navegador desktop, tente `Ctrl+Shift+R` (Windows/Linux) ou `Cmd+Shift+R` (Mac).
    3.  **Verifique Permissões:** Nas configurações do navegador ou do sistema, certifique-se que o site/app tem permissão para acessar a Localização (GPS), se necessário.
    4.  **Limpar Dados do Site (Com Cuidado!):**
        * No navegador (Desktop/Mobile): Siga as instruções específicas do navegador para limpar dados de *um site específico* (veja seções anteriores da nossa conversa). **LEMBRE-SE: ISSO APAGARÁ OS DADOS DO APP!** Faça backup CSV antes, se possível.
        * No PWA instalado: Desinstalar e reinstalar o PWA geralmente limpa os dados. **LEMBRE-SE: ISSO APAGARÁ OS DADOS DO APP!**
    5.  **Console de Erros (Técnico):** No navegador desktop, pressione `F12` para abrir as Ferramentas do Desenvolvedor e verifique a aba "Console" por mensagens de erro em vermelho.

---

## Planos Futuros (Ideias)

* Importação de dados CSV.
* Melhorias na interface e usabilidade (UX/UI).
* Visualização de parcelas em mapa interativo.
* Validações de dados mais avançadas.

---

## Desenvolvedor, Contribuição e Reportar Erros

* **Desenvolvido por:** Pedro Higuchi
* Feedback e relatos de bugs são bem-vindos (lembre-se que é Beta):
    * Abra uma "Issue" no repositório do GitHub: [https://github.com/higuchip/inventario_app/issues](https://github.com/higuchip/inventario_app/issues)
    * Contato via email: higuchip@gmail.com

---

## Licença

Este projeto é distribuído sob a licença MIT. (Verifique se existe um arquivo `LICENSE` no repositório para detalhes completos).