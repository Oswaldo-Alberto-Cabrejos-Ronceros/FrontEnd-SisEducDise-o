// ConfirmationModal.js
import "./ConfirmacionModal.css";
import PropTypes from "prop-types";

function ConfirmationModal({ show, message }) {
    if (!show || !message) return null;

    return (
        <div className="confirmation-modal-overlay">
            <div className="confirmation-modal-content">
                <p>{message}</p>
            </div>
        </div>
    );
}

ConfirmationModal.propTypes={
    show:PropTypes.bool.isRequired,
    message:PropTypes.string.isRequired
}

export default ConfirmationModal;
