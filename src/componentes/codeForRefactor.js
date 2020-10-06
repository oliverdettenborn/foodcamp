//---------------------------------------------------------------------------renderização do cardápio do foodcamp

function main (){
    inserirPratos();
    inserirBebidas();
    inserirSobremesas();
}
main();


//---------------------------------------------------------------função para ativação do botão quando seleciona 3 itens
function ativarBotao (){
    var combo = document.querySelectorAll('.selecionado');
    combo = combo.length;

    if(combo === 3){
        mudaEstiloBotao();
    };
};


//--------------------------------------------------------------------------------------função de confirmação do pedido
function confirmaPedido(){
    ativarJanelaConfirmacao();

    var arrayPedido = pegaNomeEPreço();
    var dados = pedirNomeEndereco();

    var mensagem = mensagemFinal(arrayPedido,dados);
    
    inserirLinkWhats(mensagem);
};


//-----------------------------------------------------------------função que criar a mensagem final e converte para URI
function mensagemFinal(arrayPedido,dados){
    var prato = "- Prato: " + arrayPedido[0] + "\n";
    var bebida = "- Bebida: " + arrayPedido[1] + "\n";
    var sobremesa = "- Sobremesa: " + arrayPedido[2] + "\n";
    var total = "Total: R$ " + arrayPedido[3] + "\n\n";

    var nomeCliente = "Nome: " + dados[0] + "\n";
    var enderecoCliente = "Endereço de entrega: " + dados[1];

    var textmensagem = "Olá, gostaria de fazer o pedido:\n"

    var mensagemWhats = textmensagem + prato + bebida + sobremesa + total + nomeCliente + enderecoCliente;
    return encodeURIComponent(mensagemWhats);
}


//---------------------------------------------------------------------função que insere o link do whats no botão .pedir
function inserirLinkWhats(mensagem){
    var linkFazerPedido = criarLinkWhats(mensagem);
    
    var btnPedir = document.querySelector('.pedir a');
    btnPedir.setAttribute('href', linkFazerPedido);
};



//------------------------------------------------------------função cria o link do whats app para falar com o restaurante
function criarLinkWhats(mensagem){
    var inicioLink = "https://api.whatsapp.com/send?phone=";
    var telRestaurante = "5551986442061";
    var fimLink = "&text=" + mensagem;

    return inicioLink + telRestaurante + fimLink;
}



//---------------------------------------------------função pega o nome e o preço dos itens pedidos e insere em uma array
function pegaNomeEPreço(){
    var itensNome = document.querySelectorAll('.selecionado h3');
    var itensPreço = document.querySelectorAll('.selecionado h5');

    var pratoNome = itensNome[0].innerText;
    var pratoPreco = itensPreço[0].innerText;
    insereItemCombo(pratoNome, pratoPreco);

    var bebidaNome = itensNome[1].innerText;
    var bebidaPreco = itensPreço[1].innerText;
    insereItemCombo(bebidaNome, bebidaPreco);

    var sobremesaNome = itensNome[2].innerText;
    var sobremesaPreco = itensPreço[2].innerText;
    insereItemCombo(sobremesaNome, sobremesaPreco);

    valor1 = converteNumber(pratoPreco);
    valor2 = converteNumber(bebidaPreco);
    valor3 = converteNumber(sobremesaPreco);

    var total = calculaTotal(valor1,valor2,valor3);

    return [pratoNome,bebidaNome,sobremesaNome,total];
};



//---------------------------------------------------inserção dos itens do pedido e o preço total na janela de confirmação
function insereItemCombo(span1, span2){
    var pedido = document.querySelector('.pedido');

    //criando as linhas com nome e preço do item na janela de confirmação
    var itemCombo = document.createElement('div');

    //insere o nome
    var nome = document.createElement('span');
    nome.innerText = span1;
    itemCombo.appendChild(nome);

    //insere o preço
    var preco = document.createElement('span');
    preco.innerText = span2;
    itemCombo.appendChild(preco);

    //insere a div
    pedido.appendChild(itemCombo);
};

