# Unidades de Conservação - Hands On Work VI
Este trabalho visa codificar uma página web para ser utilizado na tarefa de Hands On Work VI

Objetivo é ser capaz de fazer Leitura, Atualização e Gravação de dados em Banco de Dados e operará em conjunto com PROGRAMMING AND DATA PERSISTENCE
Com isso realizará a complementação do trabalho realizado em Hands On Work V - Onde foi objetivo montar um website sem conexão com o Banco de dados.

```
O projeto de extensão visa promover a implantação e gestão de unidades de conservação na zona
costeira catarinense por meio da sensibilização e empoderamento dos atores envolvidos. 

Neste contexto, o trabalho da disciplina Hands On Work VI, do curso Análise e Desenvolvimento de Sistemas,
promove por meio de um desafio, a concepção de um web app para conhecimento das unidades de conservação existentes, 
assim como um canal para reportar problemas ou encaminhar sugestões, quais serão recepcionadas por administradores especialistas, 
e posteriormente encaminhadas às organizações responsáveis pela gestão das respectivas unidades de conservação.
```
---
### Feito em colaboração com: 
- https://github.com/marcusteixeirabr

---
### Tenologias Utilizadas:
- **Node.js + Express**: Express é um pacote consolidado para a gestão de Servidores HTTP e por isso foi escolhido, assim como a facilidade de pesquisa e esclarecimento de dúvidas

- **Driver mysql2**: Objetivo do trabalho é operar diretamente com o SQL e por isso não será utilizado ORM na montagem, pois ofusca e abstrai a operação com o banco de dados.

### Árvore do Projeto
```
unidades_conservacao_vi/
├── .vscode/
│   └── launch.json             # json basico gerado pelo vscode para depurar o código
├── config/
│   └── database.js             # Exporta uma conexão do Mysql através do driver mysql2
├── models/
│   ├── comunicacao.js          # Model/Serviço da tabela "Comunicacao"
│   ├── intituicao.js           # Model/Serviço da tabela "Instituicao"
│   ├── municipio.js            # Model/Serviço da tabela "Municipio"
│   ├── unidade_conservacao.js  # Model/Serviço da tabela "unidade_conservacao"
│   └── unidade_municipio.js    # Model da tabela "unidade_municipio" das relações N:M entre Unidade e Município
├── public/
│   ├── index.html              # Página principal (lista as Unidades de Conservação), servida pelo express através do static
│   ├── index.js                # Scripts da página index.html
│   ├── uc.html                 # Página de detalhe de uma Unidade de Conservação
│   ├── uc.js                   # Scripts da página uc.html
│   ├── comunicacoes.html       # Página que lista as Comunicações
│   ├── comunicacoes.js         # Scripts da página comunicacoes.html
│   ├── comunicacao.html        # Página de detalhe de uma Comunicação
│   ├── comunicacao.js          # Scripts da página comunicacao.html
│   └── style.css               # Folha de estilos que será utilizada em todas páginas html
├── routes/
│   ├── comunicados.js          # Controller de Rotas de Comunicados
│   ├── index.js                # Agregador de rotas / gerador do Router
│   └── unidades_conservacao.js # Controller de Rotas de Unidades de Conservação
├── .env                        # Arquivo que precisa ser gerado com as variáveis de ambiente do banco de dados
└── app.js                      # Ponto de entrada do servidor Express utilizado
```