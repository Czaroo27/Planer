import React, { useEffect } from "react";
import NoPockets from "./NoPockets";
import { MdEdit } from 'react-icons/md';
import { FaRegTrashCan } from 'react-icons/fa6';
import { Button, Checkbox, Input, Kbd } from '@nextui-org/react';
import { IoCaretUp } from 'react-icons/io5';

export default function TaskList({ tasks, newTask, setNewTask, addTask, toggleTaskCompletion, currentPocket, editTask, deleteTask }) {
    useEffect(() => {
        if (!currentPocket) {
            setNewTask("");
        }
    }, [currentPocket]);

    if (!currentPocket) {
        return <NoPockets />;
    }

    const filteredTasks = tasks.filter(task => task.pocket === currentPocket.name);

    return (
        <React.Fragment>
            <div className="flex flex-col w-full p-10 h-full bg-[#f5f5f5]">
                <div className="flex flex-col justify-between h-full">
                    <div>
                        <div className='flex justify-between items-center w-full'>
                            <div className="mb-4">
                                <div className="flex items-center">
                                    <div className="text-2xl">
                                        {currentPocket.icon}
                                    </div>
                                    <div className="ml-2 text-xl font-bold">
                                        {currentPocket.name}
                                    </div>
                                </div>
                                {filteredTasks.filter((t) => !t.completed).length} out of {filteredTasks.length} tasks remaining
                            </div>
                        </div>

                        <div className='bg-white rounded-md mt-6'>
                            {filteredTasks.length > 0 ? (
                                filteredTasks.map((task) => (
                                    <div className="border p-2 mb-2 flex items-center hover:bg-[#fbfbfb] justify-between group" key={task.id}>
                                        <div className="flex items-center">
                                            <Checkbox
                                                isSelected={task.completed}
                                                onChange={() => toggleTaskCompletion(task.id)}
                                            >
                                                <div className={task.completed && "line-through"}>
                                                    {task.text}
                                                </div>
                                            </Checkbox>
                                        </div>

                                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 duration-150">
                                            <Button
                                                size='sm'
                                                color='warning'
                                                isIconOnly
                                                onPress={() => editTask(task.id)}
                                                startContent={<MdEdit fontSize={16} className='text-white' />}
                                            />
                                            <Button
                                                size='sm'
                                                color='danger'
                                                isIconOnly
                                                onPress={() => deleteTask(task.id)}
                                                startContent={<FaRegTrashCan fontSize={16} className='text-white' />}
                                            />
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No tasks available. Add tasks to this pocket below.</p>
                            )}
                        </div>
                    </div>

                    <div className='flex justify-center items-center w-full'>
                        <div className="flex items-center gap-2 w-1/2 ">
                            <Input
                                size='lg'
                                type="text"
                                placeholder="Create a new task"
                                value={newTask}
                                endContent={
                                    <Button
                                        size='sm'
                                        isIconOnly
                                        isDisabled={newTask.trim() === ""}
                                        startContent={<IoCaretUp fontSize={20} className='text-white' />}
                                        className='bg-blue-500 rounded-full'
                                        onPress={addTask}
                                    />
                                }
                                className='text-white'
                                classNames={{
                                    mainWrapper: [''],
                                    inputWrapper: 'text-white bg-[#fff] data-[focus=true]:!bg-[#eaeaea] data-[hover=true]:!bg-[#eaeaea] rounded-full',
                                    input: '!text-black placeholder:text-gray-500 px-3',
                                }}
                                onChange={(e) => setNewTask(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        addTask();
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}