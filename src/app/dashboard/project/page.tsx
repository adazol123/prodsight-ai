import { redirect, RedirectType } from "next/navigation";

const ProjectRootPage = async () => {
  return redirect(`/dashboard`, RedirectType.replace);
};

export default ProjectRootPage;
