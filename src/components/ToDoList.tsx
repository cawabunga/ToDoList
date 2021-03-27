import React, { useEffect, useState } from 'react';
import { Divider, List } from 'antd';
import { ToDoListHeader } from './ToDoListHeader';
import { ToDo } from './ToDo';



export interface ITodo {
    todo: string;
    key: React.Key;
}



export const ToDoList = () => {

    const [data, setData] = useState<ITodo[]>([
        {
            todo: 'Learn GraphQL and gRPC',
            key: '16520'
        },
        {
            todo: 'Add COOKIE Notification',
            key: '16521'
        },
        {
            todo: 'Refactor last week code',
            key: '16522'
        },
        {
            todo: 'Help the dog to find itself in that holly world',
            key: '16523'
        },
        {
            todo: 'Read: Los Angeles battles huge wildfires.',
            key: '16525'
        },
    ]);

    useEffect(() => {    
        const item = window.localStorage.getItem('myToDos');
        if (item) {
            setData(JSON.parse(item));
        }
    }, []);

    useEffect(() => { 
        window.localStorage.setItem('myToDos', JSON.stringify(data));
    },[data])

    const addToDo = (todo: ITodo): void => {
        setData([...data, todo]);
    }

    const deleteClickHandler = (keyEl: React.Key) => {
        const filtered = data.filter(el => el.key !== keyEl);
        setData(filtered);
    }

    const setUpdate = (todoText: string, keyEL: React.Key) => {
        const found = data.findIndex(el => el.key === keyEL);
        setData(
            [...data.slice(0, found),
            { todo: todoText, key: keyEL },
            ...data.slice(found + 1)]
        );
    }


    return (
        <div className='width_40'>
            <Divider orientation="left">My ToDo List</Divider>
            <List
                size="large"
                header={<ToDoListHeader addToDo={addToDo} />}
                bordered
                dataSource={data}
                renderItem={item => <ToDo item={item}
                    deleteClickHandler={() => deleteClickHandler(item.key)}
                    setUpdate={setUpdate} />}
            />
        </div>)
}