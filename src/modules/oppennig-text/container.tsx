import React, { useEffect, createRef } from 'react';
import OppeningText from './component';
// @ts-ignore
import Modal from 'react-modal';
import { isMobileOnly, isTablet } from 'react-device-detect';

export default () => {
    Modal.setAppElement('#root');
    const dialogOpen = localStorage.getItem('node-scoller-oppening-dialog-saw') === null;
    const [modalIsOpen, setIsOpen] = React.useState(dialogOpen);

    const closeModal = () => {
        setIsOpen(false);
        localStorage.setItem('node-scoller-oppening-dialog-saw', 'yes');
    }

    const style = {};
    const mobileStyle = { maxHeight: "50vh", overflowY: "scroll" };

    const mobileModalDialog = (
        <div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Vítejte na webu overujte.cz"
                
                style={{
                    overlay: {
                        //backgroundColor: 'grey',
                        zIndex: 1000000000000000000
                    },
                    content: {
                        top: '50%',
                        left: '20%',
                        right: 'auto',
                        bottom: 'auto',
                        transform: 'translate(-12%, -50%)',
                    }
                }}
            >
                <OppeningText closeModal={closeModal} style={mobileStyle} />
            </Modal>
        </div>
    );

    const modalDialog = (
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
                        left: '36%',
                        right: 'auto',
                        bottom: 'auto',
                        padding: '2rem',
                        transform: 'translate(-30%, -50%)'
                    }
                }}
            >
                <OppeningText closeModal={closeModal} style={style} />
            </Modal>
        </div>
    );

    return (isMobileOnly || isTablet) ? mobileModalDialog : modalDialog
}