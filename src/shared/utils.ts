import { LOCAL_HOSTS } from './const';
import ENV from './env';

export function getServerHostName(port = ENV.SERVICE.PORT) {
  if (LOCAL_HOSTS.includes(ENV.SERVICE.HOST))
    return `${ENV.SERVICE.PROTOCOL}://${ENV.SERVICE.HOST}:${port}`;
  return `${ENV.SERVICE.PROTOCOL}://${ENV.SERVICE.HOST}`;
}

export async function sleep(ms: number): Promise<void> {
  if (ms)
    await new Promise<void>((resolve) => {
      const timeoutId = setTimeout(() => {
        clearTimeout(timeoutId);
        resolve();
      }, ms);
    });
}
