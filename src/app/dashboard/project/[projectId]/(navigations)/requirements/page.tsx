"use client"
import { PROJECTBYID_KEY, queryProjectById } from '@/app/dashboard/_actions/project.query.action';
import { Badge } from '@/components/shared/badge';
import { Button } from '@/components/shared/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/shared/card';
import { ScrollArea } from '@/components/shared/scroll-area';
import { cn } from '@/lib/utils';
import { IconPencil } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { DraggableUserStoryList } from './_components/draggable-user-story-list';

// Define the type for a single requirement based on your data structure
interface Requirement {
  id: string
  title: string
  status: string
  assignee: string
  priority: string
  difficulty: string
  project_id: string
  description: string
  user_stories: string[]
  roadmap_phase: string
  time_to_complete: string
  suggested_implementation: string
}

const RequirementsPage = () => {
  const params = useParams()
  const { isFetching, data } = useQuery({
    queryKey: [PROJECTBYID_KEY, params.projectId as string],
    queryFn: async ({ queryKey }) => {
      const { result, error } = await queryProjectById(queryKey[1]!)
      if (error) throw error
      else return result
    }
  })

  const requirements: Requirement[] = data?.requirements || []
  const [selectedRequirement, setSelectedRequirement] =
    useState<Requirement | null>(null)

  // Set the first requirement as selected by default
  useEffect(() => {
    if (requirements.length > 0 && !selectedRequirement) {
      setSelectedRequirement(requirements[0])
    }
  }, [requirements, selectedRequirement])

  if (isFetching) {
    return <div>Loading...</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-1 h-full py-4">
      {/* Left Column: Scrollable List of Requirements */}
      <div className="md:col-span-1 h-full flex flex-col sticky top-[200px]">
        <h2 className="text-xl font-bold mb-4">Requirements</h2>
        <div className="flex-grow overflow-y-auto max-h-[70lvh]">
          <ScrollArea className="py-0.5">
            <div className="space-y-2 pr-2.5">
              {requirements.map(req => (
                <Card
                  key={req.id}
                  className={cn(
                    'cursor-pointer transition-all hover:shadow-md',
                    selectedRequirement?.id === req.id &&
                    'border-primary shadow-xs'
                  )}
                  onClick={() => setSelectedRequirement(req)}
                >
                  <CardHeader>
                    <CardTitle className="text-base">{req.title}</CardTitle>
                    <CardDescription className="space-x-1">
                      <Badge>{req.priority} Priority</Badge>
                      <Badge variant="outline">{req.status}</Badge>
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Right Column: Details of Selected Requirement */}
      <div className="md:col-span-2 h-full">
        <h2 className="text-xl font-bold mb-4">Details</h2>
        <ScrollArea className="h-[calc(100vh-10px)]">
          {selectedRequirement ? (
            <Card>
              <CardHeader>
                <div className='flex justify-between'>
                <CardTitle className="text-2xl">
                  {selectedRequirement.title}
                </CardTitle>

                  <Button size="icon" variant="ghost">
                    <IconPencil />
                  </Button>
                </div>
                <div className="flex gap-2 pt-2">
                  <Badge>{selectedRequirement.priority} Priority</Badge>
                  <Badge variant="secondary">
                    {selectedRequirement.difficulty}
                  </Badge>
                  <Badge variant="outline">{selectedRequirement.status}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold">Description</h3>
                  <p className="text-muted-foreground">
                    {selectedRequirement.description}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold">User Stories</h3>
                  <DraggableUserStoryList
                    stories={selectedRequirement.user_stories}
                  />
                </div>
                <div>
                  <h3 className="font-semibold">Implementation Details</h3>
                  <p className="text-muted-foreground">
                    {selectedRequirement.suggested_implementation}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-semibold">Assignee</h4>
                    <p className="text-muted-foreground">
                      {selectedRequirement.assignee}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Roadmap Phase</h4>
                    <p className="text-muted-foreground">
                      {selectedRequirement.roadmap_phase}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Time to Complete</h4>
                    <p className="text-muted-foreground">
                      {selectedRequirement.time_to_complete}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              <p>Select a requirement to see the details.</p>
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  )
}

export default RequirementsPage