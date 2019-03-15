$(document).ready(function() {
    alert("Página carregada");
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

    // Enviar formulário para fazer o cálculo da renda
    $("#dadosForm").click(function() {
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
            // barra de carregamento
        }
    };

    // Submete o formulário - método POST
    $("#formCEP").ajaxSubmit(options);
}
/* --------------------------------- /Procurar CEP ----------------------------------- */

/* ------------------- Adicionar uma nova pessoa no grupo familiar ------------------- */
function inserirMembro(a){

    // Variável armazena o número do novo membro inserido
    var title = ("Membro "+a);

    // Adiciona form de novo membro para preenchimento
    $(  "<hr>"+"<img src="+"img/icons8-standing-man-64.png"+" class="+"img-man"+">"+
        "<div class="+"container"+" id="+"titulo-dinamico"+"><h5>"+title+"</h5></div>"+
        
        "<div class="+"row"+">"+
            "<div class="+"col-md-2"+"><label for="+"nome"+">Nome Completo</label></div>"+
            "<div class="+"col-md-7"+"><input type="+"text"+" name="+"nome"+ " id="+"nome"+ " class="+"input-size"+"></div>"+
            "</div> <!-- Fim row-->"+
        
        "<div class="+"row"+">"+
                     
            "<div class="+"col-md-2"+">"+
                "<label for="+"salBruto"+">Salário Bruto (R$)</label></div>"+

            "<div class="+"col-md-3"+">"+
                "<input type="+"text"+" name="+"salBruto"+" id="+"salBruto"+" class="+"input-size"+"></div>"+

            "<div class="+"col-md-3"+">"+
                "<label for="+"dependente"+">Quantidade de Dependentes</label></div>"+

            "<div class="+"col-md-1"+">"+
                "<input type="+"text"+" name="+"dependente"+" id="+"dependente"+" class="+"input-size"+"></div>"+

            "<div class="+"col-md-1"+">"+
                "<button type="+"button"+" id="+"remImput"+" class="+"btn-busca-cep"+">Remover</button></div>"+

            "</div><!-- Fim row--></div>"
    ).appendTo("#dynamicDiv");

    console.log("Novo membro adicionado. Total de pessoas: "+a+".");

    return false;
}
/* ------------------ /Adicionar uma nova pessoa no grupo familiar ------------------- */

// Remover uma nova pessoa no grupo familiar
function removerMembro(){
    /*$(document).on("click", "#"+removeBtn, function() {
            $(this).parents('p').remove();
            return false;
        });*/
}

/* ----------------------- Verifica campos vazios no formulário ----------------------- */
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
/* ---------------------- /Verifica campos vazios no formulário ----------------------- */

/* -------------- Envia dados para fazer o cálculo da renda per capita -------------- */
function enviarForm() {

    console.log("Calculando a renda...");

    var options = {
        success:    function(data) { 
            // Converte os dados enviados em JSON pelo backend
            var dados = jQuery.parseJSON(JSON.stringify(data));

            $( ".show" ).css({display: "block"});

            exibeEndereco();

            $("<span>Cada integrante da sua família recebe o equivalente a "+dados.Salarios+" salários mínimos.</span>").appendTo("#results-salarios");

            // Lista os membros da família e a renda de cada um 
            
            for (var i = 0; i < dados.Nome.length; i++){
                if (dados.Nome[i] !== "")
                    $("<tr>"+
                    "<td>"+i+"</td>"+ 
                    "<td>"+dados.Nome[i]+"</td>"+
                    "<td>"+dados.RPC+"</td>"+
                    "<td>"+dados.Dependentes[i]+"</td>"+
                    "</tr>").appendTo("#tabela-dinamina");     
                else
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
        $("#formFamilia" ).ajaxSubmit(options);
    
}
/* ------------- /Envia dados para fazer o cálculo da renda per capita -------------- */

function exibeEndereco(){
    
    var arrayEndereco = $("#formCEP").serializeArray();
    console.log(arrayEndereco);

    
    
    $("<span> "+ arrayEndereco[1].value+", "+arrayEndereco[2].value+" - CEP: "+arrayEndereco[0].value+" / "+arrayEndereco[3].value+" ("+arrayEndereco[4].value+") </span>").appendTo("#results-endereco");
}
