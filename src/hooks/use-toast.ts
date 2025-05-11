import { useState, useEffect } from 'react';

type ToastVariant = 'default' | 'destructive' | 'success';

type ToastProps = {
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
};

type Toast = ToastProps & {
  id: string;
  visible: boolean;
};

type ToastState = {
  toasts: Toast[];
  add: (toast: ToastProps) => void;
  remove: (id: string) => void;
  update: (id: string, toast: Partial<ToastProps>) => void;
};

// Create a simple in-memory store
let toasts: Toast[] = [];
let listeners: Array<(toasts: Toast[]) => void> = [];

const notifyListeners = () => {
  listeners.forEach((listener) => listener([...toasts]));
};

export const toast = (props: ToastProps) => {
  const id = Math.random().toString(36).substring(2, 9);
  const newToast: Toast = {
    id,
    visible: true,
    duration: 5000, // Default duration
    variant: 'default',
    ...props,
  };

  toasts = [...toasts, newToast];
  notifyListeners();

  // Auto-remove toast after duration
  setTimeout(() => {
    removeToast(id);
  }, newToast.duration);

  return id;
};

const removeToast = (id: string) => {
  // First set visible to false for animation
  toasts = toasts.map((t) => (t.id === id ? { ...t, visible: false } : t));
  notifyListeners();

  // Then remove after animation completes
  setTimeout(() => {
    toasts = toasts.filter((t) => t.id !== id);
    notifyListeners();
  }, 300);
};

export const useToasts = (): ToastState => {
  const [state, setState] = useState<Toast[]>(toasts);

  useEffect(() => {
    const handleChange = (newState: Toast[]) => {
      setState(newState);
    };

    listeners.push(handleChange);
    return () => {
      listeners = listeners.filter((listener) => listener !== handleChange);
    };
  }, []);

  const add = toast;
  const remove = removeToast;
  const update = (id: string, props: Partial<ToastProps>) => {
    toasts = toasts.map((t) => (t.id === id ? { ...t, ...props } : t));
    notifyListeners();
  };

  return { toasts: state, add, remove, update };
};

export default toast;