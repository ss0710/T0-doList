var d = new Date();
document.getElementById("date").innerHTML = "Date: "+d.getDate()+"/" + d.getMonth()+"/" + d.getFullYear();

var clear = document.querySelector(".clear");
var dateElement = document.getElementById("date");
var list = document.getElementById("list");
var input = document.getElementById("input");


var CHECK = "fa-check-circle";
var UNCHECK = "fa-circle-thin";
var LINE_THROUGH = "lineThrough";

let LIST, id;

let data = localStorage.getItem("TODO");

if(data){
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST); 
}else{
    LIST = [];
    id = 0;
}


function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
}


clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});


function addToDo(toDo, id, done, trash){
    
    if(trash){ return; }
    
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";
    
    const item = `<li class="item">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                  </li>
                `;
    
    const position = "beforeend";
    
    list.insertAdjacentHTML(position, item);
}

document.addEventListener("keyup",function(even){
    if(event.keyCode == 13){
        const toDo = input.value;
        
        // if the input isn't empty
        if(toDo){
            addToDo(toDo, id, false, false);
            
            LIST.push({
                name : toDo,
                id : id,
                done : false,
                trash : false
            });
            
            // add item to localstorage ( this code must be added where the LIST array is updated)
            localStorage.setItem("TODO", JSON.stringify(LIST));
            
            id++;
        }
        input.value = "";
    }
});



function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    
    LIST[element.id].done = LIST[element.id].done ? false : true;
}

function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    
    LIST[element.id].trash = true;
}

list.addEventListener("click", function(event){
    const element = event.target; 
    const elementJob = element.attributes.job.value; // complete or delete
    
    if(elementJob == "complete"){
        completeToDo(element);
    }else if(elementJob == "delete"){
        removeToDo(element);
    }
    
    localStorage.setItem("TODO", JSON.stringify(LIST));
});
