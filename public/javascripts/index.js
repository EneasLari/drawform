var sidelnks = document.getElementsByClassName("linkheader");
var currentvisible = document.getElementsByName("targetid")[0];
for (let index = 0; index < sidelnks.length; index++) {
    const element = sidelnks[index];
    if (element.id) {
        console.log("currentvisible")


        element.addEventListener("click", function() {
            if (currentvisible) {
                currentvisible.style.display = "none";
            }
            maketargetVsible(element.id)
        })
    }

}

function maketargetVsible(buttonid) {
    var elementtomakevisible = document.getElementsByName(buttonid)[0];
    elementtomakevisible.style.display = "block";
    currentvisible = elementtomakevisible;
    console.log(currentvisible)
}



var signout = document.getElementsByClassName("signoutuser")[0];
signout.addEventListener("click", function(event) {
    event.preventDefault();
    sessionStorage.removeItem('jwt')
        // Make a request for a user with a given ID
    axios.get('http://localhost:5000/' + 'auth/signout')
        .then(function(response) {
            // handle success
            console.log(response);
        })
        .catch(function(error) {
            // handle error
            console.log(error);
        })
        .then(function() {
            // always executed
            window.location.replace("/");
        });
})


var afterloggedin = document.getElementsByClassName("userprop");
for (let index = 0; index < afterloggedin.length; index++) {
    const element = afterloggedin[index];
    if (sessionStorage.getItem("jwt")) {
        for (let index = 0; index < document.getElementsByClassName("signin").length; index++) {
            const element = document.getElementsByClassName("signin")[index];
            element.style.visibility = "hidden"
        }
        document.getElementsByClassName("loggeduser")[0].innerHTML = sessionStorage.getItem("userlogged");
        element.style.display = "block";
    } else {
        element.style.display = "none";
    }
}