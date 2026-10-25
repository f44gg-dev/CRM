/**
 * Экспорт/Импорт данных CRM
 * Позволяет сохранять и загружать данные в/из JSON файлов
 */

import { Contact, Deal, Task, User } from '../types';

export interface BackupData {
  version: string;
  exportDate: string;
  user: User | null;
  contacts: Contact[];
  deals: Deal[];
  tasks: Task[];
}

/**
 * Экспорт всех данных в JSON файл
 */
export function exportData(data: {
  user: User | null;
  contacts: Contact[];
  deals: Deal[];
  tasks: Task[];
}): void {
  const backup: BackupData = {
    version: '1.0.0',
    exportDate: new Date().toISOString(),
    user: data.user,
    contacts: data.contacts,
    deals: data.deals,
    tasks: data.tasks,
  };

  const json = JSON.stringify(backup, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `crm-backup-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Импорт данных из JSON файла
 */
export function importData(): Promise<BackupData> {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json,application/json';
    
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) {
        reject(new Error('Файл не выбран'));
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target?.result as string) as BackupData;
          
          // Валидация структуры
          if (!data.version || !data.contacts || !data.deals || !data.tasks) {
            reject(new Error('Неверный формат файла'));
            return;
          }
          
          resolve(data);
        } catch (error) {
          reject(new Error('Ошибка чтения файла'));
        }
      };
      
      reader.onerror = () => reject(new Error('Ошибка чтения файла'));
      reader.readAsText(file);
    };
    
    input.click();
  });
}

/**
 * Скачивание данных в формате для Excel/CSV
 */
export function exportToCSV(data: any[], filename: string): void {
  if (data.length === 0) return;

  const headers = Object.keys(data[0]);
  const csvRows = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const value = row[header];
        const escaped = ('' + value).replace(/"/g, '""');
        return `"${escaped}"`;
      }).join(',')
    )
  ];

  const csvString = csvRows.join('\n');
  const blob = new Blob(['\ufeff' + csvString], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}-${new Date().toISOString().split('T')[0]}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
