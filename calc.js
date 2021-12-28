const screenCalc=document.getElementById('screenCalc');
const currentInput=document.getElementById('currentInput');
const numberBtns=document.querySelectorAll('[number]');
const operators=document.querySelectorAll('[operator]');
const resetBtn=document.querySelector('[reset]');
const delBtn=document.querySelector('[delete]');
const equalBtn=document.querySelector('[equal]');

let exprArr=[];
let isDone=false;

//when clicking number buttons
numberBtns.forEach((button)=> button.addEventListener('click', ()=>{
    if(isDone){//erase result of the last calculation if any.
        
        screenCalc.innerText='';
        isDone=false;
    }
    if(currentInput.innerText.indexOf('.')<0){    
        currentInput.innerText+=button.innerHTML;
    }
    else if (button.innerHTML.indexOf('.')<0){//only accept one '.' in a number
        currentInput.innerText+=button.innerHTML;

    }

}));

//when clicking operator buttons + - * /
operators.forEach((button) =>button.addEventListener('click', ()=>{

    
    if(currentInput.innerText!='') {//prevent pressing redundant operators at once
        screenCalc.innerText =screenCalc.innerText+currentInput.innerText+button.innerText;
        
        //set expression
        exprArr.push(Number(currentInput.innerText));
        exprArr.push(button.innerText);
        currentInput.innerText='';
    }
    
    
}));

//when clicking reset button AC
resetBtn.addEventListener('click', ()=>{
    screenCalc.innerText ='';
    currentInput.innerText='';
    exprArr=[];
    isDone=false;
});

//when clicking delete button DEL
delBtn.addEventListener('click', ()=>{
    if (currentInput.innerText) {
        currentInput.innerText=currentInput.innerText.slice(0,-1);
    }
})

//when clicking equal button =
equalBtn.addEventListener(('click'), ()=>{
    
    if (exprArr.length>0) {
        
        screenCalc.innerText =screenCalc.innerText+currentInput.innerText;
        if (currentInput.innerText!='') {
            exprArr.push(Number(currentInput.innerText));
        }
        calcAction();
        screenCalc.innerText=exprArr[0];
        currentInput.innerText='';
        exprArr=[];
    }
    else screenCalc.innerText= '';
    isDone=true;
})

function calcAction(){
    
    let operPriority=['*','/','+','-'];

    if (operPriority.indexOf(exprArr[exprArr.length-1])>=0)
    {
        
        exprArr.splice(-1);//remove redundant operator at the end of the expression
    }
      
    for (let i=0; i<operPriority.length;i++){
        for (let j=0;j<exprArr.length;j++){
            if(exprArr[j]===operPriority[i]) {
                
                switch(operPriority[i]){
                    case '*':
                        exprArr.splice(j-1,3,exprArr[j-1]*exprArr[j+1]);
                        break;
                    case '/':
                        exprArr.splice(j-1,3,exprArr[j-1]/exprArr[j+1]);
                        break;

                    case '+':                        
                        exprArr.splice(j-1,3,exprArr[j-1]+exprArr[j+1]);                        
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