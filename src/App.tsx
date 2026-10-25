import React, { useState } from 'react';
import { Page, Contact, Deal, Task } from './types';
import { initialContacts, initialDeals, initialTasks } from './data';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Contacts from './components/Contacts';
import Deals from './components/Deals';
import Tasks from './components/Tasks';
import { Menu, X } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [deals, setDeals] = useState<Deal[]>(initialDeals);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard contacts={contacts} deals={deals} tasks={tasks} />;
      case 'contacts':
        return <Contacts contacts={contacts} setContacts={setContacts} />;
      case 'deals':
        return <Deals deals={deals} setDeals={setDeals} />;
      case 'tasks':
        return <Tasks tasks={tasks} setTasks={setTasks} />;
      default:
        return <Dashboard contacts={contacts} deals={deals} tasks={tasks} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Mobile sidebar toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-slate-900 text-white rounded-lg shadow-lg"
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 lg:relative lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <Sidebar currentPage={currentPage} onPageChange={(page) => {
          setCurrentPage(page);
          setSidebarOpen(false);
        }} />
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {renderPage()}
      </main>
    </div>
  );
}
