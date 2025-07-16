import React from "react";



const ProjectNavigationLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {

  return (
    <div>
      {/* <nav className="flex items-center gap-2">
        {links.map((link) => (
          <Link key={link.id} href={link.url}>
            {link.label}
          </Link>
        ))}
      </nav> */}
      {/* <Separator /> */}
      {children}
    </div>
  );
};

export default ProjectNavigationLayout;
