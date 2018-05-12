## Hypertag

## [0.8.0] [2018-05-12]
### adiciona melhorias
- corrige o contexto this dentro da função render
- altera os nomes das variáveis

## [0.7.0] [2018-02-19]
###

## [0.6.2] [2018-02-19]
### corrige 
- h-vue

## [0.6.0] 
#### [2018-02-08]
### inlui
- modulo para vue => h-vue

### altera

- altera parametros de entrada para 
  - setProps('name', 'nome') => setProps({'name':'nome'})
  - addStyle('display', 'grid') => addStyle({'display':'grid'})
  os modulos retorna um objeto no lugar de uma funcão

## [0.5.0]
### inclui

- métodos addStyle e delStyle para inclusão e remoção de styles

##[0.4.0]
### atualiz

mudulariza - bulma, agora h-bulma.js
remove tag personalizadas de hypertag

## [0.3.0]
### inclui
- h.use('bulma') para gerar tag personalizadas
- h.control = h('p', {'class': 'control'}, args) tag personalizada bulma
- h.button = h('p', {'class': 'button'}, args) tag personalizada bulma
- h.input = h('p', {'class': 'input'}) tag personalizada bulma
- h.field = h('div', {'class': 'field'}, args) tag personalizada bulma
- h.label = h('div', {'class': 'label'}, args) tag personalizada bulma
### remove
- h.label 

## [0.2.0]
altera a arquitetura
- restruturação de diretorio, inclui diretorio lib

## [0.1.0]
### adicionado
- tag.input
- tag.label