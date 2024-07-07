import { toast } from "@/components/ui/use-toast";

export const showToast = (title: string, description: string) => {
  toast({
    title: title,
    description: description,
    duration: 2000,
    className: "bg-background text-primary",
  });
};

export const formatData = (d: string) => {
  const date = new Date(d);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `Due ${day} ${month} ${year}`;
};

export const nameFixer = (name: string) => {
  const temp = name[0].toUpperCase();
  return temp + name.slice(1);
};