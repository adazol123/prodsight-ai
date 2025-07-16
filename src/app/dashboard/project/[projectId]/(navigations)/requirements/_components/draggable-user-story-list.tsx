'use client'

import {
    closestCenter,
    DndContext,
    DragEndEvent,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core'
import {
    arrayMove,
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical } from 'lucide-react'
import { useEffect, useState } from 'react'

interface UserStoryRowProps {
    id: string
    story: string
}

function UserStoryRow({ id, story }: UserStoryRowProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-md"
        >
            <button {...listeners} className="cursor-grab p-1">
                <GripVertical className="w-5 h-5 text-gray-400" />
            </button>
            <span className="flex-grow">{story}</span>
        </div>
    )
}

interface DraggableUserStoryListProps {
    stories: string[]
}

export function DraggableUserStoryList({
    stories,
}: DraggableUserStoryListProps) {
    const [items, setItems] = useState(
        stories.map((story, index) => ({ id: `story-${index}`, story }))
    )

    useEffect(() => {
        setItems(stories.map((story, index) => ({ id: `story-${index}`, story })))
    }, [stories])

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        })
    )

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event

        if (active.id !== over?.id) {
            setItems(items => {
                const oldIndex = items.findIndex(item => item.id === active.id)
                const newIndex = items.findIndex(item => item.id === over?.id)
                return arrayMove(items, oldIndex, newIndex)
            })
        }
    }

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <SortableContext
                items={items.map(item => item.id)}
                strategy={verticalListSortingStrategy}
            >
                <div className="space-y-2">
                    {items.map(({ id, story }) => (
                        <UserStoryRow key={id} id={id} story={story} />
                    ))}
                </div>
            </SortableContext>
        </DndContext>
    )
}
