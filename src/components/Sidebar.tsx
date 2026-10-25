import React from 'react';
import { Page } from '../types';
import { LayoutDashboard, Users, Briefcase, CheckSquare, ChevronRight } from 'lucide-react';

interface SidebarProps {
  currentPage: Page;
  onPageChange: (page: Page) => void;
}

const menuItems: { page: Page; label: string; icon: React.ReactNode }[] = [
  { page: 'dashboard', label: 'Дашборд', icon: <LayoutDashboard size={20} /> },
  { page: 'contacts', label: 'Контакты', icon: <Users size={20} /> },
  { page: 'deals', label: 'Сделки', icon: <Briefcase size={20} /> },
  { page: 'tasks', label: 'Задачи', icon: <CheckSquare size={20} /> },
];

export default function Sidebar({ currentPage, onPageChange }: SidebarProps) {
  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col min-h-screen">
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">CRM</span>
          <span className="text-slate-300 font-light">Pro</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">Система управления клиентами</p>
      </div>
      
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.page}
            onClick={() => onPageChange(item.page)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
              currentPage === item.page
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            {item.icon}
            <span className="font-medium">{item.label}</span>
            {currentPage === item.page && (
              <ChevronRight size={16} className="ml-auto" />
            )}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-sm font-bold">
            А
          </div>
          <div>
            <p className="text-sm font-medium">Администратор</p>
            <p className="text-xs text-slate-400">admin@crmpro.ru</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
