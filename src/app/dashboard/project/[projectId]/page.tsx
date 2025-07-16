import { redirect, RedirectType } from "next/navigation";
import React from "react";

type Props = {
  params: Promise<{ projectId: string }>;
  children: React.ReactNode;
};

const ProjectIdPage = async ({ params }: Props) => {
  const { projectId } = await params;
  return redirect(`${projectId}/overview`, RedirectType.replace);
};

export default ProjectIdPage;
