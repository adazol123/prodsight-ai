"use client";
import { Button } from "@/components/shared/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/shared/dialog";
import { Input } from "@/components/shared/input";
import { Label } from "@/components/shared/label";
import { Textarea } from "@/components/shared/textarea";
import { cn } from "@/lib/utils";
import { getAccessToken } from "@/utils/supabase/client";
import { ChevronDown, ChevronUp, Sparkles } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useProjectModalStore } from "../../store/project-modal-store";

type ProjectFiendFormType = {
  title: string;
  about?: string;
  timeline?: string;
  budget?: string;
  headcount?: string;
  techstack?: string;
};

export default function ProjectModal({
  open,
  onOpenChange,
}: {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const navigate = useRouter();
  const storeOpen = useProjectModalStore((state) => state.open);
  const setStoreOpen = useProjectModalStore((state) => state.setOpen);
  const isControlled = typeof open === "boolean";
  const modalOpen = isControlled ? open : storeOpen;
  const handleOpenChange = isControlled ? onOpenChange : setStoreOpen;
  const searchParams = useSearchParams();
  const pretitle = searchParams.get("title");
  const [isPending, setIsPending] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
    reset,
  } = useForm<ProjectFiendFormType>();

  const [showAdvanced, setShowAdvanced] = useState(false);
  const [agreed, setAgreed] = useState(false);

  React.useEffect(() => {
    setValue("title", pretitle!, {
      shouldValidate: true,
      shouldDirty: true,
    });
  }, [pretitle]);
  const onSubmit: SubmitHandler<ProjectFiendFormType> = async (data, e) => {
    e?.preventDefault();
    // TODO: handle submit
    if (!agreed) return;

    setIsPending(true);
    const toastId = toast.loading("Creating project...");

    try {
      const accessToken = await getAccessToken();
      if (!accessToken) {
        throw new Error("[Auth]: Unauthorized to create new project");
      }

      const response = await fetch("/api/v1/project/v2", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          access_token: accessToken,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok || !response.body) {
        const errorText = await response
          .text()
          .catch(() => "Unknown server error");
        throw new Error(
          `[Fetch]: Error creating new project. Status: ${response.status}. ${errorText}`
        );
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let finalResult: Partial<ProjectFiendFormType> | null = null;

      const processLine = (line: string) => {
        if (!line) return;
        try {
          if (line.startsWith("data:")) {
            line = line.substring(5).trim();
          }
          const update = JSON.parse(line);
          if (update.data?.status) {
            toast.loading(update.data.status, { id: toastId });
          }

          if (update?.data?.result) {
            finalResult = update.data?.result;
          }
        } catch {
          toast.loading(line, { id: toastId });
        }
      };

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          if (buffer.length > 0) processLine(buffer);
          break;
        }

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          processLine(line);
        }
      }

      if (!finalResult) {
        return toast.error(
          "[Error:0002]: Something went wrong. Please try again in a few minutes.",
          { id: toastId }
        );
      }

      toast.success("Project created successfully!", {
        id: toastId,
      });

      reset();
      setStoreOpen(false);
      navigate.replace("/dashboard", { scroll: true });
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error
          ? error.message
          : "[Error]: Something went wrong. Please try again in a few minutes.",
        { id: toastId }
      );
    } finally {
      setIsPending(false);
    }
  };
  return (
    <>
      <Dialog
        open={modalOpen}
        onOpenChange={(e) => {
          navigate.replace("?");
          handleOpenChange?.(e);
          return;
        }}
      >
        <DialogContent className="overflow-hidden pr-5.5">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 pr-2 max-h-[90lvh] overflow-y-auto"
          >
            <DialogHeader>
              <DialogTitle>New Project</DialogTitle>
              <DialogDescription className="text-xs">
                Fill in the details to create your project.
              </DialogDescription>
            </DialogHeader>
            <div>
              <label className="block text-sm font-medium mb-1">
                Title <span className="text-red-500">*</span>
              </label>
              <Input
                {...register("title", { required: true })}
                placeholder="Product name in mind"
              />
              {!!errors.title && (
                <div>
                  <span>{errors.title.message}</span>
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">About</label>
              <Textarea
                {...register("about", { deps: "title" })}
                placeholder="What's your project about? Share a bit about your idea or goals so we can help you get the best results!"
                rows={4}
              />
            </div>
            {/* Advanced/More Options Collapsible */}
            <div
              className={cn(
                "border rounded-2xl bg-neutral-50/50 dark:bg-[#23232b] overflow-clip",
                {
                  "border-indigo-600": showAdvanced,
                }
              )}
            >
              <button
                type="button"
                className="w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium text-primary hover:bg-gray-100 dark:hover:bg-[#222] rounded-t-lg transition group"
                onClick={() => setShowAdvanced((v) => !v)}
                aria-expanded={showAdvanced}
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  {showAdvanced
                    ? "Hide advanced options"
                    : "Want to add more details? (Optional)"}
                </span>
                {showAdvanced ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>
              {showAdvanced && (
                <div className="p-4 space-y-3 border-t">
                  <LabelInputContainer>
                    <Label
                      htmlFor="timeline"
                      className="block text-xs text-neutral-500 font-light mb-1"
                    >
                      Timeline
                    </Label>
                    <Input
                      {...register("timeline")}
                      id="timeline"
                      placeholder="e.g. 1 week, 3 weeks, 1 month"
                    />
                  </LabelInputContainer>
                  <LabelInputContainer>
                    <Label
                      htmlFor="budget"
                      className="block text-xs text-neutral-500 font-light mb-1"
                    >
                      Budget
                    </Label>
                    <Input
                      {...register("budget")}
                      id="budget"
                      placeholder="e.g. $50 per month, PHP5,000.00 per month"
                    />
                  </LabelInputContainer>
                  <LabelInputContainer>
                    <Label
                      htmlFor="headcount"
                      className="block text-xs text-neutral-500 font-light mb-1"
                    >
                      Headcount
                    </Label>
                    <Input
                      {...register("headcount")}
                      id="headcount"
                      placeholder="How many people working on this project?"
                    />
                  </LabelInputContainer>
                  <LabelInputContainer>
                    <Label
                      htmlFor="techstack"
                      className="block text-xs text-neutral-500 font-light mb-1"
                    >
                      Tech Stack
                    </Label>
                    <Input
                      {...register("techstack")}
                      id="techstack"
                      placeholder="e.g. React, Node.js, Python, or any tools you love!"
                    />
                  </LabelInputContainer>
                </div>
              )}
            </div>
            {/* Agreement Disclaimer */}
            <LabelInputContainer className="flex-row items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="agreement"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1 accent-indigo-600 w-4 h-4 rounded border-gray-300 dark:border-gray-600"
                required
              />
              <Label
                htmlFor="agreement"
                className="text-xs text-gray-600 dark:text-gray-300 select-none"
              >
                By submitting, you agree to our{" "}
                <a
                  href="/terms"
                  aria-disabled
                  className="underline hover:text-primary pointer-events-none"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="/privacy"
                  aria-disabled
                  className="underline hover:text-primary pointer-events-none"
                >
                  Privacy Policy
                </a>
                .
              </Label>
            </LabelInputContainer>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isPending || !agreed || !isValid}>
                {isPending ? "Building..." : "Let's Start Building!"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
