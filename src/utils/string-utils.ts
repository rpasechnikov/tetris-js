export function numberToString(value: number): string {
  return '' + value;
}

export function millisecondsSince(start: number, current: number): number {
  return current - start;
}

export function millisecondsToHoursMinutesSeconds(value: number): string {
  const seconds = Math.abs(Math.floor((value / 1000) % 60));
  const minutes = Math.abs(Math.floor((value / (60 * 1000)) % 60)) - 1;
  const minutesAdjusted = minutes < 0 ? 0 : minutes;

  const hours = Math.abs(Math.floor((value / (60 * 60 * 1000)) % 24)) - 1;
  const hoursAdjusted = hours < 0 ? 0 : hours;

  return `${hoursAdjusted}:${minutesAdjusted}:${seconds}`;
}

export function currentTimeMsToHoursMinutesSecondsSince(start: number): string {
  const currentMs = new Date().getTime();
  const elapsdMs = millisecondsSince(start, currentMs);

  return millisecondsToHoursMinutesSeconds(elapsdMs);
}
