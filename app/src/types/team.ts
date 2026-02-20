interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: "online" | "offline" | "away";
}

interface Team {
  id: string;
  name: string;
  description: string;
  members: TeamMember[];
  projects: number;
  color: string;
  createdDate: string;
  privacy: "public" | "private";
}

export type { TeamMember, Team };
