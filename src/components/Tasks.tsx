import React, { useState } from 'react';
import { Task } from '../types';
import { Plus, X, Calendar, Flag, User, CheckCircle2, Circle, Clock, Filter, Phone, Building2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

interface TasksProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

export default function Tasks({ tasks, setTasks }: TasksProps) {
  const [showModal, setShowModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [formData, setFormData] = useState({
    title: '', description: '', priority: 'medium' as Task['priority'],
    status: 'pending' as Task['status'], dueDate: '', assignee: '', relatedTo: '',
    customerName: '', customerContact: ''
  });

  const filteredTasks = tasks.filter(task => {
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
    return matchesStatus && matchesPriority;
  });

  const priorityColors: Record<string, string> = {
    high: 'text-red-500',
    medium: 'text-yellow-500',
    low: 'text-green-500',
  };

  const priorityLabels: Record<string, string> = {
    high: 'Высокий',
    medium: 'Средний',
    low: 'Низкий',
  };

  const statusColors: Record<string, string> = {
    pending: 'bg-slate-100 text-slate-700',
    in_progress: 'bg-blue-100 text-blue-700',
    completed: 'bg-green-100 text-green-700',
  };

  const statusLabels: Record<string, string> = {
    pending: 'Ожидает',
    in_progress: 'В работе',
    completed: 'Выполнено',
  };

  const toggleStatus = (id: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id !== id) return t;
      const nextStatus: Record<string, Task['status']> = {
        pending: 'in_progress',
        in_progress: 'completed',
        completed: 'pending',
      };
      return { ...t, status: nextStatus[t.status] };
    }));
  };

  const handleAddTask = () => {
    if (!formData.title) return;
    const newTask: Task = {
      id: uuidv4(),
      ...formData,
      dueDate: formData.dueDate || new Date().toISOString().split('T')[0],
    };
    setTasks(prev => [...prev, newTask]);
    setShowModal(false);
    setFormData({ title: '', description: '', priority: 'medium', status: 'pending', dueDate: '', assignee: '', relatedTo: '', customerName: '', customerContact: '' });
  };

  const handleDeleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const getDaysUntilDue = (date: string) => {
    const today = new Date();
    const due = new Date(date);
    const diff = Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Задачи</h2>
          <p className="text-slate-500 mt-1">Управление задачами и активностями</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Plus size={18} /> Новая задача
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-slate-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm"
          >
            <option value="all">Все статусы</option>
            <option value="pending">Ожидает</option>
            <option value="in_progress">В работе</option>
            <option value="completed">Выполнено</option>
          </select>
        </div>
        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm"
        >
          <option value="all">Все приоритеты</option>
          <option value="high">Высокий</option>
          <option value="medium">Средний</option>
          <option value="low">Низкий</option>
        </select>
      </div>

      {/* Task Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4 border border-slate-200 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
            <Circle size={20} className="text-slate-500" />
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-800">{tasks.filter(t => t.status === 'pending').length}</p>
            <p className="text-xs text-slate-500">Ожидают</p>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-200 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
            <Clock size={20} className="text-blue-500" />
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-800">{tasks.filter(t => t.status === 'in_progress').length}</p>
            <p className="text-xs text-slate-500">В работе</p>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-200 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
            <CheckCircle2 size={20} className="text-green-500" />
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-800">{tasks.filter(t => t.status === 'completed').length}</p>
            <p className="text-xs text-slate-500">Выполнено</p>
          </div>
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-3">
        {filteredTasks.map((task) => {
          const daysUntil = getDaysUntilDue(task.dueDate);
          const isOverdue = daysUntil < 0 && task.status !== 'completed';
          
          return (
            <div
              key={task.id}
              className={`bg-white rounded-xl p-5 border shadow-sm hover:shadow-md transition-all ${
                task.status === 'completed' ? 'border-green-200 opacity-75' : 'border-slate-200'
              } ${isOverdue ? 'border-l-4 border-l-red-400' : ''}`}
            >
              <div className="flex items-start gap-4">
                <button
                  onClick={() => toggleStatus(task.id)}
                  className="mt-0.5 shrink-0"
                >
                  {task.status === 'completed' ? (
                    <CheckCircle2 size={22} className="text-green-500" />
                  ) : task.status === 'in_progress' ? (
                    <Clock size={22} className="text-blue-500" />
                  ) : (
                    <Circle size={22} className="text-slate-300 hover:text-blue-400 transition-colors" />
                  )}
                </button>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className={`font-medium ${task.status === 'completed' ? 'text-slate-400 line-through' : 'text-slate-800'}`}>
                        {task.title}
                      </h4>
                      {task.description && (
                        <p className="text-sm text-slate-500 mt-1">{task.description}</p>
                      )}
                    </div>
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="p-1.5 text-slate-300 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors shrink-0"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-3 mt-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[task.status]}`}>
                      {statusLabels[task.status]}
                    </span>
                    <span className={`flex items-center gap-1 text-xs ${priorityColors[task.priority]}`}>
                      <Flag size={12} /> {priorityLabels[task.priority]}
                    </span>
                    <span className={`flex items-center gap-1 text-xs ${isOverdue ? 'text-red-500 font-medium' : 'text-slate-500'}`}>
                      <Calendar size={12} />
                      {new Date(task.dueDate).toLocaleDateString('ru-RU')}
                      {isOverdue && ' (просрочено!)'}
                    </span>
                    {task.assignee && (
                      <span className="flex items-center gap-1 text-xs text-slate-500">
                        <User size={12} /> {task.assignee}
                      </span>
                    )}
                    {task.relatedTo && (
                      <span className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                        {task.relatedTo}
                      </span>
                    )}
                  </div>

                  {/* Customer Info */}
                  {(task.customerName || task.customerContact) && (
                    <div className="mt-3 pt-3 border-t border-slate-100">
                      <div className="flex flex-wrap items-center gap-3">
                        {task.customerName && (
                          <span className="flex items-center gap-1.5 text-xs text-slate-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                            <Building2 size={12} className="text-amber-600" />
                            <span className="font-medium">Заказчик:</span> {task.customerName}
                          </span>
                        )}
                        {task.customerContact && (
                          <span className="flex items-center gap-1.5 text-xs text-slate-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                            <Phone size={12} className="text-emerald-600" />
                            {task.customerContact}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredTasks.length === 0 && (
        <div className="text-center py-12 text-slate-500 bg-white rounded-xl border border-slate-200">
          Задачи не найдены
        </div>
      )}

      {/* Add Task Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800">Новая задача</h3>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-slate-100 rounded-lg">
                <X size={20} className="text-slate-500" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Название *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Подготовить презентацию"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Описание</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows={3}
                  placeholder="Подробное описание задачи..."
                />
              </div>

              {/* Customer Section */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 space-y-3">
                <h4 className="text-sm font-semibold text-amber-800 flex items-center gap-2">
                  <Building2 size={16} />
                  Информация о заказчике
                </h4>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">ФИО заказчика</label>
                  <input
                    type="text"
                    value={formData.customerName}
                    onChange={(e) => setFormData(prev => ({ ...prev, customerName: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    placeholder="Иванов Иван Иванович"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Контакты заказчика</label>
                  <input
                    type="text"
                    value={formData.customerContact}
                    onChange={(e) => setFormData(prev => ({ ...prev, customerContact: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    placeholder="+7 (999) 123-45-67 или email"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Приоритет</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value as Task['priority'] }))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="low">Низкий</option>
                    <option value="medium">Средний</option>
                    <option value="high">Высокий</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Статус</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as Task['status'] }))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="pending">Ожидает</option>
                    <option value="in_progress">В работе</option>
                    <option value="completed">Выполнено</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Срок выполнения</label>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Исполнитель</label>
                <input
                  type="text"
                  value={formData.assignee}
                  onChange={(e) => setFormData(prev => ({ ...prev, assignee: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Менеджер"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Связано с</label>
                <input
                  type="text"
                  value={formData.relatedTo}
                  onChange={(e) => setFormData(prev => ({ ...prev, relatedTo: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Название сделки"
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-200">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Отмена
              </button>
              <button
                onClick={handleAddTask}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Создать
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
