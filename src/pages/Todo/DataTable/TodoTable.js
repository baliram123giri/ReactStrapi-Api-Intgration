import React, { useContext, useEffect, useState } from 'react';
import { Button, Table } from 'antd';
import { deleteTodo, getTodoList } from '../services';
import { globlContext } from '../../../Provider/Provider';
import { REFETCH_TODO_DATA, UPDATE_TODO_FORM_DATA } from '../../../Provider/Actions';
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
};

const TodoTable = () => {

    const [data, setData] = useState([])
    const [selectedRow, setSelectedRow] = useState([])
    const [loading, setLoading] = useState(false)
    const [isActive, setIsActive] = useState(null)

    //using context api
    const { dispatch } = useContext(globlContext)

    async function listOfTodos() {
        try {
            const data = await getTodoList()
            const newData = data.data.map(({ id, attributes }) => ({ id, ...attributes }))
            setData(newData)
        } catch (error) {
            console.log(error?.response)
        }
    }

    useEffect(() => {
        listOfTodos()
        dispatch({ type: REFETCH_TODO_DATA, payload: listOfTodos })
    }, [dispatch])

    async function deleteHandler() {
        setLoading(true)
        for (let i = 0; i < selectedRow.length; i++) {
            await deleteTodo(selectedRow[i])
        }
        await listOfTodos()
        setSelectedRow([])
        setLoading(false)
    }
    async function singleDeleteHandler(value) {
        setIsActive(value)
        setLoading(true)
        await deleteTodo(value)
        await listOfTodos()
        setSelectedRow([])
        setLoading(false)
        setIsActive(null)
    }

    async function editHandler(value) {
        dispatch({ type: UPDATE_TODO_FORM_DATA, payload: value })
    }

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
        },
        {
            title: 'Author',
            dataIndex: 'author',
        },
        {
            title: 'IsActive',
            dataIndex: 'isActive',
            render: value => <span>{value ? "True" : "False"}</span>
        },
        {
            title: 'Description',
            dataIndex: 'description',
        },
        {
            title: 'CreatedAt',
            dataIndex: 'createdAt',
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (_, record) => <div className=' d-flex  align-items-center gap-1'>
                <button className='border bg-none rounded-1 p-1 d-flex justify-content-center align-items-center' onClick={async () => await singleDeleteHandler(record?.id)}> {loading && isActive === record?.id ? "Loading..." : <MdDelete />}</button>
                <button className='border bg-none rounded-1 p-1 d-flex justify-content-center align-items-center' onClick={async () => await editHandler(record)}> <MdEdit /></button>
            </div>,
        },
    ];

    return <>
        {selectedRow?.length > 0 && <Button disabled={loading} onClick={deleteHandler} className='my-2' type="primary" danger>
            {loading ? "Loading..." : "Delete"}
        </Button>}
        <Table
            bordered
            columns={columns}
            dataSource={data}
            size='small'
            rowKey={"id"}
            rowSelection={{
                onChange(value) {
                    setSelectedRow(value)
                },
                selectedRowKeys: selectedRow
            }}

            pagination={false}
            onChange={onChange}
            showSorterTooltip={{
                target: 'sorter-icon',
            }}
        />
    </>
}

export default TodoTable;