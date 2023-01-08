import React from 'react';
import '../css/entete.css'
import { Link } from "react-router-dom";
import 'firebase/compat/auth';
import {getAuth} from 'firebase/auth';

function entete() {
    return (
        <div className='entete'>
            <div className='admin'>
                <Link to="/admin">
                    <button>Admin</button>
                </Link>
            </div>
        </div>
    )
}
export default entete;