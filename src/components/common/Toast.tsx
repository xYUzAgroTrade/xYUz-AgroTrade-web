/**
 * Toast notification system - global feedback visual.
 * Uso: toast.success('Ordem executada'), toast.error('Margem insuficiente')
 */
import { useState, useEffect, createContext, useContext, useCallback } from 'react';
import type React from 'react';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastMessage {
  id: number;
  type: ToastType;
  message: string;
  duration: number;
}

interface ToastContextValue {
  success: (msg: string) => void;
  error: (msg: string) => void;
  info: (msg: string) => void;
  warning: (msg: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

let nextId = 0;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((type: ToastType, message: string, duration = 4000) => {
    const id = ++nextId;
    setToasts(prev => [...prev, { id, type, message, duration }]);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const contextValue: ToastContextValue = {
    success: (msg) => addToast('success', msg),
    error: (msg) => addToast('error', msg, 6000),
    info: (msg) => addToast('info', msg),
    warning: (msg) => addToast('warning', msg, 5000)
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      {/* Toast container */}
      <div className="fixed top-4 right-4 z-[9999] space-y-2 max-w-sm">
        {toasts.map(toast => (
          <ToastItem key={toast.id} toast={toast} onDismiss={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastItem({ toast, onDismiss }: { toast: ToastMessage; onDismiss: (id: number) => void }) {
  useEffect(() => {
    const timer = setTimeout(() => onDismiss(toast.id), toast.duration);
    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, onDismiss]);

  const colors: Record<ToastType, string> = {
    success: 'bg-emerald-900/90 border-emerald-500 text-emerald-200',
    error: 'bg-red-900/90 border-red-500 text-red-200',
    info: 'bg-blue-900/90 border-blue-500 text-blue-200',
    warning: 'bg-amber-900/90 border-amber-500 text-amber-200'
  };

  return (
    <div className={`${colors[toast.type]} border rounded-lg px-4 py-3 text-sm font-medium shadow-xl backdrop-blur-sm animate-[slideIn_0.2s_ease-out]`}>
      {toast.message}
    </div>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast deve ser usado dentro de ToastProvider');
  return ctx;
}
