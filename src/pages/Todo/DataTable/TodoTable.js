import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { getTodoList } from '../services';
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
    },
    {
        title: 'Description',
        dataIndex: 'description',
    },
    {
        title: 'CreatedAt',
        dataIndex: 'createdAt',
    },
];

const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
};

const TodoTable = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        async function listOfTodos() {
            const data = await getTodoList()
            const newData = data.data.map(({ id, attributes }) => ({ id, ...attributes }))
            setData(newData)
        }
        listOfTodos()
    }, [])

    return <Table
        bordered
        columns={columns}
        dataSource={data}
        size='small'
        pagination={false}
        onChange={onChange}
        showSorterTooltip={{
            target: 'sorter-icon',
        }}
    />
}

export default TodoTable;