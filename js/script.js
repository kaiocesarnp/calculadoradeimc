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

const heightInput = document.querySelector("#height");
const weightInput = document.querySelector("#weight");
const calcBtn = document.querySelector("#calc-btn");
const clearBtn = document.querySelector("#clear-btn"); //inputs dos valores e botões de calcular e limpar

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
}

            //função mencionada no evento "[heightInput, weightInput].forEach"
            //Limita os caracteres apenas para números e virgula. O 'g' significa 'global', 
            //quer dizer: no texto todo. Tudo o que não for número e virgula é substituído por vazio = ""
function validDigits(text){                     
        return text.replace(/[^0-9,]/g, "")      
}            

//INICIALIZAÇÃO - do projeto, tabela de valores baseada nos dados
createTable(data);


//EVENTOS - qnd os botões começam a funcionar baseados nos inputs do usuário

            //evento para identificar modificações no input que puxa a função 'validDigits'
[heightInput, weightInput].forEach((el) => {
    el.addEventListener("input", (e) => {
        const updateValue = validDigits(e.target.value) //'e.target.value' = valor atual digitado
        e.target.value = updateValue;
    });
}); 

            //evento que puxa a funçao 'cleanInputs' e zera os valores,
            //sem reiniciar a pág através do 'e.preventDefault();' 
clearBtn.addEventListener("click", (e) => { 
     e.preventDefault();
    cleanInputs();  
})