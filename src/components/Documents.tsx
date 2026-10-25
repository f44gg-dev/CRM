import React, { useState, useEffect } from 'react';
import { DocumentTemplate } from '../types';
import { Plus, FileText, Edit2, Trash2, X, Save, Copy } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { saveToStorage, loadFromStorage } from '../utils/storage';

const STORAGE_KEY = 'crm_document_templates';

const defaultTemplates: DocumentTemplate[] = [
  {
    id: '1',
    name: 'Договор на оказание услуг (ИТ)',
    type: 'contract',
    content: `ДОГОВОР НА ОКАЗАНИЕ УСЛУГ
№ ___________
от «___» ____________ 20___ г.

г. _______________

[НАЗВАНИЕ КОМПАНИИ], именуемое в дальнейшем «Исполнитель», в лице [ДОЛЖНОСТЬ] [ФИО], действующего на основании Устава, с одной стороны, и

[ЗАКАЗЧИК], именуемый в дальнейшем «Заказчик», в лице [ДОЛЖНОСТЬ] [ФИО], действующего на основании [ДОКУМЕНТ], с другой стороны,

заключили настоящий Договор о нижеследующем:

1. ПРЕДМЕТ ДОГОВОРА
1.1. Исполнитель обязуется по заданию Заказчика оказать следующие услуги: [ОПИСАНИЕ УСЛУГ].
1.2. Подробное описание услуг, сроки и этапы выполнения указаны в Приложении №1, являющемся неотъемлемой частью настоящего Договора.

2. СТОИМОСТЬ УСЛУГ И ПОРЯДОК РАСЧЁТОВ
2.1. Стоимость услуг по настоящему Договору составляет _________ (__________) рублей 00 копеек, НДС не облагается.
2.2. Оплата производится в следующем порядке: [УСЛОВИЯ ОПЛАТЫ].

3. СРОКИ ВЫПОЛНЕНИЯ
3.1. Начало выполнения работ: с момента подписания Договора.
3.2. Окончание выполнения работ: «___» ____________ 20___ г.

4. ОТВЕТСТВЕННОСТЬ СТОРОН
4.1. В случае нарушения сроков оказания услуг Исполнитель уплачивает Заказчику пени в размере 0,1% от стоимости неоказанных услуг за каждый день просрочки.
4.2. В случае нарушения сроков оплаты Заказчик уплачивает Исполнителю пени в размере 0,1% от неоплаченной суммы за каждый день просрочки.

5. КОНФИДЕНЦИАЛЬНОСТЬ
5.1. Стороны обязуются не разглашать конфиденциальную информацию, полученную в ходе исполнения настоящего Договора.

6. РАЗРЕШЕНИЕ СПОРОВ
6.1. Все споры решаются путём переговоров. При недостижении согласия — в суде по месту нахождения Исполнителя.

7. ЗАКЛЮЧИТЕЛЬНЫЕ ПОЛОЖЕНИЯ
7.1. Настоящий Договор вступает в силу с момента подписания и действует до полного исполнения Сторонами своих обязательств.
7.2. Договор составлен в двух экземплярах, имеющих равную юридическую силу, по одному для каждой из Сторон.

ПОДПИСИ СТОРОН:

ИСПОЛНИТЕЛЬ:                          ЗАКАЗЧИК:
_____________________                 _____________________
[Должность, ФИО]                      [Должность, ФИО]
М.П.                                  М.П.`,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Акт выполненных работ',
    type: 'act',
    content: `АКТ
сдачи-приёмки выполненных работ
№ ___________
от «___» ____________ 20___ г.

к Договору № ___________ от «___» ____________ 20___ г.

г. _______________

[ИСПОЛНИТЕЛЬ], именуемый в дальнейшем «Исполнитель», с одной стороны, и
[ЗАКАЗЧИК], именуемый в дальнейшем «Заказчик», с другой стороны,

составили настоящий Акт о нижеследующем:

1. Исполнитель выполнил, а Заказчик принял следующие работы (услуги):

№ | Наименование работ | Ед. изм. | Кол-во | Цена, руб. | Сумма, руб.
1 | [НАЗВАНИЕ РАБОТЫ] | шт. | 1 | 0,00 | 0,00
2 | [НАЗВАНИЕ РАБОТЫ] | шт. | 1 | 0,00 | 0,00

ИТОГО: _________ (__________) рублей 00 копеек.
НДС: не облагается / в т.ч. НДС _________ руб.

2. Все работы выполнены в срок и с надлежащим качеством.
3. Заказчик претензий по объёму, качеству и срокам выполнения работ не имеет.

ПОДПИСИ СТОРОН:

Сдал (Исполнитель):                     Принял (Заказчик):
_____________________                   _____________________
[Должность, ФИО]                        [Должность, ФИО]
М.П.                                    М.П.`,
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Договор с доставкой на дом',
    type: 'combined',
    content: `ДОГОВОР
на оказание услуг с доставкой
№ ___________
от «___» ____________ 20___ г.

г. _______________

[ИСПОЛНИТЕЛЬ], именуемый в дальнейшем «Исполнитель», с одной стороны, и
[ЗАКАЗЧИК], именуемый в дальнейшем «Заказчик», с другой стороны,

заключили настоящий Договор о нижеследующем:

1. ПРЕДМЕТ ДОГОВОРА
1.1. Исполнитель обязуется оказать Заказчику следующие услуги: [ОПИСАНИЕ УСЛУГ].
1.2. Исполнитель обязуется выполнить работы с доставкой по адресу Заказчика: [АДРЕС ДОСТАВКИ].

2. УСЛОВИЯ ДОСТАВКИ
2.1. Дата доставки: «___» ____________ 20___ г.
2.2. Время доставки: с __:__ до __:__
2.3. Стоимость доставки: _________ рублей (включена/не включена в стоимость услуг).

3. СТОИМОСТЬ УСЛУГ
3.1. Общая стоимость услуг: _________ рублей.
3.2. Оплата производится: [НАЛИЧНЫЕ / БЕЗНАЛИЧНЫЙ РАСЧЁТ / КАРТА].

4. ПОДТВЕРЖДЕНИЕ ВЫПОЛНЕНИЯ РАБОТ
Настоящим Заказчик подтверждает, что:
□ Услуги выполнены в полном объёме
□ Доставка осуществлена по указанному адресу
□ Претензий по качеству не имеется

5. ОТВЕТСТВЕННОСТЬ СТОРОН
5.1. Стороны несут ответственность в соответствии с действующим законодательством РФ.

ПОДПИСИ СТОРОН:

ИСПОЛНИТЕЛЬ (МЕНЕДЖЕР):                 ЗАКАЗЧИК:
_____________________                   _____________________
ФИО: ___________________                ФИО: ___________________
Тел.: __________________                Тел.: __________________
Дата: «___» ____________ 20___ г.       Дата: «___» ____________ 20___ г.
М.П.

АДРЕС ДОСТАВКИ:
_______________________________________
_______________________________________

ПРИНЯЛ ЗАКАЗ (КУРЬЕР/МАСТЕР):
_____________________
ФИО: ___________________
Подпись: ________________`,
    createdAt: new Date().toISOString(),
  },
];

