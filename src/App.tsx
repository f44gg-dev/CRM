import React, { useState, useEffect } from 'react';
import { Page, Contact, Deal, Task, User } from './types';
import { initialContacts, initialDeals, initialTasks } from './data';
import { saveToStorage, loadFromStorage, STORAGE_KEYS } from './utils/storage';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Deals from './components/Deals';
import TasksAndContacts from './components/TasksAndContacts';
import Auth from './components/Auth';
import { Menu, X } from 'lucide-react';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Загрузка данных при старте приложения
  useEffect(() => {
    // Загружаем пользователя
    const savedUser = loadFromStorage<User>(STORAGE_KEYS.USER);
    if (savedUser) {
      setUser(savedUser);
    }

    // Загружаем данные или используем начальные
    const savedContacts = loadFromStorage<Contact[]>(STORAGE_KEYS.CONTACTS);
    const savedDeals = loadFromStorage<Deal[]>(STORAGE_KEYS.DEALS);
    const savedTasks = loadFromStorage<Task[]>(STORAGE_KEYS.TASKS);

    setContacts(savedContacts || initialContacts);
    setDeals(savedDeals || initialDeals);
    setTasks(savedTasks || initialTasks);
    setIsLoaded(true);
  }, []);

  // Автосохранение контактов при изменении
  useEffect(() => {
    if (isLoaded && contacts.length > 0) {
      saveToStorage(STORAGE_KEYS.CONTACTS, contacts);
    }
  }, [contacts, isLoaded]);

  // Автосохранение сделок при изменении
  useEffect(() => {
    if (isLoaded && deals.length > 0) {
      saveToStorage(STORAGE_KEYS.DEALS, deals);
    }
  }, [deals, isLoaded]);

  // Автосохранение задач при изменении
  useEffect(() => {
    if (isLoaded && tasks.length > 0) {
      saveToStorage(STORAGE_KEYS.TASKS, tasks);
    }
  }, [tasks, isLoaded]);

  const handleAuth = (newUser: User) => {
    setUser(newUser);
    saveToStorage(STORAGE_KEYS.USER, newUser);
  };

  const handleLogout = () => {
    if (confirm('Выйти из системы?')) {
      localStorage.removeItem(STORAGE_KEYS.USER);
      setUser(null);
      // Данные контактов/задач/сделок остаются для следующего входа
    }
  };

  if (!user) {
    return <Auth onAuth={handleAuth} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard contacts={contacts} deals={deals} tasks={tasks} />;
      case 'tasks':
        return <TasksAndContacts
          tasks={tasks}
          setTasks={setTasks}
          contacts={contacts}
          setContacts={setContacts}
        />;
      case 'deals':
        return <Deals deals={deals} setDeals={setDeals} />;
      default:
        return <Dashboard contacts={contacts} deals={deals} tasks={tasks} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-slate-900 text-white rounded-lg shadow-lg"
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <div className={`fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 lg:relative lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <Sidebar currentPage={currentPage} onPageChange={(page) => {
          setCurrentPage(page);
          setSidebarOpen(false);
        }} user={user} onLogout={handleLogout} />
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <main className="flex-1 overflow-auto">
        {renderPage()}
      </main>
    </div>
  );
}
