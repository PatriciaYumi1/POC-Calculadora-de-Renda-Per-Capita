$(document).ready(function() {
    console.log("Página carregada com sucesso!");

    var cont = 1;
    var index = 1;
    var indexA = 1;

    // Chama função para adicionar uma nova pessoa no grupo familiar
    $("#btnCEP").click(function() {
        procurarCEP();
    });

    // Chama função para adicionar uma nova pessoa no grupo familiar
    $("#addPessoa").click(function() {
        cont++;
        inserirMembro(cont);
    });

    // Chama função para remover uma pessoa do grupo familiar
    $("#remImput").click(function() {
        removerMembro($(this));
    });

    // Enviar formulário para fazer o cálculo da renda
    $("#dadosForm").click(function() {
        // Verifica se algum dos campos obrigatórios está vazio
        var check = verificaVazios(index, indexA);

        if (check != 0){
            alert("Favor preencher todos os campos obrigatórios! ");
        }else{ 
                console.log("Formulário pronto para envio!");
                enviarForm();
        }                    
    });

});

// --------------------------------------------------------------------------------------    
//                                                                              FUNÇÕES -
// --------------------------------------------------------------------------------------

/* ---------------------------------- Procurar CEP ----------------------------------- */
function procurarCEP(){

    console.log("Verificando CEP...");

    var options = {
        success:    function(data) { 
            // Converte os dados enviados em JSON pelo backend
            var dados = jQuery.parseJSON(JSON.stringify(data));

            // Exibe os dados do endereço encontrado em seus respectivos inputs
            $("#cep").val(dados.CEP);

            $("#logradouro").val(dados.Logradouro);
            $("#bairro").val(dados.Bairro);
            $("#localidade").val(dados.Cidade);
            $("#uf").val(dados.UF);
        },
        error: function(error) {
            // Converte os dados enviados em JSON pelo backend
            var erro = JSON.parse(error.responseText);
            alert(erro.message);
        },
        uploadProgress: function(e, position, valortotal, complete) {
            // Barra de carregamento
        }
    };

    // Submete o formulário - método POST
    $("#formCEP").ajaxSubmit(options);
}
/* ----------------------------------------------------------------------------------- */

/* ------------------- Adicionar uma nova pessoa no grupo familiar ------------------- */
function inserirMembro(a){

    // Variável armazena o número do novo membro inserido
    var title = ("Membro "+a);

    // Adiciona dinamicamente form de novo membro para preenchimento
    $(  "<hr>"+"<img src="+"img/icons8-standing-man-64.png"+" class="+"img-man"+">"+
        "<div class="+"container"+" id="+"titulo-dinamico"+">"+"<div class="+"text-left"+">"+"<h5>"+title+"</h5></div></div>"+
        
        "<div class="+"row"+">"+
            "<div class="+"col-md-2"+"><label for="+"nome"+">Nome Completo</label></div>"+
            "<div class="+"col-md-10"+"><input type="+"text"+" name="+"nome"+ " id="+"nome"+ " class="+"input-size"+"></div>"+
            "</div> <!-- Fim row-->"+
        
        "<div class="+"row"+">"+  
            "<div class="+"col-md-2"+">"+
                "<label for="+"salBruto"+">Salário Bruto (R$)<span class="+"obrigatorio"+">*</span></label></div>"+

            "<div class="+"col-md-3"+">"+
                "<input type="+"text"+" name="+"salBruto"+" id="+"salBruto"+" class="+"input-size"+"></div>"+

            "<div class="+"col-md-3"+">"+
                "<label for="+"dependente"+">Quantidade de Dependentes<span class="+"obrigatorio"+">*</span></label></div>"+

            "<div class="+"col-md-1"+">"+
                "<input type="+"text"+" name="+"dependente"+" id="+"dependente"+" class="+"input-size"+"></div>"+

            "<div class="+"col-md-3"+">"+"<div class="+"text-right"+">"+
                "<button type="+"button"+" id="+"remImput"+" class="+"btn-busca-cep"+">Remover</button></div>"+
        "</div></div><!-- Fim row--></div>"
    ).appendTo("#dynamicDiv");

    console.log("Novo membro adicionado. Total de pessoas: "+a+".");

    return false;
}
/* ----------------------------------------------------------------------------------- */

/* ------------------- Remover uma nova pessoa no grupo familiar --------------------- */
function removerMembro(b){
    alert("Funcionalidade ainda não implementada!");
}
/* ----------------------------------------------------------------------------------- */

