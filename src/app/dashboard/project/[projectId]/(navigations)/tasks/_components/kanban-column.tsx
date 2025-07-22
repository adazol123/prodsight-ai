"use client"

import { type KanbanColumn as KanbanColumnType } from '@/store/kanban-store'
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { KanbanTask } from './kanban-task'

interface Props {
  column: KanbanColumnType
}

export function KanbanColumn({ column }: Props) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: 'Column',
      column,
    },
  })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex h-full flex-1 min-h-[500px] w-[350px] flex-col rounded-lg bg-background p-4 ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <div
        {...attributes}
        {...listeners}
        className="flex items-center justify-between"
      >
        <h3 className="font-medium">{column.title}</h3>
        <span className="rounded-2xl bg-white px-2 py-1 text-sm text-gray-500">
          {column.tasks.length}
        </span>
      </div>

      <div className="flex-1 mt-4">
        <SortableContext
          items={column.tasks.map((task) => task.id)}
          strategy={verticalListSortingStrategy}
        >
          {column.tasks.map((task) => (
            <KanbanTask
              key={task.id}
              task={task}
              columnId={column.id}
            />
          ))}
        </SortableContext>
      </div>
    </div>
  )
}
