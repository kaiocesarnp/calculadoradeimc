//IMC DATA
const data =[
    {
        min: 0,
        max: 18.4,
        classification: "Menor que 18,5",
        info: "Magreza",
        obesity: "0",
    },
    {
        min: 18.5,
        max: 24.9,
        classification: "Entre 18,5 e 24,9",
        info: "Normal",
        obesity: "0",
    },
    {
        min: 25,
        max: 29.9,
        classification: "Entre 25,0 e 29,9",
        info: "Sobrepeso",
        obesity: "I"
    },
    {
        min: 30,
        max: 39.9,
        classification: "Entre 30,0 e 39,9",
        info: "Obesidade",
        obesity: "II",
    },
    {
        min: 40,
        max: 99,
        classification: "Maior que 40,0",
        info: "Obesidade grave",
        obesity: "III",
    },
];

//Seleção de elementos
const imcTable = document.querySelector("#imc-table"); //seleciona a tabela que aparece após os calculos de imc

    //inputs dos valores e botões de calcular e limpar
const heightInput = document.querySelector("#height");
const weightInput = document.querySelector("#weight");
const calcBtn = document.querySelector("#calc-btn");
const clearBtn = document.querySelector("#clear-btn"); 

    //containers do calculo e resultado
const calcContainer = document.querySelector("#calc-container")
const resultContainer = document.querySelector("#result-container")

const imcNumber = document.querySelector("#imc-number span");
const imcInfo = document.querySelector("#imc-info span");

    //botão voltar, quando já está na segunda tela exibindo resultados, mencionado no evento 'backBtn.addEventListener'
const backBtn = document.querySelector("#back-btn");

//Funções
function createTable(data){    //função que recebe os dados
    data.forEach((item) => {
        const div = document.createElement("div");
        div.classList.add("table-data");

        const classification = document.createElement("p"); //texto do primeiro paragráfo igual o texto da classificação do item atual, ex: 'menor que 18,5'
        classification.innerText = item.classification;

        const info = document.createElement("p");           //texto do segundo paragráfo
        info.innerText = item.info;

        const obesity = document.createElement("p");        //texto do terceiro paragráfo
        obesity.innerText = item.obesity;

        //incluindo paragráfos na div
        div.appendChild(classification);
        div.appendChild(info);
        div.appendChild(obesity);

        
        imcTable.appendChild(div); //colocando na tabela as informações
    });
}

                    //zerar valores, mencionada no evento 'clearBtn.addEventListener'
function cleanInputs(){
    heightInput.value = ""
    weightInput.value = ""  
    imcNumber.classList = "";
    imcInfo.classList = ""; 
}

            //função mencionada no evento "[heightInput, weightInput].forEach"
            //Limita os caracteres apenas para números e virgula. O 'g' significa 'global', 
            //quer dizer: no texto todo. Tudo o que não for número e virgula é substituído por vazio = ""
function validDigits(text){                     
        return text.replace(/[^0-9,]/g, "")      
} 
            //calcular o IMC, mencionada no evento 'calcBtn.addEventListener'
function calcIMC(weight, height){
    const imc = (weight/(height * height)).toFixed(1); //peso dividido por altura vezes altura. 'tofixed(1) limita o numero de caracteres pós vírgula. Obs: no resultado
    return imc;
}

            //exibir tela dos resultados e voltar para anterior
function showOrHideResults(){
        calcContainer.classList.toggle("hide");
        resultContainer.classList.toggle("hide");
}

//INICIALIZAÇÃO - do projeto, tabela de valores baseada nos dados.
createTable(data);


//EVENTOS - qnd os botões começam a funcionar baseados nos inputs do usuário

            //evento para identificar modificações no input que puxa a função 'validDigits'
[heightInput, weightInput].forEach((el) => {
    el.addEventListener("input", (e) => {
        const updateValue = validDigits(e.target.value) //'e.target.value' = valor atual digitado
        e.target.value = updateValue;
    });
}); 

            //converter valores dos inputs, que são em texto para números
calcBtn.addEventListener("click", (e) => { 
    e.preventDefault();

    const weight = +weightInput.value.replace(",", "."); //converter vírgulas em pontos, em relação às casas decimais. 
    const height = +heightInput.value.replace(",", ".");   //o '+' representa a conversão do número para o tipo correto.

    if (!weight || !height) return;  //bloqueia caso os valores não sejam preenchidos corretamente. Puxa a função 'calcIMC'
    const imc = calcIMC(weight, height)

            //variável que recebe o resultado do imc, da funçao 'calcIMC'
    let info 
    data.forEach((item) => {
        if (imc >= item.min && imc <= item.max){   //Tradução: se o imc for maior ou igual ao item mínimo ou menor ou igual ao item máximo
            info = item.info;
        }
    });

    if (!info) return; //se a info não for correspondente, retorna

            //preencher os spans
    imcNumber.innerText = imc;
    imcInfo.innerText = info;

            //feedback visual de acordo com o peso do usuário: vermelho, verde, laranja
    switch(info){
        case "Magreza":
            imcNumber.classList.add("low");
            imcInfo.classList.add("low");
            break;
        case "Normal":
            imcNumber.classList.add("good");
            imcInfo.classList.add("good");
            break;
        case "Sobrepeso":
            imcNumber.classList.add("low");
            imcInfo.classList.add("low");
            break;
        case "Obesidade":
            imcNumber.classList.add("medium");
            imcInfo.classList.add("medium");
            break;
        case "Obesidade grave":
            imcNumber.classList.add("high");
            imcInfo.classList.add("high");
            break;
    }

    showOrHideResults();
});

            //evento que puxa a funçao 'cleanInputs' e zera os valores,
            //sem reiniciar a pág através do 'e.preventDefault();' 
clearBtn.addEventListener("click", (e) => { 
     e.preventDefault();
    cleanInputs();  
});

            //voltar para o inicio, puxando a const 'backBtn'. Não pega o evento '(e)' pois não está dentro do formulário
backBtn.addEventListener("click", () => {
    cleanInputs(); //limpa os inputs para resetar o formulário
    showOrHideResults(); //retorna à tela inicial
});