function inserePrecoTotal(totalPedido){
    var pedido = document.querySelector('.pedido');

    //criando a linha de total na janela
    var total = document.createElement('div');
    total.setAttribute('class','total');

    //inserindo span com o nome da linha
    var nome = document.createElement('span');
    nome.innerText = "total";
    total.appendChild(nome);

    //inserindo o valor total
    var preco = document.createElement('span');
    preco.innerText = "R$ "+ totalPedido;
    total.appendChild(preco);

    //inserindo informações na linha
    pedido.appendChild(total);
}



//-----------------------------------------------------------------------convertendo o preço de string para number
function converteNumber(valor){
    valor = valor.substr(3);
    return parseFloat(valor);
};

//-------------------------------------------------------------------------------calculando o valor total do pedido
function calculaTotal(valor1,valor2,valor3){
    var totalPedido = valor1 + valor2 + valor3;
    totalPedido = totalPedido.toFixed(2);
    inserePrecoTotal(totalPedido);
    return totalPedido;
};

//-----------------------------------------------------------------------------pedindo o nome e endereço do cliente
function pedirNomeEndereco(){
    var nome = prompt("Qual o seu nome?");
    var endereço = prompt("Qual o endereço de entrega?");
    return [nome,endereço];
}

//-------------------------------------------------------------------------------------função de seleção do prato
function selecao(item, pos){
    var selecionado = item[pos];
    
    //adiciona estilo ao item selecionado:
    if(item[pos].id == "p1")
        ativaPrato1();

    else if(item[pos].id == "p2")
        ativaPrato2();

    else if(item[pos].id == "p3")
        ativaPrato3();

    else if(item[pos].id == "b1")
        ativaBebida1();

    else if(item[pos].id == "b2")
        ativaBebida2();

    else if(item[pos].id == "b3")
        ativaBebida3();

    else if(item[pos].id == "b4")
        ativaBebida4();

    else if(item[pos].id == "b5")
        ativaBebida5();

    else if(item[pos].id == "s1")
        ativaSobremesa1();

    else if(item[pos].id == "s2")
        ativaSobremesa2();

    else if(item[pos].id == "s3")
        ativaSobremesa3();
    

    
    //quando clicar em algo chama a função para confirmar se já escolheu 3 itens 
    ativarBotao();
};


function inserirPratos(){
    var i = 0;
    var loop = pratos.length;
    var sectionPratos = document.querySelector('.prato ul');

    while(i < loop){
        var pratoElement = document.createElement("li");

        //-----------------------------------------------------------id do prato
        pratoElement.setAttribute('id', pratos[i].id);

        //-----------------------------------------------------------foto do prato
        var imgPrato = document.createElement("img");
        imgPrato.setAttribute("src", pratos[i].link);
        pratoElement.appendChild(imgPrato);

        //-----------------------------------------------------------nome do prato
        var tituloPrato = document.createElement("h3");
        var nomePrato = document.createTextNode(pratos[i].prato);
        tituloPrato.appendChild(nomePrato);
        pratoElement.appendChild(tituloPrato);

        //-----------------------------------------------------------descrição do prato
        var descricaoPrato = document.createElement("p");
        var textDescricao = document.createTextNode(pratos[i].descricao);
        descricaoPrato.appendChild(textDescricao);
        pratoElement.appendChild(descricaoPrato);

        //-----------------------------------------------------------preço do prato
        var precoPrato = document.createElement("h5");
        var textPreco = document.createTextNode("R$ " + pratos[i].preço);
        precoPrato.appendChild(textPreco);
        pratoElement.appendChild(precoPrato);

        //-----------------------------------------------------------icone de check
        var iconeCheck = document.createElement('ion-icon');
        iconeCheck.setAttribute('name','checkmark-circle');
        iconeCheck.setAttribute('class','iconeCheck');
        pratoElement.appendChild(iconeCheck);

        //-----------------------------------------------------------adicionando função seleção do item li
        pratoElement.setAttribute('onclick', 'selecao(pratos, ' + i +')');

        sectionPratos.appendChild(pratoElement);
        i++;
    };
};

