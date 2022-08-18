const loginForm = document.querySelector('form')

function createUserRequest(e) {
    const formData = new FormData(e.target)
    const newUser = JSON.stringify(Object.fromEntries(formData.entries()))
    return newUser
}

loginForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const loginData = createUserRequest(e)

    fetch("/users/login", {
        method: "POST",
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: loginData
    }).then(res => {
        if (res.error) {
            console.log('Something went wrong')
        } else {
            console.log("Request complete! response:", res);
        }
    });

})
