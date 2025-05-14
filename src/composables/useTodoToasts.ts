import type { ToastMessageOptions } from "primevue/toast";
import { useToast } from "primevue/usetoast";

type TodoToastStatuses = 'add' | 'remove' | 'update' | 'removeCompleted';

export default function useTodoToasts() {
  const toast = useToast();

  const showTodoToast = (status: TodoToastStatuses) => {
    const life = 3000;
    const severity = 'success';
    const toastType: Record<TodoToastStatuses, ToastMessageOptions> = {
      add: {
        summary: 'Создана новая задача',
        severity,
        life,
      },
      remove: {
        summary: 'Выбранная задача была удалена',
        severity,
        life,
      },
      update: {
        summary: 'Статус задачи был изменен',
        severity,
        life,
      },
      removeCompleted: {
        summary: 'Завершенные задачи были удалены',
        severity,
        life,
      },
    };

    toast.add(toastType[status]);
  };

  return { showTodoToast };
}
