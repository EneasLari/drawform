var sidelnks=document.getElementsByClassName("linkheader");
var currentvisible=document.getElementsByName("targetid")[0];
for (let index = 0; index < sidelnks.length; index++) {
    const element = sidelnks[index];
    if(element.id){
        console.log("currentvisible")

        
        element.addEventListener("click",function() {
            if(currentvisible){
                currentvisible.style.display="none";
            }
            maketargetVsible(element.id)
        })
    }
    
}

function maketargetVsible(buttonid)
{
    var elementtomakevisible=document.getElementsByName(buttonid)[0];
    elementtomakevisible.style.display="block";
    currentvisible=elementtomakevisible;
    console.log(currentvisible)
}