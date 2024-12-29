import { Avatar, Button, Kbd } from '@nextui-org/react';
import React, { useState, useEffect } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { IoMdAdd } from 'react-icons/io';
import NewPocketModal from './NewPocketModal';

export default function Sidebar({ pockets, setPockets, setCurrentPocket, currentPocket, deleteTasksForPocket, isOpen, onOpen, onOpenChange }) {
    const [hoveredPocket, setHoveredPocket] = useState(null);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.ctrlKey && event.key === 'p') {
                event.preventDefault();
                onOpen();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onOpen]);

    const deletePocket = (pocketToDelete) => {
        if (currentPocket && currentPocket.name === pocketToDelete.name) {
            setCurrentPocket(null);
        }
        setPockets((prevPockets) => prevPockets.filter(pocket => pocket.name !== pocketToDelete.name));
        deleteTasksForPocket(pocketToDelete.name);
    };

    return (
        <React.Fragment>
            <div className="flex flex-col justify-between px-6 py-10 h-full w-[400px]">
                <div className="mb-4">
                    <div className="text-2xl text-left font-bold">
                        Pockets
                    </div>

                    <div className="mt-2">
                        {pockets.map((pocket, index) => (
                            <div
                                key={index}
                                className={`flex items-center justify-between cursor-pointer px-1 py-1.5 hover:bg-[#f0f0f0] group ${pocket.name === currentPocket?.name && 'bg-blue-500 rounded text-white font-bold hover:!bg-blue-600'}`}
                                onClick={() => setCurrentPocket(pocket)}
                                onMouseEnter={() => setHoveredPocket(pocket.name)}
                                onMouseLeave={() => setHoveredPocket(null)}
                            >
                                <div className="flex items-center max-w-[300px]">
                                    <div className="text-2xl">
                                        {pocket.icon}
                                    </div>
                                    <div className="ml-2 truncate">
                                        {pocket.name}
                                    </div>
                                </div>

                                <div className='flex items-center opacity-0 group-hover:opacity-100 duration-150'>
                                    <Button
                                        size='sm'
                                        color='danger'
                                        isIconOnly
                                        onPress={() => deletePocket(pocket)}
                                        startContent={<FaRegTrashCan fontSize={16} />}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <Button
                        className="flex justify-between cursor-pointer select-none w-full mt-4 bg-[#f5f5f5]"
                        endContent={<Kbd keys={["command"]}>P</Kbd>}
                        onPress={onOpen}
                    >
                        <IoMdAdd fontSize={18} className='text-[#7e7e7e]' />
                        <p className='font-semibold'>
                            Create new pocket
                        </p>
                    </Button>
                </div>

                <div className="flex justify-center items-center w-full mt-4">
                    <Avatar src='https://i.pravatar.cc/150?u=a042581f4e29026704d' />
                    <div className="ml-2">
                        <p>
                            Claudia Doumit
                        </p>
                        <p className='text-sm text-left text-[#7e7e7e] hover:text-[#646464] cursor-pointer'>
                            Log out
                        </p>
                    </div>
                </div>

                <NewPocketModal
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    setPockets={setPockets}
                    setCurrentPocket={setCurrentPocket}
                />
            </div>
        </React.Fragment>
    );
}