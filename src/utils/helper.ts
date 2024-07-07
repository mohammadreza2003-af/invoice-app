import { toast } from "@/components/ui/use-toast";

export const showToast = (title: string, description: string) => {
  toast({
    title: title,
    description: description,
    duration: 2000,
    className: "bg-background text-primary",
  });
};
