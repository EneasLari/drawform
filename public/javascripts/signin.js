console.log("SIGNIN JAVASCRIPT LOGGED IN")
var form = document.getElementsByClassName("form-signin")[0]
form.onsubmit = function(e) {
    e.preventDefault();
    const siginrequest = {
        email: document.getElementsByName('email')[0].value,
        password: document.getElementsByName('password')[0].value
    };
    console.log(siginrequest)
    if (sessionStorage.getItem('jwt')) {
        sessionStorage.removeItem('jwt')
    }
    axios.post('http://localhost:5000/' + 'auth/signin', siginrequest)
        .then(res => {
            //save jwt token as cookie if given from post form
            sessionStorage.setItem('jwt', JSON.stringify(res.data.token))
            sessionStorage.setItem('userlogged', res.data.user.name)
            sessionStorage.setItem('UserID', res.data.user._id)
                // Simulate an HTTP redirect:
            window.location.replace("/");
        }).catch(err => {
            console.log(err);
        });
}