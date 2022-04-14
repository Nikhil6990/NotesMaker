showNotes();

let mybtn=document.getElementById("addnote");

mybtn.addEventListener('click',function(e){
    let mytext=document.getElementById("ctext");
    let mytitle=document.getElementById("ctitle");
    
   
    let notestitle=localStorage.getItem("notestitle");
    let notestext=localStorage.getItem("notestext");

    if(notestext==null){
        notestitleobj=[];
        notestextobj=[];
    }
    else{
      notestitleobj=JSON.parse(notestitle);
      notestextobj = JSON.parse(notestext);
    }
    
    notestitleobj.push(mytitle.value);
    notestextobj.push(mytext.value);

    localStorage.setItem("notestitle",JSON.stringify(notestitleobj));
    localStorage.setItem("notestext",JSON.stringify(notestextobj));

    mytitle.value="";
    mytext.value="";

    

    showNotes();

   // console.log(notestitleobj+" "+notestextobj);
});


function showNotes(){
    let notestitle=localStorage.getItem("notestitle");
    let notestext=localStorage.getItem("notestext");

    if(notestext==null){
        notestitleobj=[];
        notestextobj=[];
    }
    else{
      notestitleobj=JSON.parse(notestitle);
      notestextobj = JSON.parse(notestext);
    }
    
    let outputtext="";
    for(let i=0;i<notestitleobj.length;i++){
      //  console.log(notestitleobj[i]+" "+notestextobj[i]);
          outputtext+=`
          <div class="mycard mx-2 my-2 card" style="width: 18rem;">
                <div class="card-body">
                  <h5 class="card-title">${notestitleobj[i]}</h5>
                  <p class="card-text">${notestextobj[i]}</p>
                  <button id=${i} onclick="deleteNode(this.id)" class="btn btn-primary">Delete Note</button>
                </div>
              </div>
          ` ;
    }

    let noteselm =document.getElementById("notes");
    
    if(notestitleobj.length!=0){
       noteselm.innerHTML = outputtext;
    }
    else{
        noteselm.innerHTML+="Notes are not Added to Add notes Click above button!!";
    }
}

function deleteNode(index){
    let notestitle=localStorage.getItem("notestitle");
    let notestext=localStorage.getItem("notestext");

    if(notestext==null){
        notestitleobj=[];
        notestextobj=[];
    }
    else{
      notestitleobj=JSON.parse(notestitle);
      notestextobj = JSON.parse(notestext);
    }
    
    notestitleobj.splice(index,1);
    notestextobj.splice(index,1);

    localStorage.setItem("notestitle",JSON.stringify(notestitleobj));
    localStorage.setItem("notestext",JSON.stringify(notestextobj));

    showNotes();

}

let search=document.getElementById("searchNotes");

search.addEventListener("input",function(){
       let inputval=search.value;
       let mycards=document.getElementsByClassName("mycard");
       Array.from(mycards).forEach(function(ele){
           let cardtxt=ele.getElementsByTagName("p")[0].innerText;
           let cardtitle=ele.getElementsByTagName("h5")[0].innerText;
           if(cardtxt.includes(inputval) || cardtitle.includes(inputval)){
               ele.style.display="block";
           }
           else{
            ele.style.display="none";
           }
       });
});