import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface StorageErrorNotificationProps {
  isVisible: boolean;
  onDismiss: () => void;
  error?: string;
}

/**
 * Component to show storage-related error notifications to users
 * This helps users understand when their progress might not be saved
 */
const StorageErrorNotification: React.FC<StorageErrorNotificationProps> = ({ 
  isVisible, 
  onDismiss, 
  error 
}) => {
  const [shouldAutoHide, setShouldAutoHide] = useState(true);

  useEffect(() => {
    if (isVisible && shouldAutoHide) {
      const timer = setTimeout(() => {
        onDismiss();
      }, 8000); // Auto-hide after 8 seconds

      return () => clearTimeout(timer);
    }
  }, [isVisible, shouldAutoHide, onDismiss]);

  const handleDismiss = () => {
    setShouldAutoHide(false);
    onDismiss();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -100, scale: 0.8 }}
          className="fixed top-4 right-4 z-50 max-w-md"
        >
          <div className="bg-red-50 border border-red-200 rounded-lg shadow-lg p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <span className="text-red-600 text-xl">⚠️</span>
                <h3 className="text-red-800 font-semibold text-sm">
                  Problema de Guardado
                </h3>
              </div>
              <button
                onClick={handleDismiss}
                className="text-red-400 hover:text-red-600 transition-colors"
                aria-label="Cerrar notificación"
              >
                <span className="text-lg">×</span>
              </button>
            </div>

            {/* Content */}
            <div className="text-red-700 text-sm space-y-2">
              <p>
                Tu progreso podría no guardarse correctamente. 
                Te recomendamos:
              </p>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li>Exportar tu progreso manualmente</li>
                <li>Liberar espacio en tu navegador</li>
                <li>Intentar refrescar la página</li>
              </ul>
              {error && (
                <details className="mt-2">
                  <summary className="cursor-pointer text-xs font-medium">
                    Detalles técnicos
                  </summary>
                  <code className="block mt-1 p-2 bg-red-100 rounded text-xs break-all">
                    {error}
                  </code>
                </details>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex space-x-2 mt-3">
              <button
                onClick={() => {
                  // Trigger export functionality
                  console.log('Export triggered');
                  handleDismiss();
                }}
                className="bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700 transition-colors"
              >
                Exportar Progreso
              </button>
              <button
                onClick={handleDismiss}
                className="border border-red-300 text-red-600 px-3 py-1 rounded text-xs hover:bg-red-50 transition-colors"
              >
                Entendido
              </button>
            </div>

            {/* Auto-hide progress bar */}
            {shouldAutoHide && (
              <motion.div
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: 8, ease: 'linear' }}
                className="h-1 bg-red-300 rounded-full mt-3"
              />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StorageErrorNotification;
