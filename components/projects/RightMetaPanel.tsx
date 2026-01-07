import type { ProjectDetails } from "@/lib/data/project-details"
import { TimeCard } from "@/components/projects/TimeCard"
import { BacklogCard } from "@/components/projects/BacklogCard"
import { QuickLinksCard } from "@/components/projects/QuickLinksCard"
import { Separator } from "@/components/ui/separator"

type RightMetaPanelProps = {
  project: ProjectDetails
}

export function RightMetaPanel({ project }: RightMetaPanelProps) {
  return (
    <aside className="flex flex-col gap-10 p-4 pt-8 lg:sticky lg:self-start">
      <TimeCard time={project.time} />
      <Separator />
      <BacklogCard backlog={project.backlog} />
      <Separator />
      <QuickLinksCard links={project.quickLinks} />
    </aside>
  )
}
