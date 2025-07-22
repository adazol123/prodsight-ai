import { create } from 'zustand'

export type KanbanTask = {
  id: string
  title: string
  type: 'bug' | 'feature' | 'improvement'
  status: string
}

export type KanbanColumn = {
  id: string
  title: string
  tasks: KanbanTask[]
}

interface KanbanStore {
  columns: KanbanColumn[]
  searchQuery: string
  groupBy: string | null
  setSearchQuery: (query: string) => void
  setGroupBy: (value: string | null) => void
  initializeColumns: (defaultColumns: string[]) => void
  initializeTasks: (tasks: Array<{ id: string; title: string; type: KanbanTask['type']; status: string }>) => void
  addColumn: (title: string) => void
  updateColumn: (id: string, title: string) => void
  removeColumn: (id: string) => void
  reorderColumns: (columns: KanbanColumn[]) => void
  addTask: (columnId: string, task: Omit<KanbanTask, 'id' | 'status'>) => void
  moveTask: (
    taskId: string,
    sourceColumnId: string,
    targetColumnId: string
  ) => void
}

export const useKanbanStore = create<KanbanStore>(set => ({
  columns: [],
  searchQuery: '',
  groupBy: null,
  
  initializeColumns: (defaultColumns) =>
    set({
      columns: defaultColumns.map((title, index) => ({
        id: String(index + 1),
        title,
        tasks: [],
      })),
    }),

  initializeTasks: (tasks) =>
    set((state) => ({
      columns: state.columns.map((col) => ({
        ...col,
        tasks: tasks
          .filter((task) => task.status.toUpperCase() === col.title)
          .map((task) => ({
            id: task.id,
            title: task.title,
            type: task.type,
            status: task.status,
          })),
      })),
    })),

  setSearchQuery: query => set({ searchQuery: query }),
  setGroupBy: value => set({ groupBy: value }),

  addColumn: title =>
    set(state => ({
      columns: [
        ...state.columns,
        { id: Math.random().toString(), title, tasks: [] }
      ]
    })),

  updateColumn: (id, title) =>
    set(state => ({
      columns: state.columns.map(col =>
        col.id === id ? { ...col, title } : col
      )
    })),

  removeColumn: id =>
    set(state => ({
      columns: state.columns.filter(col => col.id !== id)
    })),

  reorderColumns: columns => set({ columns }),

  addTask: (columnId, task) =>
    set(state => ({
      columns: state.columns.map(col =>
        col.id === columnId
          ? {
              ...col,
              tasks: [
                ...col.tasks,
                {
                  ...task,
                  id: Math.random().toString(),
                  status: col.title
                }
              ]
            }
          : col
      )
    })),

  moveTask: (taskId, sourceColumnId, targetColumnId) =>
    set(state => {
      const sourceColumn = state.columns.find(col => col.id === sourceColumnId)
      const targetColumn = state.columns.find(col => col.id === targetColumnId)

      if (!sourceColumn || !targetColumn) return state

      const task = sourceColumn.tasks.find(t => t.id === taskId)
      if (!task) return state

      return {
        columns: state.columns.map(col => {
          if (col.id === sourceColumnId) {
            return {
              ...col,
              tasks: col.tasks.filter(t => t.id !== taskId)
            }
          }
          if (col.id === targetColumnId) {
            return {
              ...col,
              tasks: [...col.tasks, { ...task, status: targetColumn.title }]
            }
          }
          return col
        })
      }
    })
}))
