import React, { useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { MdAddBox, MdRemoveCircle } from 'react-icons/md';

const Sidebar = ({ pockets, setPockets, setCurrentPocket, currentPocket, deleteTasksForPocket }) => {
    const [newPocket, setNewPocket] = useState("");
    const [newPocketIcon, setNewPocketIcon] = useState("🏠");
    const [showPocketInput, setShowPocketInput] = useState(false);
    const [hoveredPocket, setHoveredPocket] = useState(null);

    const addPocket = () => {
        if (newPocket.trim() !== "") {
            setPockets((prevPockets) => [...prevPockets, { name: newPocket, icon: newPocketIcon }]);
            setNewPocket("");
            setNewPocketIcon("🏠");
            setShowPocketInput(false);
            setCurrentPocket({ name: newPocket, icon: newPocketIcon });
        }
    };

    const deletePocket = (pocketToDelete) => {
        if (currentPocket && currentPocket.name === pocketToDelete.name) {
            setCurrentPocket(null);
        }
        setPockets((prevPockets) => prevPockets.filter(pocket => pocket.name !== pocketToDelete.name));
        deleteTasksForPocket(pocketToDelete.name); // Ensure this line is correct
    };

    return (
        <div className={`flex flex-col justify-between px-6 py-10 h-full duration-150 ${showPocketInput ? 'w-[500px] ' : 'w-[400px] '}`}>
            <div className="mb-4">
                <div className='flex justify-between items-center w-full'>
                    <div className="text-2xl text-left font-bold">
                        Pockets
                    </div>
                    <div className="flex items-center cursor-pointer select-none" onClick={() => setShowPocketInput(!showPocketInput)}>
                        {showPocketInput ? (
                            <MdRemoveCircle fontSize={26} className='text-red-500' />
                        ) : (
                            <MdAddBox fontSize={26} className='text-blue-500' />
                        )}
                    </div>
                </div>
                <div className="mt-2">
                    {pockets.map((pocket, index) => (
                        <div
                            key={index}
                            className={`flex items-center justify-between cursor-pointer px-1 py-1.5 ${pocket.name === currentPocket?.name && 'bg-blue-500 rounded text-white font-bold'}`}
                            onClick={() => setCurrentPocket(pocket)}
                            onMouseEnter={() => setHoveredPocket(pocket.name)}
                            onMouseLeave={() => setHoveredPocket(null)}
                        >
                            <div className="flex items-center max-w-[300px]">
                                <div className="text-2xl">{pocket.icon}</div>
                                <div className="ml-2 truncate">{pocket.name}</div>
                            </div>
                            <div className="flex items-center">
                                <div className="bg-gray-200 rounded-full px-2">{/* Task count for pocket */}</div>
                                {hoveredPocket === pocket.name && (
                                    <button
                                        onClick={() => deletePocket(pocket)}
                                        className="ml-2 bg-red-500 text-white px-2 py-1 rounded"
                                    >
                                        <FaRegTrashCan />
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-4">
                    {showPocketInput && (
                        <div className="flex gap-1 mt-2">
                            <select
                                value={newPocketIcon}
                                onChange={(e) => setNewPocketIcon(e.target.value)}
                                className="p-2 border rounded"
                            >
                                <option value="🏠">🏠</option>
                                <option value="🌴">🌴</option>
                                <option value="👶">👶</option>
                                <option value="🏪">🏪</option>
                                <option value="📦">📦</option>
                            </select>

                            <input
                                type="text"
                                placeholder="New pocket name..."
                                className="p-2 border rounded"
                                value={newPocket}
                                onChange={(e) => setNewPocket(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        addPocket();
                                    }
                                }}
                            />

                            <button onClick={addPocket} className="ml-2 bg-blue-500 text-white px-4 py-2 rounded">Add</button>
                        </div>
                    )}
                </div>
            </div>
            <div className="flex justify-center items-center w-full mt-4">
                <img className="w-10 h-10 rounded-full" src="img/rectangle-1.svg" alt="Profile" />
                <div className="ml-2">
                    <div>Claudia Doumit</div>
                    <div className="text-sm text-gray-500 cursor-pointer">Log out</div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