function inserirBebidas(){
    var i = 0;
    var loop = bebidas.length;
    var sectionBebida = document.querySelector('.bebida ul');

    while(i < loop){
        var bebidaElement = document.createElement("li");

        //-----------------------------------------------------------id da bebida
        bebidaElement.setAttribute('id', bebidas[i].id);

        //-----------------------------------------------------------foto da bebida
        var imgBebida = document.createElement("img");
        imgBebida.setAttribute("src", bebidas[i].link);
        bebidaElement.appendChild(imgBebida);

        //-----------------------------------------------------------nome da bebida
        var tituloBebida = document.createElement("h3");
        var nomeBebida = document.createTextNode(bebidas[i].prato);
        tituloBebida.appendChild(nomeBebida);
        bebidaElement.appendChild(tituloBebida);

        //-----------------------------------------------------------descrição da bebida
        var descricaoBebida = document.createElement("p");
        var textBebDescricao = document.createTextNode(bebidas[i].descricao);
        descricaoBebida.appendChild(textBebDescricao);
        bebidaElement.appendChild(descricaoBebida);

        //-----------------------------------------------------------preço da bebida
        var precoBebida = document.createElement("h5");
        var textPrecoBebida = document.createTextNode("R$ " + bebidas[i].preço);
        precoBebida.appendChild(textPrecoBebida);
        bebidaElement.appendChild(precoBebida);

        //-----------------------------------------------------------icone de check
        var iconeCheck = document.createElement('ion-icon');
        iconeCheck.setAttribute('name','checkmark-circle');
        iconeCheck.setAttribute('class','iconeCheck');
        bebidaElement.appendChild(iconeCheck);

        //-----------------------------------------------------------adicionando função seleção do item li
        bebidaElement.setAttribute('onclick', 'selecao(bebidas, ' + i +')');

        sectionBebida.appendChild(bebidaElement);
        i++;
    };
};


function inserirSobremesas(){
    var i = 0;
    var loop = sobremesas.length;
    var sectionSobremesa = document.querySelector('.sobremesa ul');

    while(i < loop){
        var sobremesaElement = document.createElement("li");

        //-----------------------------------------------------------id da bebida
        sobremesaElement.setAttribute('id', sobremesas[i].id);

        //-----------------------------------------------------------foto da sobremesa
        var imgSobremesa = document.createElement("img");
        imgSobremesa.setAttribute("src", sobremesas[i].link);
        sobremesaElement.appendChild(imgSobremesa);

        //-----------------------------------------------------------nome da sobremesa
        var tituloSobremesa = document.createElement("h3");
        var nomeSobremesa = document.createTextNode(sobremesas[i].prato);
        tituloSobremesa.appendChild(nomeSobremesa);
        sobremesaElement.appendChild(tituloSobremesa);

        //-----------------------------------------------------------descrição da sobremesa
        var descricaoSobremesa = document.createElement("p");
        var textSobremesaDescricao = document.createTextNode(sobremesas[i].descricao);
        descricaoSobremesa.appendChild(textSobremesaDescricao);
        sobremesaElement.appendChild(descricaoSobremesa);

        //-----------------------------------------------------------preço da sobremesa
        var precoSobremesa = document.createElement("h5");
        var textPrecoSobremesa = document.createTextNode("R$ " + sobremesas[i].preço);
        precoSobremesa.appendChild(textPrecoSobremesa);
        sobremesaElement.appendChild(precoSobremesa);

        //-----------------------------------------------------------icone de check
        var iconeCheck = document.createElement('ion-icon');
        iconeCheck.setAttribute('name','checkmark-circle');
        iconeCheck.setAttribute('class','iconeCheck');
        sobremesaElement.appendChild(iconeCheck);

        //-----------------------------------------------------------adicionando função seleção do item li
        sobremesaElement.setAttribute('onclick', 'selecao(sobremesas, ' + i +')');
        sectionSobremesa.appendChild(sobremesaElement);
        i++;
    };
};

