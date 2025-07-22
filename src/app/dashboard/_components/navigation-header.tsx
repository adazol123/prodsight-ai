"use client";
import { ScrollArea, ScrollBar } from "@/components/shared/scroll-area";
import { Separator } from "@/components/shared/separator";
import { Skeleton } from "@/components/shared/skeleton";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import {
  PROJECTBYID_KEY,
  queryProjectById,
} from "../_actions/project.query.action";

type ProjectNavigationHeaderProps = {
  links: {
    id: string;
    label: string;
    url: string;
    icon: unknown;
    isUpcoming?: boolean;
  }[];
  projectId?: string;
};

const ProjectNavigationHeader = (props: ProjectNavigationHeaderProps) => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const { isFetching, data } = useQuery({
    queryKey: [PROJECTBYID_KEY, props.projectId],
    queryFn: async ({ queryKey }) => {
      const { result, error } = await queryProjectById<any>(queryKey[1]!);
      if (error) throw error;
      else {
        return result;
      }
    },
  });

  const productOverview = data?.project_overview;

  // Refs for each link
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  // Snap to active link on mount or path change
  useEffect(() => {
    const activeIdx = props.links.findIndex(
      (link) => link.url === segments[segments.length - 1]
    );
    if (activeIdx !== -1 && linkRefs.current[activeIdx]) {
      linkRefs.current[activeIdx]?.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [pathname, props.links, segments]);

  return (
    <div className="max-h-[220px] -mx-3 px-3 sticky top-0 z-30 bg-neutral-50 flex flex-col justify-between gap-4">
      <div className="my-4">
        {isFetching ? (
          <>
            <Skeleton className="h-7 max-w-[16ch] mb-1.5" />
            <Skeleton className="h-3 max-w-[80ch] mb-1.5" />
            <Skeleton className="h-3 max-w-[60ch] mb-1.5" />
            <Skeleton className="h-3 max-w-[64ch] mb-1.5" />
          </>
        ) : (
          <>
            <h3 className="text-xl font-medium">{productOverview?.title}</h3>
            <p className="text-xs max-w-[100ch] text-foreground/60 line-clamp-4">
              {productOverview?.description}
            </p>
          </>
        )}
      </div>
      <ScrollArea className="w-full">
        <nav className="flex items-center gap-1">
          {props.links.map((link, idx) => {
            const isActive = link.url === segments[segments.length - 1];
            return (
              <Link
                ref={(el) => (linkRefs.current[idx] = el) as unknown as any}
                className={cn(
                  "px-3 rounded-2xl hover:bg-muted/60 relative text-foreground/90 hover:text-foreground py-0.5 text-nowrap select-none text-xs transition-[colors]",
                  {
                    "bg-foreground text-background": isActive,
                    "pointer-events-none text-foreground/50": link.isUpcoming,
                  }
                )}
                aria-disabled={link.isUpcoming}
                key={link.id}
                href={link.url}
                title={link.isUpcoming? "Coming soon": link.label}
                replace
                onClick={() => {
                  linkRefs.current[idx]?.scrollIntoView({
                    behavior: "smooth",
                    inline: "center",
                    block: "nearest",
                  });
                }}
              >
                {link.label}
                {/* {link.isUpcoming && (
                  <div className="text-[0.35rem] absolute -top-0 right-0 text-background bg-neutral-600 px-1 py-0.5 rounded-2xl">Coming soon</div>
                )} */}
              </Link>
            );
          })}
        </nav>
        <ScrollBar orientation="horizontal" className="hidden" />
      </ScrollArea>
      <Separator />
    </div>
  );
};

export default ProjectNavigationHeader;
