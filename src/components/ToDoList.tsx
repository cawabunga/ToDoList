import React, {useEffect} from 'react';
import {Divider, List} from 'antd';
import {ToDoListHeader} from './ToDoListHeader';
import {ToDo} from './ToDo';
import {useTodoList} from "../app/useTodoList";
import {serialize} from "../app/todoListStateSerializer";
import {useTodoListStorage} from "../app/useTodoListStorage";
import {useTodoListSelector} from "../app/useTodoListSelector";
import {makeTodoEntity} from "../app/TodoEntity";

export interface ITodo {
    todo: string;
    key: React.Key;
}

const defaultTodoItems = [
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
];


export const ToDoList = () => {
    const {state, populateList, addTodoItem, updateTodoItem, removeTodoItem} = useTodoList();
    const {write, read} = useTodoListStorage();
    const todoItems = useTodoListSelector(state);

    useEffect(() => {
        const data = read();
        populateList(data ?? defaultTodoItems);
    }, []);

    useEffect(() => {
        write(serialize(state));
    }, [write, state]);

    const addToDo = (todo: ITodo): void => {
        addTodoItem(todo);
    }

    const deleteClickHandler = (keyEl: React.Key) => {
        removeTodoItem(keyEl);
    }

    const setUpdate = (todoText: string, keyEL: React.Key) => {
        updateTodoItem(makeTodoEntity(keyEL, todoText));
    }

    return (
        <div className='width_40'>
            <Divider orientation="left">My ToDo List</Divider>
            <List
                size="large"
                header={<ToDoListHeader addToDo={addToDo} />}
                bordered
                dataSource={todoItems}
                renderItem={item => <ToDo item={item}
                    deleteClickHandler={() => deleteClickHandler(item.key)}
                    setUpdate={setUpdate} />}
            />
        </div>)
}