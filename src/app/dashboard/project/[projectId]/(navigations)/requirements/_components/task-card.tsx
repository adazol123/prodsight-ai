/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { Badge } from '@/components/shared/badge'
import { Card, CardContent, CardHeader } from '@/components/shared/card'
import type { UniqueIdentifier } from '@dnd-kit/core'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

export interface Task {
    id: UniqueIdentifier
    columnId: UniqueIdentifier
    content: string
    title: string
    status: string
    parent: string
}

export interface TaskDragData {
    type: 'Task'
    task: Task
}

interface TaskCardProps {
    task: Task
    isOverlay?: boolean
}

export function TaskCard({ task, isOverlay }: TaskCardProps) {
    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging
    } = useSortable({
        id: task.id,
        data: {
            type: 'Task',
            task
        } as TaskDragData,
        attributes: {
            roleDescription: 'Task'
        }
    })

    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    }

    if (isDragging) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                className="p-4 bg-gray-200 dark:bg-gray-700 rounded-lg shadow-md"
            >
                {task.title}
            </div>
        )
    }

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <Card className="bg-white dark:bg-gray-800 shadow-sm">
                <CardHeader className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="font-semibold text-lg">{task.title}</h3>
                </CardHeader>
                <CardContent className="p-4">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                        {task.content}
                    </p>
                    <div className="flex justify-between items-center mt-4">
                        <Badge
                            className={
                                task.status === 'Completed'
                                    ? 'bg-green-500 text-white'
                                    : 'bg-yellow-500 text-white'
                            }
                        >
                            {task.status}
                        </Badge>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                            Parent: {task.parent}
                        </span>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
