const loginForm = document.querySelector('form')

function createLoginRequest(e) {
    const formData = new FormData(e.target)
    const newUser = JSON.stringify(Object.fromEntries(formData.entries()))
    return newUser
}

loginForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const loginData = createLoginRequest(e)

    fetch("/users/login", {
        method: "POST",
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: loginData
    })
        .then(res => res.json())
        .then(res => {
            if (res.error) {
                console.log('Something went wrong')
            } else {

                fetch("/tasks?sortBy=createdAt:desc", {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + res.token, 'Accept': 'application/json' },
                })
                    .then(res => res.json())
                    .then(res => {
                        if (res.error) {
                            console.log('Could not get tasks for that user')
                        } else {
                            console.log("Tasks downloaded! response:", res);
                        }
                    })
            }
        });

})
