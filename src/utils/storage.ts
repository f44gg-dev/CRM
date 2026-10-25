/**
 * Утилиты для работы с localStorage
 * Все данные CRM сохраняются локально в браузере пользователя
 */

const STORAGE_KEYS = {
  USER: 'crm_user',
  CONTACTS: 'crm_contacts',
  DEALS: 'crm_deals',
  TASKS: 'crm_tasks',
} as const;

/**
 * Сохранить данные в localStorage
 */
export function saveToStorage<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Ошибка сохранения в localStorage:', error);
  }
}

/**
 * Загрузить данные из localStorage
 * Возвращает null, если данных нет или произошла ошибка
 */
export function loadFromStorage<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return null;
    return JSON.parse(raw) as T;
  } catch (error) {
    console.error('Ошибка загрузки из localStorage:', error);
    return null;
  }
}

/**
 * Удалить данные из localStorage
 */
export function removeFromStorage(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Ошибка удаления из localStorage:', error);
  }
}

/**
 * Очистить все данные CRM (выход из системы)
 */
export function clearAllStorage(): void {
  Object.values(STORAGE_KEYS).forEach(key => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Ошибка очистки localStorage:', error);
    }
  });
}

export { STORAGE_KEYS };
