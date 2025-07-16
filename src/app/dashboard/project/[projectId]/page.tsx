import { redirect, RedirectType } from "next/navigation";

type ProjectIdProps = {
  params: Promise<{ projectId: string }>;
};

const ProjectIdPage = async ({ params }: ProjectIdProps) => {
  const { projectId } = await params;
  redirect(`${projectId}/overview`, RedirectType.replace);
  return null;
};

export default ProjectIdPage;
