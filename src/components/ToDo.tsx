import { Col, List } from "antd";
import { DeleteOutlined, EditFilled, EditOutlined } from '@ant-design/icons';
import { ITodo } from "./ToDoList";
import React, { useEffect, useRef, useState } from "react";



type Props = {
    item: ITodo,
    deleteClickHandler: () => void;
    setUpdate: (arg0: string, arg1: React.Key) => void;
}

export const ToDo = ({ item, deleteClickHandler, setUpdate }: Props) => {
    const [noneditable, setEditable] = useState<boolean>(true);
    type TRef = { current: HTMLInputElement | null };
    const ref1: TRef = useRef<HTMLInputElement>(null);

    const editClickHandler = () => {
        setEditable(prev => !prev);
    };

    useEffect(() => {
        if (!noneditable) {
            if (ref1 && ref1.current) {
                ref1.current.focus();
            }
        }
    }, [noneditable])


    return (
        <List.Item data-testid={'todo-item'}>
            <Col span={20}>
                <div className="list">
                    <p>
                        <input type="text"
                            disabled={noneditable}
                            id={item.key.toString()}
                            value={item.todo}
                            onChange={(e) => { setUpdate(e.target.value, item.key) }}
                            onBlur={() => setEditable(prev => !prev)}
                            ref={ref1}
                        />
                    </p>
                </div>
            </Col>
            <Col span={2} >
                <DeleteOutlined onClick={deleteClickHandler} className='deleteButton' />
            </Col>
            <Col span={2} >
                {noneditable ? <EditOutlined onClick={editClickHandler} /> :
                    <EditFilled twoToneColor="#eb2f96" onClick={editClickHandler} />}
            </Col>
        </List.Item>

    )
}