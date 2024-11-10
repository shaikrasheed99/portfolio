import React from 'react';
import './Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faBriefcase, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

function Sidebar() {
    return (
        <aside className="sidebar">
            <nav className="sidebar-nav">
                <a href="#home" className="nav-item">
                    <FontAwesomeIcon icon={faHome} />
                </a>
                <a href="#about" className="nav-item">
                    <FontAwesomeIcon icon={faUser} />
                </a>
                <a href="#projects" className="nav-item">
                    <FontAwesomeIcon icon={faBriefcase} />
                </a>
                <a href="#contact" className="nav-item">
                    <FontAwesomeIcon icon={faEnvelope} />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="nav-item">
                    <FontAwesomeIcon icon={faLinkedin} />
                </a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="nav-item">
                    <FontAwesomeIcon icon={faGithub} />
                </a>
            </nav>
        </aside>
    );
}

export default Sidebar;
