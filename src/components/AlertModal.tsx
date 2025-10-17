import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertTriangle } from "lucide-react";

interface AlertModalProps {
  open: boolean;
  onClose: () => void;
  message: string;
}

export const AlertModal = ({ open, onClose, message }: AlertModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-card">
        <DialogHeader>
          <div className="flex justify-center mb-2">
            <div className="bg-destructive/10 p-3 rounded-full">
              <AlertTriangle className="w-8 h-8 text-destructive" />
            </div>
          </div>
          <DialogTitle className="text-center">Hey Foodie</DialogTitle>
          <DialogDescription className="text-base pt-2 text-center">
            {message}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            onClick={onClose}
            variant="gamified"
            className="w-full sm:w-auto"
          >
            OK
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
