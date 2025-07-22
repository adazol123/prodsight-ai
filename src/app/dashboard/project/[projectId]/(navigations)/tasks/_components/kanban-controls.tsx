"use client"

import { useKanbanStore } from '@/store/kanban-store'
import * as Select from '@radix-ui/react-select'

export function KanbanControls() {
  const { searchQuery, setSearchQuery, groupBy, setGroupBy } = useKanbanStore()

  return (
    <div className="flex items-center gap-4 p-4">
      <div className="flex-1">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-lg border px-4 py-2 focus:border-blue-500 focus:outline-none"
        />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500">Group By</span>
        <Select.Root value={groupBy || undefined} onValueChange={setGroupBy}>
          <Select.Trigger className="inline-flex items-center justify-center rounded px-4 py-2 text-sm leading-none hover:bg-gray-100 focus:outline-none">
            <Select.Value placeholder="Select..." />
          </Select.Trigger>

          <Select.Portal>
            <Select.Content className="overflow-hidden rounded-md bg-white shadow-lg">
              <Select.Viewport className="p-2">
                <Select.Item
                  value="type"
                  className="relative flex h-8 select-none items-center rounded px-4 py-2 text-sm leading-none data-[highlighted]:bg-gray-100 data-[highlighted]:outline-none"
                >
                  <Select.ItemText>Type</Select.ItemText>
                </Select.Item>
                <Select.Item
                  value="status"
                  className="relative flex h-8 select-none items-center rounded px-4 py-2 text-sm leading-none data-[highlighted]:bg-gray-100 data-[highlighted]:outline-none"
                >
                  <Select.ItemText>Status</Select.ItemText>
                </Select.Item>
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>
    </div>
  )
}
