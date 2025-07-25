"use client";
import { cn } from "@/lib/utils";
import { layoutVariants } from "@/styles/variants/layout.variant";
import { createClient } from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { LayoutGrid, List } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import Breadcrumbs from "../_components/breadcrumbs";
import NewProjectButton from "../_components/new-project-button";
import EmptySection from "./_components/empty-section";
import ProjectCard from "./_components/project.card";

const dummyStats: {
  label: string;
  value: string;
}[] = [];

const Dashboard = () => {
  const supabase = createClient();
  const navigate = useRouter()
  const [activeTab, setActiveTab] = React.useState("Recent");
  const [viewMode, setViewMode] = React.useState<"card" | "list">("card");

  const { error, data, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      try {
        const session = await supabase.auth.getSession();
        if (!session.data.session?.access_token) {
          throw new Error("missing credentials");
        }
        const url = new URL("/api/v1/projects", window.location.origin);
        const { data, status } = await axios.get(url.href, {
          headers: {
            access_token: session.data.session?.access_token,
          },
        });
        if (status !== 200) {
          throw data;
        } else {
          return !!data?.result?.data?.length? data?.result.data : data?.result;
        }
      } catch (error) {
        throw error;
      }
    },
  });

  if (error) {
    console.error(error);
  }

  const projectPreviewMapper = !data?.length
    ? []
    : (data?.map(
        (project: {
          project_overview: { title: string; description: string };
          id: string;
        }) => {
          return {
            id: project.id,
            name: project.project_overview?.title,
            description: project.project_overview?.description,
            completion: 1,
            updated: `1 minute ago`,
          };
        }
      ) as {
        id: string;
        name: string;
        description: string;
        completion: number;
        updated: string;
      }[]);

  // React.useEffect(() => {
  //   if (activeTab === "Recent") {
  //     setProjects(projectPreviewMapper);
  //   } else if (activeTab === "All") {
  //     setProjects(projectPreviewMapper);
  //   } else if (activeTab === "Starred") {
  //     setProjects(projectPreviewMapper.slice(0, 2));
  //   }
  // }, [activeTab, projectPreviewMapper?.length]);

  return (
    <>
      <div
        className={cn(
          layoutVariants({
            className:
              "min-h-screen flex flex-col items-center bg-gray-50 dark:bg-[#18181b]",
            mode: "bleed",
            size: "none",
          })
        )}
      >
        <main
          className={cn(
            layoutVariants({
              className: "mx-auto px-4 md:px-8 flex-1 flex flex-col",
            })
          )}
        >
          <Breadcrumbs classes={{ navClassNames: "mt-4" }} />
          {/* <DemoBanner /> */}
          <div className="flex items-center justify-between  mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Your Projects
            </h1>
            <NewProjectButton variant="link" className="h-fit">
              <div className="inline-flex items-center gap-2">
                <span className="bg-white/10 rounded-full p-2">
                  <svg
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 4v16m8-8H4" />
                  </svg>
                </span>
                <span className="hidden sm:inline">New Project</span>
              </div>
            </NewProjectButton>
          </div>
          {/* Stats cards */}
          {!!dummyStats?.length && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8">
              {dummyStats.map((stat, i) => (
                <div
                  key={i}
                  className="rounded-2xl bg-white dark:bg-[#23232b] p-5 flex flex-col justify-between min-h-[100px] transition-shadow hover:shadow-md hover:scale-[1.01] cursor-pointer duration-200"
                >
                  <div className="text-base font-medium text-gray-700 dark:text-gray-200">
                    {stat.label}
                  </div>
                  <div className="text-3xl font-bold text-right mt-2">
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>
          )}
          {/* Filter bar */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex gap-1 bg-gray-100 dark:bg-[#23232b] rounded-lg p-1">
              <button
                className={`px-2 py-1 rounded-md transition ${
                  activeTab === "Recent"
                    ? "bg-white dark:bg-[#18181b] text-black dark:text-white font-medium"
                    : "text-gray-700 dark:text-gray-200"
                }`}
                onClick={() => setActiveTab("Recent")}
              >
                Recent
              </button>
              <button
                className={`px-2 py-1 rounded-md transition ${
                  activeTab === "All"
                    ? "bg-white dark:bg-[#18181b] text-black dark:text-white font-medium"
                    : "text-gray-700 dark:text-gray-200"
                }`}
                onClick={() => setActiveTab("All")}
              >
                All
              </button>
              <button
                className={`px-2 py-1 rounded-md transition ${
                  activeTab === "Starred"
                    ? "bg-white dark:bg-[#18181b] text-black dark:text-white font-medium"
                    : "text-gray-700 dark:text-gray-200"
                }`}
                onClick={() => setActiveTab("Starred")}
              >
                Starred
              </button>
            </div>
            {/* View mode toggle */}
            <div className="flex gap-1 ml-2 bg-gray-100 dark:bg-[#23232b] rounded-lg p-1">
              <button
                className={`px-2 py-1 rounded-md flex items-center gap-1 transition ${
                  viewMode === "card"
                    ? "bg-white dark:bg-[#18181b] text-black dark:text-white font-bold"
                    : "text-gray-700 dark:text-gray-200"
                }`}
                onClick={() => setViewMode("card")}
                title="Card View"
                aria-label="Card View"
              >
                <LayoutGrid className="w-5 h-5" />
              </button>
              <button
                className={`px-2 py-1 rounded-md flex items-center gap-1 transition ${
                  viewMode === "list"
                    ? "bg-white dark:bg-[#18181b] text-black dark:text-white font-bold"
                    : "text-gray-700 dark:text-gray-200"
                }`}
                onClick={() => setViewMode("list")}
                title="List View"
                aria-label="List View"
              >
                <List className="w-5 h-5" />
              </button>
            </div>
            <span className="ml-auto text-xs text-gray-500 dark:text-gray-400">
              {projectPreviewMapper.length}/10
            </span>
          </div>
          {isLoading ? (
            <div> Loading...</div>
          ) : !projectPreviewMapper.length ? (
            <div className="grid place-content-center min-h-[50lvh]">
              <EmptySection />
            </div>
          ) : (
            <>
              {/* Projects grid/list */}
              {viewMode === "card" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {projectPreviewMapper.map((proj, i) => (
                    <ProjectCard
                      key={i}
                      project={{
                        name: proj.name,
                        description: proj?.description,
                        completion: proj?.completion,
                        updated_at: proj?.updated,
                      }}
                      onClick={() => navigate.push(`/dashboard/project/${proj.id}`)}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {projectPreviewMapper.map((proj, i) => (
                    <ProjectCard
                      key={i}
                      variant="list"
                      project={{
                        name: proj.name,
                        description: proj?.description,
                        completion: proj?.completion,
                        updated_at: proj?.updated,
                      }}
                      onClick={() => navigate.push(`/dashboard/project/${proj.id}`)}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </>
  );
};

export default Dashboard;
