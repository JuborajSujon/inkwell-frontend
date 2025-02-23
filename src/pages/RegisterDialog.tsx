import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRegister } from "@/hooks/use-register";

export const RegisterDialog = () => {
  const { isOpen, onClose } = useRegister();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="dark:bg-gray-800">
        <DialogHeader>
          <h2 className="text-lg font-semibold">Register</h2>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Name</Label>
            <Input
              id="name"
              type="text"
              onChange={() => {}}
              required
              className="dark:bg-slate-200"
              placeholder="Enter your full name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              onChange={() => {}}
              required
              className="dark:bg-slate-200"
              placeholder="Enter your email address"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              onChange={() => {}}
              required
              className="dark:bg-slate-200"
              placeholder="Enter your password"
            />
          </div>
          <Button type="submit" className="w-full">
            Register
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterDialog;
