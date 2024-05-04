export const createTodo = async (values) => {
    try {
        //crreate an request to the server
        const data = await fetch(`http://localhost:1337/api/todos`, {
            method: "POST",
            body: JSON.stringify(values),
            headers: {
                "Content-Type": "application/json"
            }
        })
        return await data.json()
    } catch (error) {
        console.log(error.response)
    }
}

export const getTodoList = async () => {
    try {
        //crreate an request to the server
        const data = await fetch(`http://localhost:1337/api/todos`)
        return await data.json()
    } catch (error) {
        console.log(error.response)
    }
}