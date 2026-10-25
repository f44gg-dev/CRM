import React, { useState } from 'react';
import { Deal } from '../types';
import { Plus, X, DollarSign, Calendar, User, GripVertical } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

interface DealsProps {
  deals: Deal[];
  setDeals: React.Dispatch<React.SetStateAction<Deal[]>>;
}

const stages = [
  { id: 'new', label: 'Новые', color: 'border-blue-400', bg: 'bg-blue-50', badge: 'bg-blue-500' },
  { id: 'negotiation', label: 'Переговоры', color: 'border-yellow-400', bg: 'bg-yellow-50', badge: 'bg-yellow-500' },
  { id: 'proposal', label: 'Предложение', color: 'border-purple-400', bg: 'bg-purple-50', badge: 'bg-purple-500' },
  { id: 'closed_won', label: 'Выиграно', color: 'border-green-400', bg: 'bg-green-50', badge: 'bg-green-500' },
  { id: 'closed_lost', label: 'Проиграно', color: 'border-red-400', bg: 'bg-red-50', badge: 'bg-red-500' },
];

export default function Deals({ deals, setDeals }: DealsProps) {
  const [showModal, setShowModal] = useState(false);
  const [draggedDeal, setDraggedDeal] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '', value: '', contactName: '', expectedClose: ''
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(value);
  };

  const handleDragStart = (dealId: string) => {
    setDraggedDeal(dealId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (stage: string) => {
    if (draggedDeal) {
      setDeals(prev => prev.map(d => d.id === draggedDeal ? { ...d, stage: stage as Deal['stage'] } : d));
      setDraggedDeal(null);
    }
  };

  const handleAddDeal = () => {
    if (!formData.title || !formData.value || !formData.contactName) return;
    const newDeal: Deal = {
      id: uuidv4(),
      title: formData.title,
      value: Number(formData.value),
      contactId: '',
      contactName: formData.contactName,
      stage: 'new',
      createdAt: new Date().toISOString().split('T')[0],
      expectedClose: formData.expectedClose || new Date().toISOString().split('T')[0],
    };
    setDeals(prev => [...prev, newDeal]);
    setShowModal(false);
    setFormData({ title: '', value: '', contactName: '', expectedClose: '' });
  };

  const handleDeleteDeal = (id: string) => {
    setDeals(prev => prev.filter(d => d.id !== id));
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Сделки</h2>
          <p className="text-slate-500 mt-1">Kanban-доска сделок</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Plus size={18} /> Новая сделка
        </button>
      </div>

      {/* Kanban Board */}
      <div className="flex gap-4 overflow-x-auto pb-4">
        {stages.map((stage) => {
          const stageDeals = deals.filter(d => d.stage === stage.id);
          const stageTotal = stageDeals.reduce((sum, d) => sum + d.value, 0);

          return (
            <div
              key={stage.id}
              className={`flex-shrink-0 w-72 rounded-xl border-t-4 ${stage.color} ${stage.bg} p-4`}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(stage.id)}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-slate-700">{stage.label}</h3>
                  <span className={`w-6 h-6 rounded-full ${stage.badge} text-white text-xs flex items-center justify-center`}>
                    {stageDeals.length}
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-500 mb-4">{formatCurrency(stageTotal)}</p>

              <div className="space-y-3 min-h-[200px]">
                {stageDeals.map((deal) => (
                  <div
                    key={deal.id}
                    draggable
                    onDragStart={() => handleDragStart(deal.id)}
                    className={`bg-white rounded-lg p-4 shadow-sm border border-slate-200 cursor-grab active:cursor-grabbing hover:shadow-md transition-all ${
                      draggedDeal === deal.id ? 'opacity-50 rotate-2' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-1 text-slate-300">
                        <GripVertical size={14} />
                      </div>
                      <button
                        onClick={() => handleDeleteDeal(deal.id)}
                        className="p-1 text-slate-300 hover:text-red-500 rounded transition-colors"
                      >
                        <X size={14} />
                      </button>
                    </div>
                    <h4 className="text-sm font-medium text-slate-800 mt-1">{deal.title}</h4>
                    <div className="mt-3 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <DollarSign size={12} />
                        <span className="font-medium text-slate-700">{formatCurrency(deal.value)}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <User size={12} />
                        <span>{deal.contactName}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <Calendar size={12} />
                        <span>{new Date(deal.expectedClose).toLocaleDateString('ru-RU')}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Deal Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800">Новая сделка</h3>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-slate-100 rounded-lg">
                <X size={20} className="text-slate-500" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Название сделки *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Внедрение CRM"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Сумма (₽) *</label>
                <input
                  type="number"
                  value={formData.value}
                  onChange={(e) => setFormData(prev => ({ ...prev, value: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="500000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Контакт *</label>
                <input
                  type="text"
                  value={formData.contactName}
                  onChange={(e) => setFormData(prev => ({ ...prev, contactName: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Имя контакта"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Ожидаемое закрытие</label>
                <input
                  type="date"
                  value={formData.expectedClose}
                  onChange={(e) => setFormData(prev => ({ ...prev, expectedClose: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                onClick={handleAddDeal}
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
