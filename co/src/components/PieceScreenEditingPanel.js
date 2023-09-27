import * as React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import styles from './webpage.css';

export default function PieceScreenEditingPanel() {
    const navigate = useNavigate();

    return (

        <div>
            This is piece/screen editing panel
        </div>
    );
}
