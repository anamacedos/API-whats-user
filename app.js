/*******************************************************************************
 * Objetivo: API para manipular dados de contatos.js
 * Data: 06/02/2024
 * Autor: Ana Júlia Macedo
 * Versão: 1.0
 *******************************************************************************/

//import das bibliotecas para criar a api
const express = require('express')
const cors = require('cors')
const bodyParser = require ('body-parser')

//inicializando o express através do objeto app
const app = express()

//requeste -> Dados que chegam na API
//response -> Dados que saem da API
app.use((reques, response, next)=>{
    response.header('Access-Control-Allow-Origin', '*') // Permissão de aceso para liberar quais computadores poderão acessar a API, '*' dizendo que é publico e todos podem fazer requisições, se quisesse algo específico colocar ip
    response.header('Access-Control-Allow-Methods', 'GET') //dizendo quais são os métodos que a nossa api vai responder.

    app.use(cors()) //ativando as confugurações do cors (que é quem cuida das permissões)

    next() //dizendo que após executar as funções acima, passe para a próxima função
})


//import do arquivo de funções
const funcoesWhatsUsers = require('./modulo/funcoes') //esta global e serve para todos os endpoints

//1
//endpoint para retornar dados pessoais 

app.get('/v1/whats-users/contatos/dados/:usuario', cors(), async function (request, response){
    //chama a função que vai retornar os cursos
    let usuario = request.params.usuario
    let getDadosPessoais = funcoesWhatsUsers.getDadosPessoais(usuario)

    if (getDadosPessoais){
        response.status(200) //sucesso
        response.json(getDadosPessoais)
    }else{
        response.status(404) //not found
        response.json({'status': 404, 'message':'Não foi possível encontrar nenhum item de retorno'})
    }
})

//2
// endpoint para listar todos os dados da conta
app.get('/v1/whats-users/contatos/todosdados/:usuario', cors(), async function (request, response){
    //chama a função que vai retornar os cursos
    let usuario = request.params.usuario
    let getTodosDados = funcoesWhatsUsers.getTodosDados(usuario)

    if (getTodosDados){
        response.status(200) //sucesso
        response.json(getTodosDados)
    }else{
        response.status(404) //not found
        response.json({'status': 404, 'message':'Não foi possível encontrar nenhum item de retorno'})
    }
})


//3
//endpoint para listar os contatos de um usuário específico
app.get('/v1/whats-users/contatos/dadoscontato/:usuario', cors(), async function (request, response){
    //chama a função que vai retornar os cursos
    let usuario = request.params.usuario
    let getDadosContato = funcoesWhatsUsers.getDadosContato(usuario)

    if (getDadosContato){
        response.status(200) //sucesso
        response.json(getDadosContato)
    }else{
        response.status(404) //not found
        response.json({'status': 404, 'message':'Não foi possível encontrar nenhum item de retorno'})
    }
})

//4
//endpoint para listar todos os contatos e mensagens trocadas de um usuário
app.get('/v1/whats-users/contatos/todoscontatosemensagens/:usuario', cors(), async function (request, response){
    //chama a função que vai retornar os cursos
    let usuario = request.params.usuario
    let getConversasTodosContatos = funcoesWhatsUsers.getConversasTodosContatos(usuario)

    if (getConversasTodosContatos){
        response.status(200) //sucesso
        response.json(getConversasTodosContatos)
    }else{
        response.status(404) //not found
        response.json({'status': 404, 'message':'Não foi possível encontrar nenhum item de retorno'})
    }
})


//5
//endpoint que através de um filtro do usuario e o contato, retorna as mensagens entre eles

app.get('/v1/whats-users/contatos/mensagensusuariocontato/:usuario', cors(), async function (request, response){
    //chama a função que vai retornar os cursos
    let usuario = request.params.usuario
    let contato = request.query.contato
    let getConversasUsuarioEspecifico = funcoesWhatsUsers.getConversasUsuarioEspecifico(usuario, contato)

    if (getConversasUsuarioEspecifico){
        response.status(200) //sucesso
        response.json(getConversasUsuarioEspecifico)
    }else{
        response.status(404) //not found
        response.json({'status': 404, 'message':'Não foi possível encontrar nenhum item de retorno'})
    }
})


//6
//endpoint que através do usuario, contato e palavra chave, retorna a respectiva mensagem

app.get('/v1/whats-users/contatos/palavrachave/:usuario', cors(), async function (request, response){
    //chama a função que vai retornar os cursos
    let usuario = request.params.usuario
    let contato = request.query.contato
    let palavra = request.query.palavra
    let getPalavraChave = funcoesWhatsUsers.getPalavraChave(usuario, contato, palavra)

    if (getPalavraChave){
        response.status(200) //sucesso
        response.json(getPalavraChave)
    }else{
        response.status(404) //not found
        response.json({'status': 404, 'message':'Não foi possível encontrar nenhum item de retorno'})
    }
})

//para a função ouvir (aguardar requirições)
app.listen('3030', function(){
    console.log('API agauardando requisições...')
})
