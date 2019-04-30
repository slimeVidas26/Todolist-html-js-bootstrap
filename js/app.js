 function init() {

     loadData();

     var todoText = document.getElementById("todoText");
     var todoDate = document.getElementById("myDate");
     var myButton = document.getElementById("todoAddBtn");
     myButton.addEventListener('click', getFormData);
     var item;

     function loadData() {

         var str = localStorage.getItem("todos");

         todos = JSON.parse(str);
         for (var id in todos) {

             insertNewItemToList(todos[id].text, todos[id].date);
             item.id = id;
         }



     }

     function getFormData(e) {

         var todoTextVal = document.getElementById("todoText").value;
         var todoDateVal = document.getElementById("myDate").value;




         if (todoTextVal == "") {
             e.preventDefault();
             document.getElementById("message").innerHTML = "Add new task please ";


             return false;
         } else if (todoDateVal == "") {
             e.preventDefault();
             document.getElementById("message").innerHTML = "Incorrect date";
             return false;
         } else if (Date.parse(todoDateVal) < Date.now()) {
             e.preventDefault();
             document.getElementById("message").innerHTML = "The end date you entered is before the start date.";
             return false;
         } else {
             todoTextVal = todoTextVal.trim();
             insertNewItemToList(todoTextVal, todoDateVal);

             document.getElementById("message").innerHTML = "";
             saveToLocalStorage();


         }


     }

     function insertNewItemToList(t, d) {
         var myList = document.getElementById("listItems");
         item = document.createElement('li');
         item.innerHTML = '<div class="para">' + t + '</div>';
         var rem = document.createElement('span');


         rem.className = " glyphicon glyphicon-remove";
         rem.addEventListener('click', deleteItem);
         var dateOver = document.createElement('span');
         dateOver.className = "dateEnd";
         item.className = "pull-left fade-in  ";
         myList.appendChild(item);
         item.appendChild(rem);
         item.appendChild(dateOver);
         dateOver.innerHTML = d;



     }


     function saveToLocalStorage() {

         var todoTextVal = document.getElementById("todoText").value;
         var todoDateVal = document.getElementById("myDate").value;

         var str = localStorage.getItem("todos");
         var todos;
         if (str == null) {
             console.log("Nothing in notes");
             todos = {};
         } else {
             todos = JSON.parse(str);
             console.log('got todos:', todos);
         }

         var d = new Date();
         var newId = d.getTime();
         item.setAttribute('id', newId);
         todos[newId] = {
             text: todoTextVal,
             date: todoDateVal
         }

         str = JSON.stringify(todos);
         localStorage.setItem("todos", str);


     }

     function deleteItem(e) {

         var id = e.target.parentElement.id;


         console.log("delete an item: " + id);



         var str = localStorage.getItem("todos");

         todos = JSON.parse(str);
         for (var i in todos) {

             if (i == id) {

                 delete todos[i];
             }


             localStorage.setItem('todos', JSON.stringify(todos));
         }

         // find and remove the item in the page
         var li = e.target.parentElement;
         var ul = document.getElementById("listItems");
         li.className = "pull-left fade-out";
         var opacity = 1;
         if (opacity == 0) {
             ul.removeChild(li);
             li.className = "";
         }
         setTimeout(function () {
             ul.removeChild(li);
         }, 1500);
     }

 }

 init();