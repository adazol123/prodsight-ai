/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { useDndContext, type UniqueIdentifier } from '@dnd-kit/core'
import { SortableContext, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useMemo } from 'react'
import { Task, TaskCard } from './task-card'

export interface Column {
    id: UniqueIdentifier
    title: string
}

export type ColumnType = 'Column'

export interface ColumnDragData {
    type: ColumnType
    column: Column
}

interface BoardColumnProps {
    column: Column
    tasks: Task[]
    isOverlay?: boolean
}

export function BoardColumn({
    column,
    tasks,
    isOverlay
}: BoardColumnProps) {
    const tasksIds = useMemo(() => {
        return tasks.map(task => task.id)
    }, [tasks])

    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging
    } = useSortable({
        id: column.id,
        data: {
            type: 'Column',
            column
        } as ColumnDragData,
        attributes: {
            roleDescription: `Column: ${column.title}`
        }
    })

    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    }

    const { active } = useDndContext()
    const isTopLevelDragging = active?.data.current?.type === 'Column'

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="h-full w-full flex flex-col text-gray-900 dark:text-white"
        >
            <div
                {...attributes}
                {...listeners}
                className="bg-gray-100 dark:bg-gray-800 p-4 font-semibold border-b-2 border-gray-200 dark:border-gray-700 flex justify-between"
            >
                <div> {column.title}</div>
                <div>
                    <button className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 rounded-md">
                        Add Task
                    </button>
                </div>
            </div>
            <div className="flex flex-grow flex-col gap-4 p-2 overflow-y-auto">
                <SortableContext items={tasksIds}>
                    {tasks.map(task => (
                        <TaskCard key={task.id} task={task} />
                    ))}
                </SortableContext>
            </div>
        </div>
    )
}

export function KanbanColumn({ column, tasks }: BoardColumnProps) {
    return (
        <BoardColumn
            column={column}
            tasks={tasks}
        />
    )
}
