// --------------------------------------------------------------------------------------    
//                                                            CONFIGURAÇÕES DO SERVIDOR -
// -------------------------------------------------------------------------------------- 

// Dependências
const http = require("http");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();

// API busca-cep
var buscaCep = require('busca-cep');

// Body Parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Permissão aos dados da pasta public
app.use(express.static(path.join(__dirname, 'public')));

// Carrega página inicial ao entrar no link
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname+ '/public/index.html'));
});

http.createServer(app).listen(3000, () => 
    console.log("Servidor rodando local na porta 3000"));
    

// --------------------------------------------------------------------------------------    
//                                                                                ROTAS -
// -------------------------------------------------------------------------------------- 

/* ------------------------------ Tratamento do CEP ----------------------------------- */
app.post("/validarCEP", function(req, res) {

    // Recupera o cep do front
    let cep = req.body.CEP;

    // Faz a busca pelos correios
   buscaCep(cep, {sync: false, timeout: 1000}) 

   // Endereço encontrado
    .then(endereco => {

        // Envia dados pro front 
        res.send({
            "CEP": endereco.cep,
            "Logradouro": endereco.logradouro,
            "Bairro": endereco.bairro,
            "Cidade": endereco.localidade,
            "UF": endereco.uf
        });
        console.log(endereco);

    })

    // Endereço não encontrado
    .catch(erro => {
        res.send({
            "message": "CEP Inválido!"
        });
        console.log(`Erro: statusCode ${erro.statusCode} e mensagem ${erro.message}`);
  });

});
/* ------------------------------ /Tratamento do CEP ---------------------------------- */


/* --------------------------- Cálculo Renda Per Capita -------------------------------- */ 
app.post('/add', function(req, res){
    console.log(req.body);
    
    // Recupera os valores de salário
    var salBruto = (req.body.salBruto);
 
    // Armazena a soma do total dos salário
    var soma = 0;

    // Soma os valores
    for (let i = 0; i < salBruto.length; i++){
        console.log("Salario "+parseFloat(i+1)+": "+salBruto[i]);
        soma = soma + parseFloat(salBruto[i]);
    }

    // Armazena valor da renda per capita
    var rendaPC = (soma/salBruto.length).toFixed(2);
    // Verifica a quantos salários mínimos equivale a renda obtida 
    var qtdSalarios = salarioEquivalente(rendaPC);

    // Recupera dados da família
    var nome = (req.body.nome);
    var dependentes = (req.body.dependente);

    console.log("Renda per capita calculada. Resulado final: R$ "+rendaPC);

    // Envia dados pro front
    res.send({
        "Nome": nome,
        "RPC": rendaPC,
        "Salarios": qtdSalarios,
        "Dependentes": dependentes
    });
    
});
/* -------------------------- /Cálculo Renda Per Capita ------------------------------- */ 


// --------------------------------------------------------------------------------------    
//                                                                              FUNÇÕES -
// --------------------------------------------------------------------------------------

/* ------ Calcula a quantidade de salários mínimos que um certo valor representa ------ */ 
function salarioEquivalente(valor){
    var equivalencia = (parseFloat(valor)/998).toFixed(0);

    return equivalencia;
}
/* ----- /Calcula a quantidade de salários mínimos que um certo valor representa ------ */ 