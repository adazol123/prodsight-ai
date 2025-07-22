"use client";

import { type KanbanTask as KanbanTaskType } from "@/store/kanban-store";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  task: KanbanTaskType;
  columnId?: string;
}

const typeColors = {
  bug: "bg-red-300/20",
  feature: "bg-blue-300/20",
  improvement: "bg-green-300/20",
  development: "bg-purple-300/20",
};

export function KanbanTask({ task, columnId }: Props) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
      columnId,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`mb-2 cursor-grab select-none rounded-lg p-4 ${
        typeColors?.[task.type] || "bg-neutral-300/20"
      } ${isDragging ? "opacity-50" : ""}`}
    >
      <h4 className="font-medium">{task.title}</h4>
      <div className="mt-2 flex items-center gap-1 justify-between">
        <span className="text-[0.6rem]">{task.id}</span>
        <div className="flex items-center gap-1">
          <span className="inline-block rounded-2xl bg-white px-2 py-1 text-[0.6rem] capitalize">
            {task.type}
          </span>
          <span className="inline-block rounded-2xl bg-white px-2 py-1 text-[0.6rem] capitalize">
            {task.status}
          </span>
        </div>
      </div>
    </div>
  );
}
