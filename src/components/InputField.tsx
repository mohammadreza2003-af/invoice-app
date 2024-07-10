import { Input } from "./ui/input";
import { Label } from "./ui/label";

const InputField = ({
  errors,
  register,
  registerName,
  label,
  type,
}: {
  registerName: string;
  register: any;
  errors: any;
  label: string;
  type: string;
}) => {
  return (
    <div className="relative w-full">
      <Label
        htmlFor={registerName}
        className="block text-sm font-medium mb-2 text-primary"
      >
        {label}
      </Label>
      <Input
        type={type}
        {...register(registerName)}
        className="block w-full px-3 py-2 mt-1 bg-background dark:bg-foreground"
      />
      {errors[registerName] && (
        <p className="text-red-500 mt-2 absolute -bottom-8 text-center">
          {errors[registerName]?.message}
        </p>
      )}
    </div>
  );
};

export default InputField;
