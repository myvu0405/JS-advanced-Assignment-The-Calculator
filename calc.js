const screenCalc=document.getElementById('screenCalc');
const currentInput=document.getElementById('currentInput');
const numberBtns=document.querySelectorAll('[number]');
const operators=document.querySelectorAll('[operator]');
const resetBtn=document.querySelector('[reset]');
const delBtn=document.querySelector('[delete]');
const equalBtn=document.querySelector('[equal]');

const numArr=[];
const operArr=[];
let exprArr=[];

//when clicking number buttons
numberBtns.forEach((button)=> button.addEventListener('click', ()=>{
    currentInput.innerText+=button.innerHTML;

}));

//when clicking operator buttons + - * /
operators.forEach((button) =>button.addEventListener('click', ()=>{
    screenCalc.innerText =screenCalc.innerText+currentInput.innerText+button.innerText;
    numArr.push(parseInt(currentInput.innerText));
    operArr.push(button.innerText);
    //set expression
    exprArr.push(parseInt(currentInput.innerText));
    exprArr.push(button.innerText);
    
    currentInput.innerText='';
}));

//when clicking reset button AC
resetBtn.addEventListener('click', ()=>{
    screenCalc.innerText ='';
    currentInput.innerText='';
    exprArr=[];
});

//when clicking delete button DEL
delBtn.addEventListener('click', ()=>{
    if (currentInput.innerText) {
        currentInput.innerText=currentInput.innerText.slice(0,-1);
    }
})

//when clicking equal button =
equalBtn.addEventListener(('click'), ()=>{
    screenCalc.innerText =screenCalc.innerText+currentInput.innerText;
    exprArr.push(parseInt(currentInput.innerText));
    calcAction();
    currentInput.innerHTML=exprArr;
})

function calcAction(){
    let result =0;
    let operPriority=['*','/','+','-'];
    //console.log(exprArr);//test input expression.
    let idx; 
    for (let i=0; i<operPriority.length;i++){
        for (let j=0;j<exprArr.length;j++){
            if(exprArr[j]===operPriority[i]) {
                console.log('test1');
                switch(operPriority[i]){
                    case '*':
                        exprArr.splice(j-1,3,exprArr[j-1]*exprArr[j+1]);
                        break;
                    case '/':
                        exprArr.splice(j-1,3,exprArr[j-1]/exprArr[j+1]);
                        break;
                    case '+':
                        console.log('test2');
                        let t=exprArr[j-1]+exprArr[j+1];
                        console.log(t);
                        exprArr.splice(j-1,3,t);
                        
                        break;
                    case '-':
                        exprArr.splice(j-1,3,exprArr[j-1]-exprArr[j+1]);
                        break;
                    default:
                        break;
                }
                j--;//update index
            }
        
        }
        

        
    }
   
}