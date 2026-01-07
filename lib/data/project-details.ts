import type { Project as ProjectListItem } from "@/lib/data/projects"
import { projects } from "@/lib/data/projects"
import { getAvatarUrl } from "@/lib/assets/avatars"

export type User = {
  id: string
  name: string
  avatarUrl?: string
  role?: string
}

export type ProjectMeta = {
  priorityLabel: string
  locationLabel: string
  sprintLabel: string
  lastSyncLabel: string
}

export type ProjectScope = {
  inScope: string[]
  outOfScope: string[]
}

export type KeyFeatures = {
  p0: string[]
  p1: string[]
  p2: string[]
}

export type TimelineTask = {
  id: string
  name: string
  startDate: Date
  endDate: Date
  status: "planned" | "in-progress" | "done"
}

export type TimeSummary = {
  estimateLabel: string
  dueDate: Date
  daysRemainingLabel: string
  progressPercent: number
}

export type BacklogSummary = {
  statusLabel: "Active" | "Backlog" | "Planned" | "Completed" | "Cancelled"
  groupLabel: string
  priorityLabel: string
  labelBadge: string
  picUsers: User[]
  supportUsers?: User[]
}

export type QuickLink = {
  id: string
  name: string
  type: "pdf" | "zip" | "fig" | "doc" | "file"
  sizeMB: number
  url: string
}

export type ProjectDetails = {
  id: string
  name: string
  description: string
  meta: ProjectMeta
  scope: ProjectScope
  outcomes: string[]
  keyFeatures: KeyFeatures
  timelineTasks: TimelineTask[]
  time: TimeSummary
  backlog: BacklogSummary
  quickLinks: QuickLink[]
  source?: ProjectListItem
}

function userFromName(name: string, role?: string): User {
  return {
    id: name.trim().toLowerCase().replace(/\s+/g, "-"),
    name,
    avatarUrl: getAvatarUrl(name),
    role,
  }
}

function baseDetailsFromListItem(p: ProjectListItem): ProjectDetails {
  const picUsers = p.members.length ? p.members.map((n) => userFromName(n, "PIC")) : [userFromName("Jason Duong", "PIC")]

  return {
    id: p.id,
    name: p.name,
    description: p.client
      ? `Project for ${p.client}. This is mock content that will be replaced by API later.`
      : "This is mock content that will be replaced by API later.",
    meta: {
      priorityLabel: p.priority.charAt(0).toUpperCase() + p.priority.slice(1),
      locationLabel: "Australia",
      sprintLabel: p.typeLabel && p.durationLabel ? `${p.typeLabel} ${p.durationLabel}` : p.durationLabel ?? "MVP 2 weeks",
      lastSyncLabel: "Just now",
    },
    scope: {
      inScope: ["Define scope", "Draft solution", "Validate with stakeholders", "Prepare handoff"],
      outOfScope: ["Backend logic changes", "Marketing landing pages"],
    },
    outcomes: ["Reduce steps and improve usability", "Increase success rate", "Deliver production-ready UI"],
    keyFeatures: {
      p0: ["Core user flow"],
      p1: ["Filters and empty states"],
      p2: ["Visual polish"],
    },
    timelineTasks: [
      {
        id: `${p.id}-t1`,
        name: "Audit existing flows",
        startDate: new Date(2025, 11, 26),
        endDate: new Date(2025, 11, 27),
        status: "done",
      },
      {
        id: `${p.id}-t2`,
        name: "Redesign onboarding & payment",
        startDate: new Date(2025, 11, 28),
        endDate: new Date(2025, 11, 30),
        status: "in-progress",
      },
      {
        id: `${p.id}-t3`,
        name: "Usability testing",
        startDate: new Date(2025, 11, 30),
        endDate: new Date(2026, 0, 1),
        status: "planned",
      },
      {
        id: `${p.id}-t4`,
        name: "Iterate based on feedback",
        startDate: new Date(2026, 0, 1),
        endDate: new Date(2026, 0, 2),
        status: "planned",
      },
    ],
    time: {
      estimateLabel: "1 months",
      dueDate: new Date(2025, 11, 31),
      daysRemainingLabel: "21 Days to go",
      progressPercent: 75,
    },
    backlog: {
      statusLabel: "Active",
      groupLabel: "None",
      priorityLabel: p.priority.charAt(0).toUpperCase() + p.priority.slice(1),
      labelBadge: "Design",
      picUsers,
      supportUsers: [userFromName("Support", "Support")],
    },
    quickLinks: [],
    source: p,
  }
}

export function getProjectDetailsById(id: string): ProjectDetails {
  const base = projects.find((p) => p.id === id)

  const effectiveBase: ProjectListItem =
    base ?? {
      id,
      name: `Untitled project ${id}`,
      taskCount: 0,
      progress: 0,
      startDate: new Date(),
      endDate: new Date(),
      status: "planned",
      priority: "medium",
      tags: [],
      members: [],
      tasks: [],
    }

  const details = baseDetailsFromListItem(effectiveBase)

  if (base?.id === "1") {
    details.description =
      "The internal project aims to optimize user experience and interface for the PM System Core. The goal is to standardize UX, enhance usability, and create a design content repository for daily publication on social media."

    details.scope = {
      inScope: [
        "UX research (existing users, light interviews)",
        "Core flows redesign (Onboarding, Payment, Transaction history)",
        "Design system (starter components)",
        "Usability fixes for critical flows",
      ],
      outOfScope: ["New feature ideation", "Backend logic changes", "Marketing landing pages"],
    }

    details.outcomes = [
      "Reduce payment flow steps from 6 → 4",
      "Increase task success rate (usability test) from 70% → 90%",
      "Deliver production-ready UI for MVP build",
      "Enable dev handoff without design clarification loops",
    ]

    details.keyFeatures = {
      p0: ["Onboarding & KYC flow", "Payment confirmation UX"],
      p1: ["Transaction history & filters", "Error / empty states"],
      p2: ["Visual polish & motion guidelines"],
    }

    details.quickLinks = [
      { id: "ql-1", name: "Proposal.pdf", type: "pdf", sizeMB: 13.0, url: "#" },
      { id: "ql-2", name: "Wireframe Layout.zip", type: "zip", sizeMB: 13.0, url: "#" },
      { id: "ql-3", name: "UI Kit.fig", type: "fig", sizeMB: 13.0, url: "#" },
    ]
  }

  return details
}
