import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function correctText(text: string) {
  return capitalizeFirstLetter(text.split("_").join(" "));
}

export function formatDateTime(input: string | Date): string {
  let date: Date;

  if (input instanceof Date) {
    date = input;
  } else {
    // Remove microseconds and convert to ISO format
    const trimmed = input.split(".")[0];
    const isoStr = trimmed.replace(" ", "T");
    date = new Date(isoStr);
  }

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  return date.toLocaleString("en-US", options).replace(",", " at");
}

// Examples:
console.log(formatDateTime("2025-04-18 08:27:53.655455"));
// Output: April 18, 2025 at 08:27 AM

console.log(formatDateTime(new Date()));
// Output: Current date in the same format
