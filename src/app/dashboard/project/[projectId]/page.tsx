import { redirect, RedirectType } from "next/navigation";
import React from "react";

type ProjectIdProps = {
  params: Promise<{ projectId: string }>;
  children: React.ReactNode;
};

const ProjectIdPage = async ({ params }: ProjectIdProps) => {
  const { projectId } = await params;
  return redirect(`${projectId}/overview`, RedirectType.replace);
};

export default ProjectIdPage;
