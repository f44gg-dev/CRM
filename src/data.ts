import { Contact, Deal, Task } from './types';

export const initialContacts: Contact[] = [
  { id: '1', name: 'Алексей Петров', email: 'alex@company.ru', phone: '+7 (999) 123-45-67', company: 'ТехноСофт', status: 'active', createdAt: '2024-01-15' },
  { id: '2', name: 'Мария Иванова', email: 'maria@startup.io', phone: '+7 (916) 234-56-78', company: 'СтартАп', status: 'lead', createdAt: '2024-02-20' },
  { id: '3', name: 'Дмитрий Козлов', email: 'dmitry@enterprise.com', phone: '+7 (903) 345-67-89', company: 'Энтерпрайз', status: 'active', createdAt: '2024-03-10' },
  { id: '4', name: 'Елена Смирнова', email: 'elena@digital.ru', phone: '+7 (925) 456-78-90', company: 'ДиджиталАгентство', status: 'inactive', createdAt: '2024-01-05' },
  { id: '5', name: 'Сергей Волков', email: 'sergey@innovate.tech', phone: '+7 (977) 567-89-01', company: 'ИнноваТех', status: 'lead', createdAt: '2024-04-01' },
  { id: '6', name: 'Анна Новикова', email: 'anna@retail.ru', phone: '+7 (905) 678-90-12', company: 'РитейлГрупп', status: 'active', createdAt: '2024-02-14' },
  { id: '7', name: 'Игорь Морозов', email: 'igor@finance.ru', phone: '+7 (910) 789-01-23', company: 'ФинКонсалт', status: 'active', createdAt: '2024-03-22' },
  { id: '8', name: 'Ольга Лебедева', email: 'olga@media.ru', phone: '+7 (926) 890-12-34', company: 'МедиаПлюс', status: 'lead', createdAt: '2024-04-15' },
];

export const initialDeals: Deal[] = [
  { id: '1', title: 'Внедрение CRM', value: 500000, contactId: '1', contactName: 'Алексей Петров', stage: 'negotiation', createdAt: '2024-03-01', expectedClose: '2024-06-01' },
  { id: '2', title: 'Разработка сайта', value: 250000, contactId: '2', contactName: 'Мария Иванова', stage: 'new', createdAt: '2024-04-01', expectedClose: '2024-07-15' },
  { id: '3', title: 'Аудит безопасности', value: 180000, contactId: '3', contactName: 'Дмитрий Козлов', stage: 'proposal', createdAt: '2024-02-15', expectedClose: '2024-05-30' },
  { id: '4', title: 'Мобильное приложение', value: 800000, contactId: '6', contactName: 'Анна Новикова', stage: 'negotiation', createdAt: '2024-03-20', expectedClose: '2024-08-01' },
  { id: '5', title: 'SEO-продвижение', value: 120000, contactId: '4', contactName: 'Елена Смирнова', stage: 'closed_won', createdAt: '2024-01-10', expectedClose: '2024-04-10' },
  { id: '6', title: 'Облачная миграция', value: 650000, contactId: '7', contactName: 'Игорь Морозов', stage: 'new', createdAt: '2024-04-10', expectedClose: '2024-09-01' },
  { id: '7', title: 'Интеграция API', value: 300000, contactId: '5', contactName: 'Сергей Волков', stage: 'proposal', createdAt: '2024-03-05', expectedClose: '2024-06-15' },
  { id: '8', title: 'Дизайн-система', value: 200000, contactId: '8', contactName: 'Ольга Лебедева', stage: 'closed_lost', createdAt: '2024-02-01', expectedClose: '2024-05-01' },
];

export const initialTasks: Task[] = [
  { id: '1', title: 'Подготовить коммерческое предложение', description: 'Составить КП для ТехноСофт по внедрению CRM', priority: 'high', status: 'in_progress', dueDate: '2024-05-20', assignee: 'Менеджер', relatedTo: 'Внедрение CRM', customerName: 'Алексей Петров', customerContact: '+7 (999) 123-45-67' },
  { id: '2', title: 'Позвонить Марии', description: 'Обсудить детали проекта по разработке сайта', priority: 'medium', status: 'pending', dueDate: '2024-05-18', assignee: 'Менеджер', relatedTo: 'Разработка сайта', customerName: 'Мария Иванова', customerContact: '+7 (916) 234-56-78' },
  { id: '3', title: 'Отправить счёт', description: 'Выставить счёт за SEO-продвижение', priority: 'high', status: 'completed', dueDate: '2024-04-10', assignee: 'Бухгалтерия', relatedTo: 'SEO-продвижение', customerName: 'Елена Смирнова', customerContact: '+7 (925) 456-78-90' },
  { id: '4', title: 'Встреча с Энтерпрайз', description: 'Презентация результатов аудита', priority: 'high', status: 'pending', dueDate: '2024-05-25', assignee: 'Менеджер', relatedTo: 'Аудит безопасности', customerName: 'Дмитрий Козлов', customerContact: '+7 (903) 345-67-89' },
  { id: '5', title: 'Обновить портфолио', description: 'Добавить новые кейсы на сайт', priority: 'low', status: 'pending', dueDate: '2024-06-01', assignee: 'Маркетолог' },
  { id: '6', title: 'Демо для ИнноваТех', description: 'Подготовить демо-версию интеграции API', priority: 'medium', status: 'in_progress', dueDate: '2024-05-22', assignee: 'Разработчик', relatedTo: 'Интеграция API', customerName: 'Сергей Волков', customerContact: '+7 (977) 567-89-01' },
];
