import { ColumnDef } from "@tanstack/react-table";
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
export function ConvertToColumnDef(columns): ColumnDef<typeof columns>[] {
  return Object.keys(columns).map((key) => {
    return {
      accessorKey: key,
      header: correctText(key),
    };
  });
}
