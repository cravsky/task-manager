const loginForm = document.querySelector('form')

function createLoginRequest(e) {
    const formData = new FormData(e.target)
    const newUser = JSON.stringify(Object.fromEntries(formData.entries()))
    return newUser
}

loginForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const newUser = createLoginRequest(e)

    fetch("/users", {
        method: "POST",
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: newUser
    }).then(res => {
        if (res.error) {
            console.log('Something went wrong')
        } else {
            console.log("Request complete! response:", res);
        }
    });

})
