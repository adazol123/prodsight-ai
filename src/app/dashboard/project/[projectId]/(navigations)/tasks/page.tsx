"use client"

import { PROJECTBYID_KEY, queryProjectById } from "@/app/dashboard/_actions/project.query.action";
import { useKanbanStore } from "@/store/kanban-store";
import { useQuery } from "@tanstack/react-query";
import { toUpper } from "lodash";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { KanbanBoard } from "./_components/kanban-board";
import { KanbanControls } from "./_components/kanban-controls";

type Sprint = {
  id: string;
  sprint_id: string;
  title: string;
  story_points: string;
  duration: string;
  complexity: string;
  focus: string;
  status: string;
  tasks_user_stories: string[],
  type: "bug" | "feature" | "improvement";
}

interface SprintPlanning {
  cadence: string;
  ceremonies: string;
  note: string;
  sprints: Sprint[];
  tooling: string;
}

function TasksPage() {
  const params = useParams();
  const { initializeColumns, initializeTasks } = useKanbanStore();

  const { isFetching, data } = useQuery({
    queryKey: [PROJECTBYID_KEY, params.projectId as string],
    queryFn: async ({ queryKey }) => {
      const { result, error } = await queryProjectById<{
        sprint_planning: SprintPlanning
      }>(queryKey[1]!);
      if (error) throw error;
      else return result;
    }
  });

  useEffect(() => {
    if (data?.sprint_planning) {
      // Initialize columns with default statuses
      initializeColumns(['TO DO', 'IN PROGRESS', 'DONE']);

      // Convert sprint tasks to kanban tasks
      if (data?.sprint_planning?.sprints) {
        const tasks = data.sprint_planning.sprints.map((sprint) => ({
          id: sprint.id,
          title: sprint.title,
          type: sprint.type, // You might want to add proper type detection logic
          status: toUpper(sprint.status)
        }));

        initializeTasks(tasks);
      }
    }
  }, [data, initializeColumns, initializeTasks]);

  console.log(data?.sprint_planning)

  if (isFetching) {
    return <div>Loading...</div>;
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <KanbanControls />
      <KanbanBoard />
    </div>
  );
}

export default TasksPage;
