"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useMemo } from "react";

export function Navbar() {
  const pathname = usePathname();

  const pathSegments = useMemo(() => {
    // Split the pathname and filter out empty segments
    const segments = pathname
      .split("/")
      .filter((segment) => segment.length > 0);

    // Create breadcrumb items array
    const items = segments.map((segment, index) => {
      // Construct the full path up to this segment
      const href = "/" + segments.slice(0, index + 1).join("/");

      // Capitalize first letter of segment for display
      const displayName = segment.charAt(0).toUpperCase() + segment.slice(1);

      return {
        href,
        name: displayName,
        isLast: index === segments.length - 1,
      };
    });

    // If we're on root or empty path, return just Home
    if (!items.length) {
      return [{ href: "/dashboard", name: "Dashboard", isLast: true }];
    }

    // Replace the first segment with Dashboard if it's the home page
    if (items[0].href === "/dashboard") {
      items[0].name = "Dashboard";
    }

    return items;
  }, [pathname]);

  return (
    <Breadcrumb className="p-4 absolute">
      <BreadcrumbList>
        {pathSegments.map((segment) => (
          <div key={segment.href} className="flex items-center">
            <BreadcrumbItem>
              {segment.isLast ? (
                <BreadcrumbPage>{segment.name}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={segment.href}>{segment.name}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {!segment.isLast && <BreadcrumbSeparator />}
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
