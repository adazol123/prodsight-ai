// import { info } from '@/_temp/info'
import { Button } from "@/components/shared/button";
import { cn } from "@/lib/utils";
import { layoutVariants } from "@/styles/variants/layout.variant";
// import { cn } from '@/lib/utils'
import { Sparkles } from "lucide-react";

const CtaSection = () => (
  <section className="w-full bg-transparent py-40">
    <div
      className={cn(
        layoutVariants({
          className:
            "flex flex-col md:flex-row items-center justify-between gap-8 px-4",
        })
      )}
    >
      {/* Left: Heading */}
      <div className="flex-1 min-w-[320px]">
        <h2 className="text-3xl md:text-5xl max-w-[21ch] text-center font-extrabold text-[#222] leading-tight md:text-left">
          Ready to go from idea to launch without the stress?
        </h2>
      </div>
      {/* Right: Button and caption */}
      <div className="flex flex-col items-center md:items-end gap-3 min-w-[260px]">
        <Button className="bg-[#222] text-white rounded-full px-10 py-4 text-lg font-medium flex items-center gap-2 shadow-none hover:bg-[#333]">
          <Sparkles className="w-5 h-5" />
          Try ProdSight AI
        </Button>
        <span className="text-sm text-[#444] text-center md:text-right max-w-[260px]">
          Make your next big idea happen
          <br />
          in under 5 minutes. Yes really
        </span>
      </div>
    </div>
  </section>
);

export default CtaSection;