//-----------------------------arquivo com todas as funções que fazem mudança de estilo css na página---------------------


//------------------------------função para mudar o estilo do botão ativado
function mudaEstiloBotao(){
    var botaoAtivado = document.querySelector('footer button');
    botaoAtivado.removeAttribute('disabled');
    botaoAtivado.innerText = "Fechar pedido";
    botaoAtivado.style.background = "#32B72F";
    botaoAtivado.style.padding = "15px";
    botaoAtivado.style.fontWeight = "bold";
    botaoAtivado.setAttribute('onclick','confirmaPedido()');
};

//--------------------------------função que ativa a janela de confirmação dos pedidos
function ativarJanelaConfirmacao(){
    var janelaConfirmacao = document.querySelector('.janelaConfirmacao');
    janelaConfirmacao.style.display = "flex";
};

//--------------------------------função que ativa a janela final após o pedido ser enviado ao site
function telaAgradecimento(){
    var janelaFinal = document.querySelector('.confirmacao');
    janelaFinal.style.background = "#CF2B2B";
    janelaFinal.innerHTML = "";
    janelaFinal.innerText = "REDIRECIONANDO...";
    janelaFinal.style.fontFamily = "'Righteous', cursive";
    janelaFinal.style.fontSize = "30px";
    janelaFinal.style.padding = "175px 30px";
    janelaFinal.style.color = "white";
    janelaFinal.style.fontWeight = "bold";
    janelaFinal.style.textAlign = "center";
}



//----------------------------------------funções de ativação da seleção dos itens e desmarcação dos outros -------------
function ativaPrato1(){
    //prato 1 - ON
    var selecao = document.querySelector(".prato li:nth-child(1)");
    selecao.setAttribute('class','selecionado');
    //prato 2
    var selecao = document.querySelector(".prato li:nth-child(2)");
    selecao.removeAttribute('class');
    //prato 3
    var selecao = document.querySelector(".prato li:nth-child(3)");
    selecao.removeAttribute('class');
};

function ativaPrato2(){
    //prato 1
    var selecao = document.querySelector(".prato li:nth-child(1)");
    selecao.removeAttribute('class');
    //prato 2 - ON
    var selecao = document.querySelector(".prato li:nth-child(2)");
    selecao.setAttribute('class','selecionado');
    //prato 3
    var selecao = document.querySelector(".prato li:nth-child(3)");
    selecao.removeAttribute('class');
};

function ativaPrato3(){
    //prato 1
    var selecao = document.querySelector(".prato li:nth-child(1)");
    selecao.removeAttribute('class');
    //prato 2
    var selecao = document.querySelector(".prato li:nth-child(2)");
    selecao.removeAttribute('class');
    //prato 3 - ON
    var selecao = document.querySelector(".prato li:nth-child(3)");
    selecao.setAttribute('class','selecionado');
};




//----------------------------------------ativação da seleção das bebidas e desmarcação dos outros -------------
function ativaBebida1(){
    //bebida 1 - ON
    var selecao = document.querySelector(".bebida li:nth-child(1)");
    selecao.setAttribute('class','selecionado');
    //bebida 2
    var selecao = document.querySelector(".bebida li:nth-child(2)");
    selecao.removeAttribute('class');
    //bebida 3
    var selecao = document.querySelector(".bebida li:nth-child(3)");
    selecao.removeAttribute('class');
    //bebida 4
    var selecao = document.querySelector(".bebida li:nth-child(4)");
    selecao.removeAttribute('class');
    //bebida 5
    var selecao = document.querySelector(".bebida li:nth-child(5)");
    selecao.removeAttribute('class');
};

