import { useState, type ReactNode } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from './buttons';

type ModalProps = {
  trigger: JSX.Element;
  title: ReactNode;
  description: ReactNode;
  content: ReactNode;
};
export default function Modal({
  trigger,
  title,
  description,
  content,
}: ModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button onClick={() => setIsOpen(true)}>{trigger}</Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="text-center text-gray-500 text-md">
            {description}
          </DialogDescription>
        </DialogHeader>
        <div onClick={handleClose}>{content}</div>
      </DialogContent>
    </Dialog>
  );
}
