"use client";
import { cn } from "@/lib/utils";
import { layoutVariants } from "@/styles/variants/layout.variant";
import { IconX } from "@tabler/icons-react";
import React from "react";
import { Button } from "../shared/button";

const TopBanner = () => {
  const [banner, toggleBanner] = React.useState(true);

  const toggleBannerHandler = () => {
    toggleBanner((prev) => !prev);
  };

  if (!banner) return null;
  return (
    <div className="bg-foreground text-background">
      <div
        className={cn(
          layoutVariants({
            className:
              "py-1 text-xs flex font-light items-center justify-between",
          })
        )}
      >
        <span>
          Disclaimer: This site is currently under development. Some features
          may be unstable or contain bugs.
        </span>
        <Button
          onClick={toggleBannerHandler}
          className="h-fit w-fit p-1"
          variant="ghost"
          size="icon"
        >
          <IconX className="size-3" />
        </Button>
      </div>
    </div>
  );
};

export default TopBanner;