export default function Documents() {
  const [templates, setTemplates] = useState<DocumentTemplate[]>([]);
  const [editingTemplate, setEditingTemplate] = useState<DocumentTemplate | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [editorContent, setEditorContent] = useState('');
  const [editorName, setEditorName] = useState('');

  useEffect(() => {
    const saved = loadFromStorage<DocumentTemplate[]>(STORAGE_KEY);
    setTemplates(saved || defaultTemplates);
  }, []);

  useEffect(() => {
    if (templates.length > 0) {
      saveToStorage(STORAGE_KEY, templates);
    }
  }, [templates]);

  const openNewTemplate = () => {
    setEditingTemplate(null);
    setEditorName('');
    setEditorContent('');
    setShowEditor(true);
  };

  const openEditTemplate = (template: DocumentTemplate) => {
    setEditingTemplate(template);
    setEditorName(template.name);
    setEditorContent(template.content);
    setShowEditor(true);
  };

  const handleSaveTemplate = () => {
    if (!editorName.trim() || !editorContent.trim()) return;

    if (editingTemplate) {
      setTemplates(prev => prev.map(t => t.id === editingTemplate.id
        ? { ...t, name: editorName, content: editorContent }
        : t
      ));
    } else {
      const newTemplate: DocumentTemplate = {
        id: uuidv4(),
        name: editorName,
        type: 'contract',
        content: editorContent,
        createdAt: new Date().toISOString(),
      };
      setTemplates(prev => [...prev, newTemplate]);
    }
    setShowEditor(false);
  };

  const handleDeleteTemplate = (id: string) => {
    if (confirm('Удалить шаблон?')) {
      setTemplates(prev => prev.filter(t => t.id !== id));
    }
  };

  const handleDuplicateTemplate = (template: DocumentTemplate) => {
    const newTemplate: DocumentTemplate = {
      ...template,
      id: uuidv4(),
      name: `${template.name} (копия)`,
      createdAt: new Date().toISOString(),
    };
    setTemplates(prev => [...prev, newTemplate]);
  };

  const typeLabels: Record<string, string> = {
    contract: 'Договор',
    act: 'Акт',
    combined: 'Совмещённый',
  };

  const typeColors: Record<string, string> = {
    contract: 'bg-blue-100 text-blue-700',
    act: 'bg-green-100 text-green-700',
    combined: 'bg-purple-100 text-purple-700',
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">Шаблоны документов</h2>
          <p className="text-slate-500 mt-1 text-sm sm:text-base">Редактируемые шаблоны договоров и актов</p>
        </div>
        <button
          onClick={openNewTemplate}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Plus size={18} /> Новый шаблон
        </button>
      </div>

      {/* Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <p className="text-sm text-blue-800">
          💡 <strong>Совет:</strong> Отредактируйте шаблоны под свою компанию. При печати заказа из вкладки «Задачи и Клиенты» можно выбрать любой шаблон или использовать быструю печать договора/акта.
        </p>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((template) => (
          <div key={template.id} className="bg-white rounded-xl p-5 border border-slate-200 hover:shadow-md transition-shadow flex flex-col">
            <div className="flex items-start justify-between gap-2 mb-3">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shrink-0">
                  <FileText size={20} className="text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-slate-800 truncate">{template.name}</h3>
                  <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium mt-1 ${typeColors[template.type]}`}>
                    {typeLabels[template.type]}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex-1 mb-4">
              <p className="text-xs text-slate-500 line-clamp-4 font-mono bg-slate-50 p-3 rounded-lg border border-slate-100">
                {template.content.slice(0, 200)}...
              </p>
            </div>

            <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => openEditTemplate(template)}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <Edit2 size={14} /> Редактировать
              </button>
              <button
                onClick={() => handleDuplicateTemplate(template)}
                className="p-2 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                title="Дублировать"
              >
                <Copy size={16} />
              </button>
              <button
                onClick={() => handleDeleteTemplate(template.id)}
                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Удалить"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {templates.length === 0 && (
        <div className="text-center py-16 text-slate-500 bg-white rounded-xl border border-slate-200">
          <FileText size={48} className="mx-auto mb-4 text-slate-300" />
          <p className="font-medium">Шаблоны не найдены</p>
          <p className="text-sm mt-1">Создайте первый шаблон документа</p>
        </div>
      )}

      {/* Editor Modal */}
      {showEditor && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[95vh] flex flex-col">
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-200 shrink-0">
              <h3 className="text-lg font-bold text-slate-800">
                {editingTemplate ? 'Редактировать шаблон' : 'Новый шаблон'}
              </h3>
              <button onClick={() => setShowEditor(false)} className="p-2 hover:bg-slate-100 rounded-lg">
                <X size={20} className="text-slate-500" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Название шаблона *</label>
                <input
                  type="text"
                  value={editorName}
                  onChange={(e) => setEditorName(e.target.value)}
                  placeholder="Договор на оказание услуг"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Содержимое шаблона *
                  <span className="text-xs text-slate-400 ml-2">Используйте [ПЕРЕМЕННЫЕ] для подстановки данных</span>
                </label>
                <textarea
                  value={editorContent}
                  onChange={(e) => setEditorContent(e.target.value)}
                  rows={25}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                  placeholder="Введите текст шаблона документа..."
                />
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                <p className="text-xs text-amber-800">
                  💡 <strong>Доступные переменные:</strong> [ЗАКАЗЧИК], [ИСПОЛНИТЕЛЬ], [ДАТА], [ЦЕНА], [ОПИСАНИЕ РАБОТ], [АДРЕС], [ТЕЛЕФОН]
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 p-4 sm:p-6 border-t border-slate-200 shrink-0">
              <button
                onClick={() => setShowEditor(false)}
                className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Отмена
              </button>
              <button
                onClick={handleSaveTemplate}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Save size={16} /> Сохранить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
