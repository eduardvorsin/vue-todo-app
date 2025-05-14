import type { AxiosError } from "axios";

export async function delay(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

export async function randomDelay(start: number, end: number) {
  const delayTime = Math.random() * (end - start) + start;
  return delay(delayTime);
};

type ServerErrorStatuses = 404 | 501 | 503;
export function formatErrorForUser<T = unknown, D = unknown>({
  status,
  response,
  request
}: AxiosError<T, D>): string {
  const errorByCodes: Record<ServerErrorStatuses, string> = {
    404: 'Запрашиваемый ресурс или данные не найдены. Пожалуйста попробуйте позже',
    501: 'Упс! Произошла ошибка на сервере. Мы уже работаем над ее устранением. Пожалуйста, попробуйте повторить действие позже.',
    503: 'Сервер временно не доступен. Повторите попытку позднее',
  };

  let errorMessage = '';

  if (response && status) {
    errorMessage = errorByCodes[status as ServerErrorStatuses] || 'Произошла ошибка при выполнении запроса.';
  } else if (request) {
    errorMessage = 'Не удалось связаться с сервером. Пожалуйста, проверьте ваше интернет-соединение и попробуйте снова.';
  } else {
    errorMessage = 'Произошла неожиданная ошибка. Пожалуйста, попробуйте еще раз.';
  }

  return errorMessage;
};
