import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styles from './webpage.css';
import Sidebar from './Sidebar';

export default function ProjectManageNew() {

    const name = "/projectmanagenew";

    return (
        <>
        <Sidebar compName = {name}/>

        <p> this is 1 project manage new ! </p>
        </>
    );
}