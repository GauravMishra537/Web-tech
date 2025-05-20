/* let input=document.getElementById('inputBox');
let buttons=document.querySelectorAll('button');

let string="";
let arr=Array.from(buttons);
arr.forEach(button =>{
    button.addEventListener('click',(e) =>{
        if(e.target.innerHTML =='='){
            string=eval(string);
            input.value=string;
        }
        else if(e.target.innerHTML=='AC'){
            string="";
            input.value = string;
        }
          else if(e.target.innerHTML=='DEL'){
            string=string.substring(0,string.length-1);
            input.value = string;
        }
        else{
        string +=e.target.innerHTML;
        input.value=string;
        }

    })
})
*/
let input = document.getElementById('inputBox');
let buttons = document.querySelectorAll('button');

let string = "";
let arr = Array.from(buttons);

arr.forEach(button => {
    button.addEventListener('click', (e) => {
        let value = e.target.innerText.trim(); // Trim removes any extra spaces

        if (value === '=') {
            string = string.replace(/(\d+)\s*%\s*(\d+)/g, "($1/100 * $2)");
            string = string.replace(/(\d+)%/g, "($1/100)");
            
            try {
                string = eval(string);
                input.value = string;
            } catch (error) {
                input.value = "Error";
            }
        } else if (value === 'AC') {
            string = "";
            input.value = string;
        } else if (value === 'DEL') {
            string = string.substring(0, string.length - 1);
            input.value = string;
        } else {
            string += value;
            input.value = string;
        }
    });
});

