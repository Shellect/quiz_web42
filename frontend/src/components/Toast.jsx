export default function Toast({ message, onClose }) {
    if (!message) return null;

    return (
        <div className="toast-container position-fixed top-0 end-0 p-3">
            <div className="toast show bg-danger text-white">
                <div className="toast-header bg-danger text-white">
                    <strong className="me-auto">Ошибка</strong>
                    <button
                        type="button"
                        className="btn-close btn-close-white"
                        onClick={onClose}
                    />
                </div>
                <div className="toast-body">{message}</div>
            </div>
        </div>
    );
}
