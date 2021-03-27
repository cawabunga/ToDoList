import { Button, Col, Input, Row } from "antd"
import React, { useState } from "react"
import { ITodo } from "./ToDoList";


type Props = {
    addToDo: (arg0: ITodo) => void;
}

export const ToDoListHeader = ({ addToDo }: Props) => {
    const [currentToDo, setCurrent] = useState('');

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrent(e.currentTarget.value);
    }
    const addClickHandler = () => {
        if(currentToDo === "") return;
        addToDo({todo: currentToDo, key: new Date().valueOf()});
        setCurrent('');
    }

    const keyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.code === 'Enter') {
            addClickHandler();
        }
    }

    return (<Row>
        <Col span={22}>
            <Input placeholder="Write new todo"
                value={currentToDo}
                onChange={changeHandler}
                onKeyDown={keyDownHandler} />
        </Col>
        <Col span={2}>
            <Button onClick={addClickHandler}>Add</Button>
        </Col>
    </Row>

    )
}