/* ---------------------- Verifica campos vazios no formulário ----------------------- */
function verificaVazios(i, j){
    // Transforma o formulário CEP em array
    var fatEndereco = $("#formCEP").serializeArray();
    console.log(fatEndereco);

    // Transforma o formulário Família em array
    var fatFamily = $("#formFamilia").serializeArray();
    console.log(fatFamily);

    // Loop verifica se o formulário contendo os dados do endereço está vazio
    for(var m = 0; m < fatEndereco.length; m++){
        if (fatEndereco[m].name == "CEP" && fatEndereco[m].value === ""){
            console.log("O campo "+fatEndereco[m].name+" está vazio!");
            i = 1;
            break;
        }else if (fatEndereco[m].name == "Logradouro" && fatEndereco[m].value === ""){
            console.log("O campo "+fatEndereco[m].name+" está vazio!");
            i = 1;
            break;
        }else if (fatEndereco[m].name == "Bairro" && fatEndereco[m].value === ""){
            console.log("O campo "+fatEndereco[m].name+" está vazio!");
            i = 1;
            break;
        }else if (fatEndereco[m].name == "Cidade" && fatEndereco[m].value === ""){
            console.log("O campo "+fatEndereco[m].name+" está vazio!");
            i = 1;
            break;
        }else if (fatEndereco[m].name == "UF" && fatEndereco[m].value === ""){
            console.log("O campo "+fatEndereco[m].name+" está vazio!");
            i = 1;
            break;
        }
        else if (fatEndereco[m].name == "Numero" && fatEndereco[m].value === ""){
            console.log("O campo "+fatEndereco[m].name+" está vazio!");
            i = 1;
            break;
        }else{
            i = 0;
        }
    }

    // Loop verifica se algum dos campos obrigatórios do formulário família está vazio
    for(var x = 0; x < fatFamily.length; x++){
        if (fatFamily[x].name == "salBruto" && fatFamily[x].value === ""){
            console.log("O campo "+fatFamily[x].name+" está vazio!");
            j = 1;
            break;
        }else if (fatFamily[x].name == "dependente" && fatFamily[x].value === ""){
            console.log("O campo "+fatFamily[x].name+" está vazio!");
            j = 1;
            break;
        }else{
            j = 0;
        }
    }
    return i+j;
    
}
/* ----------------------------------------------------------------------------------- */

/* -------------- Envia dados para fazer o cálculo da renda per capita --------------- */
function enviarForm() {

    console.log("Calculando a renda...");

    var options = {
        success:    function(data) { 
            // Converte os dados enviados em JSON pelo backend
            var dados = jQuery.parseJSON(JSON.stringify(data));

            // Exibe div com os resultados
            $( ".show" ).css({display: "inline-block"});

            // Escreve o endereço na tela
            exibeEndereco();

            // Escreve a quantidade de salários por pessoa na tela
            $("<h5>Cada integrante da sua família recebe o equivalente a "+dados.Salarios+" salários mínimos.</h5>").appendTo("#results-salarios");

            // Lista os membros da família e a renda de cada um 
            for (var i = 0; i < dados.Nome.length; i++){
                if (dados.Nome[i] !== "")
                    $("<tr>"+
                    "<td>"+i+"</td>"+ 
                    "<td>"+dados.Nome[i]+"</td>"+
                    "<td>"+dados.RPC+"</td>"+
                    "<td>"+dados.Dependentes[i]+"</td>"+
                    "</tr>").appendTo("#tabela-dinamina");     
                else //se o nome
                    $("<tr>"+
                    "<td>"+i+"</td>"+ 
                    "<td>Membro "+i+"</td>"+
                    "<td>"+dados.RPC+"</td>"+
                    "<td>"+dados.Dependentes[i]+"</td>"+
                    "</tr>").appendTo("#tabela-dinamina");                                            
            }         
        },
        error: function(error) {
            var erro = JSON.parse(error.responseText);
            alert("Erro: " + erro.message);
        },
        uploadProgress: function(e, position, valortotal, complete) {
            // barra de carregamento
        }
    };
    
    // Submete o formulário - método POST
    $("#formFamilia").ajaxSubmit(options);
}
/* ----------------------------------------------------------------------------------- */

/* -------------------------------- Mostra Endereço ---------------------------------- */
function exibeEndereco(){
    // Converte formulário para array
    var arrayEndereco = $("#formCEP").serializeArray();
    console.log(arrayEndereco);

    // Escreve endereço na tela
    $("<p> A renda foi calculada para os residentes do lar localizado no endereço "+ arrayEndereco[1].value+", nº "+arrayEndereco[2].value+", "+arrayEndereco[3].value+" - CEP: "+arrayEndereco[0].value+" / "+arrayEndereco[4].value+" ("+arrayEndereco[4].value+") </p>").appendTo("#results-endereco");
}
/* ----------------------------------------------------------------------------------- */
