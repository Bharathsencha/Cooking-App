import React from 'react';
import { useToasts } from '@/hooks/use-toast';
import { X } from 'lucide-react';

const ToastContainer: React.FC = () => {
  const { toasts, remove } = useToasts();

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 flex flex-col gap-4 max-w-md">
      {toasts.map((toast) => {
        const baseStyles = "rounded-lg shadow-lg p-5 transition-all duration-25 flex justify-between items-start space-x-4 transform";
        const animationStyles = toast.visible
          ? "opacity-100 translate-y-0 scale-100 animate-pulse"
          : "opacity-0 translate-y-6 scale-90 pointer-events-none";

        const bgColor = {
          default: 'bg-white text-gray-900',
          destructive: 'bg-red-600 text-white shadow-red-500/80',
          success: 'bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white shadow-green-500/80',
        }[toast.variant || 'default'];

        return (
          <div
            key={toast.id}
            className={`${baseStyles} ${bgColor} ${animationStyles}`}
            style={{ boxShadow: '0 0 15px 3px rgba(34,197,94,0.7)' }}
          >
            <div className="flex-1">
              <h3 className="font-extrabold text-lg tracking-wide">{toast.title}</h3>
              {toast.description && <p className="text-sm mt-1 font-semibold">{toast.description}</p>}
            </div>
            <button
              onClick={() => remove(toast.id)}
              className="ml-4 hover:opacity-70 transition-opacity text-white"
              aria-label="Close notification"
            >
              <X size={20} />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ToastContainer;
