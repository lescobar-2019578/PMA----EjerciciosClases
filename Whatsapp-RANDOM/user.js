const getUsersWithAsync = async ()=>{
    try{
        const response = await fetch('https://randomuser.me/api/?results=10')
        const { results } = await response.json() //Desestructurar
        const users = document.getElementById('users')
        console.log(results)

        for (const user of results) {
            users.innerHTML += `
                <tr id="${user.id.name}">
                    <td>${user.name.first}</td>
                    <td>${user.asdf?.surname ?? ''}</td>
                    <td>${user.phone}</td>
                </tr>
            `
        }
    }catch(error){
        console.error(error)
    }
}

getUsersWithAsync()