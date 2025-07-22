"use client"

import { useKanbanStore } from '@/store/kanban-store'
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable'
import { useState } from 'react'
import { KanbanColumn } from './kanban-column'
import { KanbanTask } from './kanban-task'

export function KanbanBoard() {
  const [activeColumn, setActiveColumn] = useState<string | null>(null)
  const [activeTask, setActiveTask] = useState<string | null>(null)
  
  const { columns, reorderColumns, moveTask } = useKanbanStore()
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  )

  function handleDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === 'Column') {
      setActiveColumn(event.active.id as string)
    }
    if (event.active.data.current?.type === 'Task') {
      setActiveTask(event.active.id as string)
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveColumn(null)
    setActiveTask(null)

    const { active, over } = event
    if (!over) return

    if (active.id === over.id) return

    if (active.data.current?.type === 'Column') {
      const activeColumnIndex = columns.findIndex((col) => col.id === active.id)
      const overColumnIndex = columns.findIndex((col) => col.id === over.id)

      reorderColumns(arrayMove(columns, activeColumnIndex, overColumnIndex))
    }
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event
    if (!over) return

    if (active.id === over.id) return

    if (active.data.current?.type !== 'Task') return

    const activeColumnId = active.data.current?.columnId
    const overColumnId = over.data.current?.type === 'Task' 
      ? over.data.current?.columnId 
      : over.id

    if (activeColumnId === overColumnId) return

    moveTask(active.id as string, activeColumnId, overColumnId as string)
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      <div className="flex min-h-screen w-full gap-1 p-4">
        <SortableContext
          items={columns.map((col) => col.id)}
          strategy={horizontalListSortingStrategy}
        >
          {columns.map((column) => (
            <KanbanColumn
              key={column.id}
              column={column}
            />
          ))}
        </SortableContext>
      </div>

      <DragOverlay>
        {activeColumn && (
          <KanbanColumn
            column={columns.find((col) => col.id === activeColumn)!}
          />
        )}
        {activeTask && (
          <KanbanTask
            task={
              columns
                .flatMap((col) => col.tasks)
                .find((task) => task.id === activeTask)!
            }
          />
        )}
      </DragOverlay>
    </DndContext>
  )
}
