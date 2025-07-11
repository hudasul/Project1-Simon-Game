function init(){
/*-------------------------------- Constants --------------------------------*/
// create random number between 0 and 3
const FlashedButtonID = Math.floor(Math.random() * 4)
console.log(FlashedButtonID)


/*---------------------------- Variables (state) ----------------------------*/



/*------------------------ Cached Element References ------------------------*/
const buttonsElem = document.querySelectorAll(".button")

/*-------------------------------- Functions --------------------------------*/
function flashButton(){
    for(let i = 0 ; i <buttonsElem.length; i++){
        if(Number(buttonsElem[i].id) === FlashedButtonID){
          buttonsElem[i].style.backgroundColor = "grey"
          setTimeout(() => {
          buttonsElem[i].style.backgroundColor = ""
          }, 1000); 

        }

    }
}



flashButton()

}

/*----------------------------- Event Listeners -----------------------------*/

document.addEventListener("DOMContentLoaded", init)




