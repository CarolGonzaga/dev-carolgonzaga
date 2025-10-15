import React, { createContext, useState, useContext } from 'react';

interface SidebarContextType {
    isOpen: boolean;
    toggleSidebar: () => void;
    isContactModalOpen: boolean;
    openContactModal: () => void;
    closeContactModal: () => void;
    isLogoutModalOpen: boolean;
    openLogoutModal: () => void;
    closeLogoutModal: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isContactModalOpen, setContactModalOpen] = useState(false);
    const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);

    const toggleSidebar = () => setIsOpen(prev => !prev);
    const openContactModal = () => setContactModalOpen(true);
    const closeContactModal = () => setContactModalOpen(false);
    const openLogoutModal = () => setLogoutModalOpen(true);
    const closeLogoutModal = () => setLogoutModalOpen(false);

    return (
        <SidebarContext.Provider value={{
            isOpen, toggleSidebar,
            isContactModalOpen, openContactModal, closeContactModal,
            isLogoutModalOpen, openLogoutModal, closeLogoutModal
        }}>
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebar = () => {
    const context = useContext(SidebarContext);
    if (context === undefined) {
        throw new Error('useSidebar deve ser usado dentro de um SidebarProvider');
    }
    return context;
};