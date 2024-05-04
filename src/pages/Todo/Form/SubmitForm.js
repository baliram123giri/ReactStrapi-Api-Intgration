import React, { useRef, useState } from 'react';
import { Button, Form, Input } from 'antd';
import { createTodo } from '../services';
const { TextArea } = Input


const SubmitForm = () => {
    const [loading, setLoading] = useState(false)
    const formRef = useRef(null)
    const onFinish = async (values) => {
        setLoading(true)
        await createTodo({ data: values })
        // alert("Added Successfully")
        setLoading(false)
        formRef.current.resetFields()
    };

    return <Form
        ref={formRef}
        name="basic"
        onFinish={onFinish}
        autoComplete="off"
        layout='vertical'
    >
        <Form.Item
            label="Title"
            name="title"
            rules={[
                {
                    required: true,
                    message: 'Please Enter the Title!',
                },
            ]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            label="Author"
            name="author"
            rules={[
                {
                    required: true,
                    message: 'Please Enter the Author Name!',
                },
            ]}
        >
            <Input />
        </Form.Item>

        <Form.Item label="Description" name="description" rules={[{
            required: true,
            message: 'Please Enter the Description!',

        }]} >
            <TextArea />
        </Form.Item>

        <Form.Item

        >
            <Button type="primary" htmlType="submit">
                {loading ? "Loading..." : "Submit"}
            </Button>
        </Form.Item>
    </Form>
}



export default SubmitForm;