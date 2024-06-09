# Chat Application

## Descrição

Este projeto é uma aplicação de chat em tempo real construída usando Node.js, Express, Sequelize e EJS. Ele permite que os usuários criem e participem de conversas, enviem e recebam mensagens, tudo gerenciado através de uma interface web simples.

## Funcionalidades

- **Autenticação de Usuário**: Login e cadastro de usuários.
- **Gerenciamento de Sessões**: Utiliza sessões para manter os usuários autenticados.
- **Criação de Chats**: Usuários podem criar novos chats.
- **Envio de Mensagens**: Mensagens podem ser enviadas e recebidas em tempo real.
- **Visualização de Mensagens**: Exibição das mensagens de um chat específico.
- **Armazenamento Persistente**: Utiliza MySQL para armazenamento de dados.

## Estrutura do Projeto

- `app.js`: Arquivo principal do servidor Express.
- `routes/`: Diretório contendo os arquivos de roteamento para diferentes funcionalidades.
- `models/`: Diretório contendo os modelos Sequelize para Chat e Message.
- `views/`: Diretório contendo as views EJS.
- `public/`: Diretório para arquivos estáticos (CSS, JS, imagens).

## Instalação

1. Clone o repositório:
    ```sh
    git clone https://github.com/JoseQuembi/ia-assistente.git
    cd ia-assistent
    ```

2. Instale as dependências:
    ```sh
    npm install
    ```

3. Configure o banco de dados:
    - Crie um banco de dados MySQL.
    - Renomeie o arquivo `.env.example` para `.env` e atualize as variáveis de ambiente com suas configurações do banco de dados.

4. Inicie o servidor:
    ```sh
    npm start
    ```

5. Abra o navegador e acesse `http://localhost:3000`.

## Endpoints

- `GET /chats`: Lista todos os chats.
- `POST /chats/create`: Cria um novo chat.
- `GET /chats/:slug`: Visualiza as mensagens de um chat específico.
- `POST /chats/:slug/messages`: Envia uma nova mensagem para um chat específico.

## Modelos

### Chat

- `id`: Identificador único do chat.
- `name`: Nome do chat.
- `slug`: Identificador único para o chat (URL amigável).

### Message

- `id`: Identificador único da mensagem.
- `chatId`: Identificador do chat ao qual a mensagem pertence.
- `sender`: Nome do remetente da mensagem.
- `content`: Conteúdo da mensagem.
- `timestamp`: Data e hora de envio da mensagem.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## Contato

José Quembi - [LinkedIn](https://www.linkedin.com/in/josé-quembi-353b80226) - [Email](mailto:josequembi@gmail.com)
