let empArray=[];
// Api call
const request=new XMLHttpRequest();
request.open("GET","https://icanhazdadjoke.com/slack");
request.send();
request.onload=async()=>{
    let joke=JSON.parse(request.response).attachments[0].text;
    document.getElementById("bioJoke").textContent=joke;
}

// JobId generator
function generateRandomAlphaNumeric(length) {
  let result = '';
  const char= 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const num='0123456789';
  
  for (let i = 0; i < length; i++) {
    if(Math.floor(Math.random() * 2)==0){
    result += char.charAt(Math.floor(Math.random() * char.length));}
    else{
        result += num.charAt(Math.floor(Math.random() * num.length));
    }
  }  
  return result;
}

let addItem=()=>{
    //screen2 employee list
    empArray=[];
    for (let i = 0; i<localStorage.length; i++){
    let data = JSON.parse(localStorage.getItem(localStorage.key(i)));
    empArray.push(data.name.toLocaleLowerCase());
}
}

const randomString = generateRandomAlphaNumeric(6);
document.getElementById("jobId").value=randomString;

// form json store onto the localstorage
function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const value = Object.fromEntries(data.entries());
    const key=value.name.toLocaleLowerCase();
    localStorage.setItem(key, JSON.stringify(value));
    addItem();
    document.getElementById("screen1").style.display="none"; //hide form
    document.getElementById("screen2o").style.display="inline"; //display screen2
    allStorage(empArray,"empTable"); //display list
  }

  const form = document.querySelector('form');
  form.addEventListener('submit', handleSubmit);



//display in the list
function allStorage(emp,tableid) {
let table = document.getElementById(tableid).getElementsByTagName('tbody')[0];
for (let i = 0; i<emp.length; i++) {
    {
    let data = JSON.parse(localStorage.getItem(emp[i]));
    let row = table.insertRow(i);
    //img
    let imgCell=row.insertCell(0);
    let img=document.createElement('img');
    img.src="https://picsum.photos/100/150";
    imgCell.appendChild(img);
    //other
    let jobIdCell = row.insertCell(1);
    let nameCell = row.insertCell(2);
    let bioJokeCell = row.insertCell(3);    
    let buttonCell = row.insertCell(4);    
   
    jobIdCell.innerHTML = data.jobId;
    nameCell.innerHTML = data.name;
    bioJokeCell.innerHTML = data.bioJoke;

    let btn = document.createElement('button');
    btn.className = "btn btn-primary view";
    btn.id=data.name;

    btn.innerText="view";
    btn.onclick = ()=>{
        let emp=JSON.parse(localStorage.getItem(btn.id.toLocaleLowerCase()));
        document.getElementById("modal-name").innerText=emp.name;
        document.getElementById("modal-jobid").innerText="Job Id: "+emp.jobId;
        document.getElementById("modal-dept").innerText="Departmrnt: "+emp.department;
        document.getElementById("modal-salary").innerText="Salary: "+emp.salary;
        document.getElementById("modal-biojoke").innerText="Bio Joke: "+emp.bioJoke;
        document.getElementById("empModal").style.display="block";
    }
    buttonCell.appendChild(btn);
    }
}
}

document.getElementById("modal-close").addEventListener("click",()=>{
    document.getElementById("empModal").style.display="none";
});

//sort button
document.getElementById("sort").addEventListener("click",()=>{
    empArray.sort();
    document.getElementById("screen2o").style.display="none";
    document.getElementById("screen21").style.display="inline";
    allStorage(empArray,"empTableSorted");
});
//back button
document.getElementById("back1").addEventListener("click",()=>{
    location.reload();
});
document.getElementById("back2").addEventListener("click",()=>{
    location.reload();
});






