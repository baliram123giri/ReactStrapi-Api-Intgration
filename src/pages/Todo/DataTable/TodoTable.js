import React, { useContext, useEffect, useState } from 'react';
import { Button, Table } from 'antd';
import { deleteTodo, getTodoList } from '../services';
import { globlContext } from '../../../Provider/Provider';
import { REFETCH_TODO_DATA } from '../../../Provider/Actions';


const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
};

const TodoTable = () => {

    const [data, setData] = useState([])
    const [selectedRow, setSelectedRow] = useState([])
    const [loading, setLoading] = useState(false)
    //using context api
    const { dispatch } = useContext(globlContext)

    async function listOfTodos() {
        const data = await getTodoList()
        const newData = data.data.map(({ id, attributes }) => ({ id, ...attributes }))
        setData(newData)
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
        setLoading(true)
        await deleteTodo(value)
        await listOfTodos()
        setSelectedRow([])
        setLoading(false)
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
            render: (_, record) => <button onClick={async () => await singleDeleteHandler(record?.id)}> {loading ? "Loading..." : "Delete"}</button>,
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