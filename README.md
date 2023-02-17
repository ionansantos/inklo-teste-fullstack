## TESTE FULLSTACK INKLO

#### tela de busca de usuários no Github
> tecnológias e ferramentas usadas \
>  <code><img height="20" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/bootstrap/bootstrap.png"></code>
  <code><img height="20" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/vue/vue.png"></code>
  <code><img height="20" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/php/php.png"></code> 
> PHP, VueJS, Vite, Pinia, vueuse/motion para animação, Bootstrap, Apache, PHP.

 **./apache** _\*arquivos de configuração do apache_ \
 **./front** _\*arquivos de desenvolvimento do frontend_ \
 **./public** _\*arquivos publicos e assets_ \
 **./src** _\*arquivos da aplicação backend_ \
 **index.php** _\*carrega autoload do composer_
 
 
 ### para rodar o projeto digite os comandos a seguir:
 ```
$ git clone https://github.com/ionansantos/inklo-teste-fullstack
$ composer install
$ docker-compose up -d --build
$ docker exec -it app bash
$ chmod -R 777 src/users
 ```
 
Rodando em http://localhost:8000


### para rodar o front de desenvolvimento:
```
$ cd front
$ npm install
$ yarn dev
$ yarn build
```
Caso não tenha o Yarn instalado, execute npm install --global yarn antes de rodar os comandos acima.
