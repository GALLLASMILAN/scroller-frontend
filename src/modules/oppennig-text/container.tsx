import React, { useEffect, createRef } from 'react';
import OppeningText from './component';
// @ts-ignore
import Modal from 'react-modal';

export default () => {
    Modal.setAppElement('#root');
    const dialogOpen = localStorage.getItem('node-scoller-oppening-dialog-saw') === null;
    const [modalIsOpen, setIsOpen] = React.useState(dialogOpen);

    const closeModal = () => {
        setIsOpen(false);
        localStorage.setItem('node-scoller-oppening-dialog-saw', 'yes');
    }

    return (
        <div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Vítejte na webu overujte.cz"
                style={{
                    overlay: {
                        // backgroundColor: 'grey',
                        zIndex: 1000000000000000000
                    },
                    content: {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)'
                    }
                }}
            >
                <OppeningText closeModal={closeModal} />
            </Modal>
        </div>
    )
}