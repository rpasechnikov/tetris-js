export function numberToString(value: number): string {
  return '' + value;
}

export function millisecondsSince(start: number, current: number): number {
  return start - current;
}

export function millisecondsToHoursMinutesSeconds(value: number): string {
  const seconds = Math.abs(Math.floor(value / 1000));
  const minutes = Math.abs(Math.floor(seconds / 60));
  const hours = Math.abs(Math.floor(minutes / 60));

  return `${hours}:${minutes}:${seconds}`;
}

export function currentTimeMsToHoursMinutesSecondsSince(start: number): string {
  const currentMs = new Date().getTime();
  const elapsdMs = millisecondsSince(start, currentMs);

  return millisecondsToHoursMinutesSeconds(elapsdMs);
}
