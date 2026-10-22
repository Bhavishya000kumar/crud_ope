import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

/**
 * Toast Component
 * Displays a lightweight feedback alert in the top/bottom corner.
 */
export default function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 3500);

    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className={`toast-notification toast-${type}`}>
      <div className="toast-icon">
        {type === 'success' ? (
          <CheckCircle2 size={18} />
        ) : (
          <AlertCircle size={18} />
        )}
      </div>
      <p className="toast-text">{message}</p>
      <button 
        className="toast-close" 
        onClick={onClose} 
        aria-label="Dismiss notification"
      >
        <X size={14} />
      </button>
    </div>
  );
}
