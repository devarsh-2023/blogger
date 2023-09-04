import React from 'react';
import { Modal, IconButton } from '@mui/material';
import '../styles/AuthorDetails.css'
import { Close } from '@mui/icons-material';

const AuthorPopup = ({ user, onClose }) => {
    return (
        <Modal
            open={!!user}
            onClose={onClose}
            className='modal'
            BackdropProps={{ className: 'backDrop' }}
        >
            <div className="card-container">
                <IconButton
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        color: 'black',
                        opacity: '0.3'
                    }}
                >
                    <Close />
                </IconButton>
                {user && (
                    <>
                        <img className="round" src={user?.image} alt="user" width='100px' height='100px' />
                        <h1>{user?.firstName} {user?.lastName}</h1>
                        <h3>{user?.address?.city}</h3>
                        <h4>{user?.email}</h4>

                        <h5>{user?.company?.department}</h5>
                        <div className="buttons">
                            <button className="message-btn">
                                Message
                            </button>
                            <button className="message-btn following-btn">
                                Following
                            </button>
                        </div>
                    </>
                )}
            </div>
        </Modal>
    );
};

export default AuthorPopup;



