export async function delay(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

export async function randomDelay(start: number, end: number) {
  const delayTime = Math.random() * (end - start) + start;
  return delay(delayTime);
};
