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

  const secondsString = seconds < 10 ? `0${seconds}` : seconds;
  const minutesString = minutesAdjusted < 10 ? `0${minutesAdjusted}` : minutesAdjusted;
  const hoursString = hoursAdjusted < 10 ? `0${hoursAdjusted}` : hoursAdjusted;

  return `${hoursString}:${minutesString}:${secondsString}`;
}

export function currentTimeMsToHoursMinutesSecondsSince(start: number): string {
  const currentMs = new Date().getTime();
  const elapsdMs = millisecondsSince(start, currentMs);

  return millisecondsToHoursMinutesSeconds(elapsdMs);
}
