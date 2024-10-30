import { CustomDialogTrigger } from '@/components/buttons';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { type Dispatch, type SetStateAction } from 'react';

type DeleteProductProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  id: string;
  deleteProductById: (id: string) => void;
};

export default function DeleteProduct({
  open,
  setOpen,
  id,
  deleteProductById,
}: DeleteProductProps) {
  const handleDelete = async () => {
    deleteProductById(id);
  };

  return (
    <div className="mb-1">
      <Dialog open={open} onOpenChange={setOpen} modal={open}>
        <DialogContent className="max-w-2xl overflow-auto">
          <DialogHeader>
            <DialogTitle className="text-center mt-5">
              Are you sure you want to delete this product ?
            </DialogTitle>
            <DialogDescription className="text-center text-gray-500">
              This action is irreversible !
            </DialogDescription>
          </DialogHeader>
          <div>
            <div className="flex mx-10 mt-5 space-x-5">
              <CustomDialogTrigger onClick={handleDelete}>
                Yes
              </CustomDialogTrigger>
              <CustomDialogTrigger>No</CustomDialogTrigger>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
