import React from 'react';
import { useSidebar } from '../context/SidebarContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

function SidebarToggle() {
    const { toggleSidebar } = useSidebar();

    return (
        <button className="sidebar-toggle" onClick={toggleSidebar} aria-label="Abrir menu">
            <FontAwesomeIcon icon={faBars} className="icon" aria-hidden="true" />
        </button>
    );
}

export default SidebarToggle;