function ativaBebida2(){
    //bebida 1
    var selecao = document.querySelector(".bebida li:nth-child(1)");
    selecao.removeAttribute('class');
    //bebida 2 - ON
    var selecao = document.querySelector(".bebida li:nth-child(2)");
    selecao.setAttribute('class','selecionado');
    //bebida 3
    var selecao = document.querySelector(".bebida li:nth-child(3)");
    selecao.removeAttribute('class');
    //bebida 4
    var selecao = document.querySelector(".bebida li:nth-child(4)");
    selecao.removeAttribute('class');
    //bebida 5
    var selecao = document.querySelector(".bebida li:nth-child(5)");
    selecao.removeAttribute('class');
};

function ativaBebida3(){
    //bebida 1
    var selecao = document.querySelector(".bebida li:nth-child(1)");
    selecao.removeAttribute('class');
    //bebida 2
    var selecao = document.querySelector(".bebida li:nth-child(2)");
    selecao.removeAttribute('class');
    //bebida 3 - ON
    var selecao = document.querySelector(".bebida li:nth-child(3)");
    selecao.setAttribute('class','selecionado');
    //bebida 4
    var selecao = document.querySelector(".bebida li:nth-child(4)");
    selecao.removeAttribute('class');
    //bebida 5
    var selecao = document.querySelector(".bebida li:nth-child(5)");
    selecao.removeAttribute('class');
};

function ativaBebida4(){
    //bebida 1
    var selecao = document.querySelector(".bebida li:nth-child(1)");
    selecao.removeAttribute('class');
    //bebida 2
    var selecao = document.querySelector(".bebida li:nth-child(2)");
    selecao.removeAttribute('class');
    //bebida 3
    var selecao = document.querySelector(".bebida li:nth-child(3)");
    selecao.removeAttribute('class');
    //bebida 4 - ON
    var selecao = document.querySelector(".bebida li:nth-child(4)");
    selecao.setAttribute('class','selecionado');
    //bebida 5
    var selecao = document.querySelector(".bebida li:nth-child(5)");
    selecao.removeAttribute('class');
};

function ativaBebida5(){
    //bebida 1
    var selecao = document.querySelector(".bebida li:nth-child(1)");
    selecao.removeAttribute('class');
    //bebida 2
    var selecao = document.querySelector(".bebida li:nth-child(2)");
    selecao.removeAttribute('class');
    //bebida 3
    var selecao = document.querySelector(".bebida li:nth-child(3)");
    selecao.removeAttribute('class');
    //bebida 4
    var selecao = document.querySelector(".bebida li:nth-child(4)");
    selecao.removeAttribute('class');
    //bebida 5 - ON
    var selecao = document.querySelector(".bebida li:nth-child(5)");
    selecao.setAttribute('class','selecionado');
};



//----------------------------------------ativação da seleção das sobremesas e desmarcação dos outros -------------
function ativaSobremesa1(){
    //sobremesa 1 - ON
    var selecao = document.querySelector(".sobremesa li:nth-child(1)");
    selecao.setAttribute('class','selecionado');
    //sobremesa 2
    var selecao = document.querySelector(".sobremesa li:nth-child(2)");
    selecao.removeAttribute('class');
    //sobremesa 2
    var selecao = document.querySelector(".sobremesa li:nth-child(3)");
    selecao.removeAttribute('class');
};

function ativaSobremesa2(){
    //sobremesa 1
    var selecao = document.querySelector(".sobremesa li:nth-child(1)");
    selecao.removeAttribute('class');
    //sobremesa 2 - ON
    var selecao = document.querySelector(".sobremesa li:nth-child(2)");
    selecao.setAttribute('class','selecionado');
    //sobremesa 3
    var selecao = document.querySelector(".sobremesa li:nth-child(3)");
    selecao.removeAttribute('class');
};

function ativaSobremesa3(){
    //sobremesa 1
    var selecao = document.querySelector(".sobremesa li:nth-child(1)");
    selecao.removeAttribute('class');
    //sobremesa 2
    var selecao = document.querySelector(".sobremesa li:nth-child(2)");
    selecao.removeAttribute('class');
    //sobremesa 3 - ON
    var selecao = document.querySelector(".sobremesa li:nth-child(3)");
    selecao.setAttribute('class','selecionado');
};