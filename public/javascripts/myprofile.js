var headerTitle = document.getElementById("headerTitle")
headerTitle.innerHTML = "";
console.log("---" + sessionStorage.getItem("userlogged"))
if (sessionStorage.getItem("userlogged")) {
    headerTitle.innerHTML = sessionStorage.getItem("userlogged");
}

var mydesigns = document.getElementById("mydesigns")
const req = {
    method: "GET",
    headers: {
        // 'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('jwt')) //json parse is important
    }
}
var designcard=document.getElementsByClassName("designcard")[0];
axios({
        method: req.method,
        url: 'http://localhost:5000/' + 'api/mydesigns/',
        headers: req.headers
    })
    .then(function (res) {
        console.log(res.data.length);
        for (let index = 0; index < res.data.length; index++) {
            const element = res.data[index];
            var newcard=designcard.cloneNode(true);
            newcard.style.display="block";
            console.log(element)
            newcard.querySelector("#shortdescription").innerHTML=element.ShortDescription;
            newcard.querySelector("#createdby").innerHTML=sessionStorage.getItem("userlogged").toString();
            newcard.querySelector("#price").innerHTML=element.Price+"€";
            designcard.parentNode.appendChild(newcard);
        }
    })
    .catch(err => {

    });