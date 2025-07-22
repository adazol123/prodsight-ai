
import Breadcrumbs from "@/app/_components/breadcrumbs";
import { Separator } from "@/components/shared/separator";
import { Skeleton } from "@/components/shared/skeleton";
import { cn } from "@/lib/utils";
import { layoutVariants } from "@/styles/variants/layout.variant";
import React from "react";
import ProjectNavigationHeader from "../../_components/navigation-header";

const links = [
  {
    id: "_overview",
    label: "Overview",
    icon: null,
    url: "overview",
  },
  {
    id: "_requirements",
    label: "Requirements",
    icon: null,
    url: "requirements",
  },
    {
    id: "_tasks",
    label: "Tasks",
    icon: null,
    url: "tasks",
  },
    {
    id: "_analysis",
    label: "Analysis",
    icon: null,
    isUpcoming: true,
    url: "analysis",
  },
    {
    id: "_ai_consultant",
    label: "AI Consultant",
    icon: null,
    isUpcoming: true,
    url: "consultant",
  },
    {
    id: "_ai_team",
    label: "AI Team",
    isUpcoming: true,
    icon: null,
    url: "team",
  },
    {
    id: "_integrations",
    label: "Integrations",
    icon: null,
    isUpcoming: true,
    url: "integrations",
  },
  {
    id: "_settings",
    label: "Settings",
    icon: null,
    url: "settings",
  },
];

const ProjectNavigationLayout = async ({
  children,
  params
}: Readonly<{ children: React.ReactNode, params: Promise<{ projectId: string}>}>) => {
  const { projectId } = await params

  if(!projectId) return <ProjectNavLayoutSkeleton />

  return (
    <div
      className={cn(
        layoutVariants({
          className: "mx-auto px-4 md:px-8 flex-1 flex flex-col min-h-lvh",
        })
      )}
    >
      <Breadcrumbs />

      <ProjectNavigationHeader links={links} projectId={projectId} />
      {children}
    </div>
  );
};


const ProjectNavLayoutSkeleton = () => {
  return <div
      className={cn(
        layoutVariants({
          className: "mx-auto px-4 md:px-8 flex-1 flex flex-col",
        })
      )}
    >
      <Skeleton className="h-5 w-16" />
      <Skeleton className="h-8 w-32" />
      <Separator />
    </div>
}

export default ProjectNavigationLayout;
