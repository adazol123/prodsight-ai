import { ComponentProps } from "react";

type Props = {
  project: {
    name: string;
    description?: string;
    completion?: number;
    updated_at?: string;
  };
  link?: string;
} & ComponentProps<"div">;

const ProjectCard = ({
  variant = "grid",
  project,
  ...props
}: Props & Partial<{
  variant: "grid" | "list";
}>) => {

  return (
    <>
      {variant === "list" ? (
        <ProjectCardList project={project} {...props} />
      ) : (
        <ProjectCardGrid project={project} {...props} />
      )}
    </>
  );
};

const ProjectCardGrid = ({ project, ...props }: Props) => {
  return (
    <div
      className="rounded-2xl bg-white/5 border dark:bg-[#23232b]/5 backdrop-blur-md p-5 flex flex-col gap-1 min-h-[240px] transition-[shadow,border,color] hover:shadow-md hover:bg-white/10 cursor-pointer duration-200"
      tabIndex={0}
      role="button"
      aria-label={`Open ${project.name}`}
      //   onClick={() => alert(`Open project: ${project.name}`)}
      //   onKeyDown={(e) => {
      //     if (e.key === "Enter") alert(`Open project: ${project.name}`);
      //   }}
      {...props}
    >
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
        {project.name}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-300 mb-2 line-clamp-4">
        {project.description}
      </p>
      <div className="flex items-end justify-between gap-2 mt-auto">
        {!!project?.completion && (
          <div>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {project.completion}% completion
            </span>
            <div className="flex-1 h-2 rounded bg-gray-300 dark:bg-gray-700 overflow-hidden">
              <div
                className="h-2 rounded bg-green-500"
                style={{ width: `${project.completion}%` }}
              />
            </div>
          </div>
        )}
        {!!project?.updated_at && (
          <span className="text-xs text-gray-400 ml-2">
            {project.updated_at}
          </span>
        )}
      </div>
    </div>
  );
};

const ProjectCardList = ({ project, ...props }: Props) => {
  return (
    <div
      className="rounded-xl bg-white/5 border dark:bg-[#23232b] px-4 py-3 flex items-center gap-4 min-h-[60px] transition-[shadow,scale] hover:shadow-sm hover:scale-[1.005] cursor-pointer duration-200"
      tabIndex={0}
      role="button"
      aria-label={`Open ${project.name}`}
      onClick={() => alert(`Open project: ${project.name}`)}
      onKeyDown={(e) => {
        if (e.key === "Enter") alert(`Open project: ${project.name}`);
      }}
      {...props}
    >
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900 dark:text-white">
          {project.name}
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-300 line-clamp-2">
          {project.description}
        </p>
      </div>
      <div className="flex flex-col items-end gap-1">
        {!!project?.completion && (
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {project.completion}%
          </span>
        )}
        {!!project?.updated_at && (
          <span className="text-xs text-gray-400">{project.updated_at}</span>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
