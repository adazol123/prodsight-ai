import { info } from "@/_temp/info";
import { Badge } from "@/components/shared/badge";
import { ScrollArea, ScrollBar } from "@/components/shared/scroll-area";
import { cn } from "@/lib/utils";
import { backgroundTextColorVariants } from "@/styles/variants/background-color.variant";
import { layoutVariants } from "@/styles/variants/layout.variant";
import Image from "next/image";

const UseCaseSection = () => {
  const useCases = info.usecase;
  return (
    <section className={cn(layoutVariants({ className: "min-h-dvh py-8" }))}>
      <div className="space-y-2 mb-8">
        <div className="mx-auto w-fit">
          <Badge
            variant="outline"
            className="text-[#555] px-4 rounded-full text-xs font-light"
          >
            Preview
          </Badge>
        </div>
        <h1
          className={cn(
            backgroundTextColorVariants({
              bgText: "gradient_dark",
              className:
                "text-xl md:text-2xl font-black text-center mx-auto max-w-[24ch] stroke-2 fill-black",
            })
          )}
        >
          {useCases.title}
        </h1>
        <p className="max-w-[50ch] text-base md:text-md text-center text-foreground/80 mx-auto">
          {useCases.description}
        </p>
      </div>
      <div className="flex z-10">
        <ScrollArea className="max-w-full" >
          <div className="flex w-max space-x-4 p-4">
            {useCases.details.map((detail, index) => (
              <div
                key={`${detail.title}_${index}`}
                className="aspect-[1/1.05] relative w-[280px] md:w-[530px] overflow-clip rounded-4xl"
              >
                <Image
                  src={detail.thumbnail}
                  alt={detail.title}
                  fill
                  className="w-full h-full absolute object-center object-cover select-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black select-none" />
                <div className="absolute inset-x-6 bottom-6 text-background">
                  <h4
                    className={cn(
                      backgroundTextColorVariants({
                        bgText: "gradient_light",
                        className: "text-xl md:text-2xl font-semibold fill-black",
                      })
                    )}
                  >
                    {detail.title}
                  </h4>
                  <p className="text-sm md:text-lg">{detail.description}</p>
                </div>
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="hidden" />
        </ScrollArea>
      </div>
    </section>
  );
};

export default UseCaseSection;
