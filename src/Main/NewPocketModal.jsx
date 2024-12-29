import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Select, SelectItem, Input } from "@nextui-org/react";

export default function NewPocketModal({ isOpen, onOpenChange, setPockets, setCurrentPocket }) {
    const [newPocket, setNewPocket] = useState("");
    const [newPocketIcon, setNewPocketIcon] = useState("🏠");

    const addPocket = () => {
        if (newPocket.trim() !== "") {
            setPockets((prevPockets) => [...prevPockets, { name: newPocket, icon: newPocketIcon }]);
            setNewPocket("");
            setNewPocketIcon("🏠");
            setCurrentPocket({ name: newPocket, icon: newPocketIcon });
        }
    };

    return (
        <React.Fragment>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Create new pocket</ModalHeader>
                            <ModalBody>
                                <div className="flex gap-2 w-full mt-2">
                                    <Select
                                        value={newPocketIcon}
                                        onChange={(e) => setNewPocketIcon(e.target.value)}
                                        defaultSelectedKeys={['🏠']}
                                        className='w-20'
                                    >
                                        <SelectItem key="🏠">🏠</SelectItem>
                                        <SelectItem key="🌴">🌴</SelectItem>
                                        <SelectItem key="👶">👶</SelectItem>
                                        <SelectItem key="🏪">🏪</SelectItem>
                                        <SelectItem key="📦">📦</SelectItem>
                                    </Select>

                                    <Input
                                        placeholder="New pocket name..."
                                        value={newPocket}
                                        onChange={(e) => setNewPocket(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                addPocket();
                                                onClose();
                                            }
                                        }}
                                    />
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button
                                    color="primary"
                                    onPress={() => {
                                        addPocket();
                                        onClose();
                                    }}
                                >
                                    Add
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </React.Fragment >
    );
}