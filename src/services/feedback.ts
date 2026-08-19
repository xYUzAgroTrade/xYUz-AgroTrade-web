/**
 * Feedback Service - Substitui alert() por notificacoes visuais.
 * 
 * Uso: feedback.success('Ordem executada') ou feedback.error('Margem insuficiente')
 * 
 * Funciona sem hooks (pode ser chamado de qualquer lugar).
 * Renderiza via FeedbackOverlay no root da app.
 */

type FeedbackType = 'success' | 'error' | 'info' | 'warning';

interface FeedbackMessage {
  id: number;
  type: FeedbackType;
  title: string;
  message?: string;
}

type Listener = (messages: FeedbackMessage[]) => void;

let messages: FeedbackMessage[] = [];
let nextId = 0;
const listeners: Set<Listener> = new Set();

function notify() {
  for (const listener of listeners) {
    listener([...messages]);
  }
}

function addMessage(type: FeedbackType, title: string, message?: string) {
  const id = ++nextId;
  messages = [...messages, { id, type, title, message }];
  notify();

  // Auto-dismiss apos 4s (6s para erros)
  const duration = type === 'error' ? 6000 : 4000;
  setTimeout(() => {
    messages = messages.filter(m => m.id !== id);
    notify();
  }, duration);
}

export const feedback = {
  success: (title: string, message?: string) => addMessage('success', title, message),
  error: (title: string, message?: string) => addMessage('error', title, message),
  info: (title: string, message?: string) => addMessage('info', title, message),
  warning: (title: string, message?: string) => addMessage('warning', title, message),
  subscribe: (listener: Listener) => { listeners.add(listener); return () => listeners.delete(listener); },
  getMessages: () => messages
};
