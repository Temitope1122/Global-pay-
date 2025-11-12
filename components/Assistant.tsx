
import React, { useState, useRef, useEffect } from 'react';
import { AssistantMessage } from '../types';
import { SendIcon, SparklesIcon, LoadingIcon } from './icons';

interface AssistantProps {
  onSendCommand: (prompt: string) => Promise<string>;
}

const Assistant: React.FC<AssistantProps> = ({ onSendCommand }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<AssistantMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: AssistantMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await onSendCommand(input);
      const assistantMessage: AssistantMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: responseText,
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error processing command:', error);
      const errorMessage: AssistantMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: 'Sorry, I encountered an error. Please try again.',
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="sticky bottom-0 left-0 right-0 bg-gray-900/50 backdrop-blur-md border-t border-gray-700">
      <div className="container mx-auto p-4 max-w-4xl">
        <div className="bg-gray-800 rounded-lg p-4 shadow-2xl">
          {messages.length > 0 && (
            <div className="max-h-60 overflow-y-auto mb-4 pr-2 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                  {msg.role === 'assistant' && <div className="p-2 bg-cyan-500/20 rounded-full"><SparklesIcon className="w-5 h-5 text-cyan-400"/></div>}
                  <div className={`max-w-md px-4 py-2 rounded-xl ${msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-200'}`}>
                    <p>{msg.text}</p>
                  </div>
                </div>
              ))}
               {isLoading && (
                 <div className="flex items-start gap-3">
                   <div className="p-2 bg-cyan-500/20 rounded-full"><LoadingIcon className="w-5 h-5 text-cyan-400"/></div>
                   <div className="max-w-md px-4 py-2 rounded-xl bg-gray-700 text-gray-200">
                     <p className="italic">Thinking...</p>
                   </div>
                 </div>
               )}
              <div ref={messagesEndRef} />
            </div>
          )}
          <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g., 'turn on the living room light'"
              className="flex-grow bg-gray-700 border border-gray-600 rounded-full py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-400"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="p-3 bg-cyan-500 rounded-full text-white hover:bg-cyan-600 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-cyan-500"
            >
              <SendIcon className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Assistant;
