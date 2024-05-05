import React from 'react'
import SubmitForm from './Form/SubmitForm'
import TodoTable from './DataTable/TodoTable'

const Todo = () => {
    return (
        <div>
            <div className="container mt-5">
                <div className='shadow w-50 mx-auto p-4 mb-4'>
                    <SubmitForm />
                </div>
                <TodoTable />
            </div>
        </div>
    )
}

export default Todo