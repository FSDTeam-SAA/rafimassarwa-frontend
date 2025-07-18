"use client";

import React from "react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import AddStockSearch from "@/components/Portfolio/add-holding-main";

interface AddToPortfolioDialogProps {
  triggerButtonText?: string;
  onDialogClose?: () => void;
  setIsOpen: (value: boolean) => void;
  isOpen: boolean;
  refetch: () => void;
}

export default function WatchlistModal({
  setIsOpen,
  isOpen,
  refetch,
}: AddToPortfolioDialogProps) {
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  const handleStockAdded = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-[425px] md:max-w-lg lg:max-w-2xl p-4 pb-36">
          <DialogHeader>
            <h2 className="text-lg font-semibold">Add Stock to Watchlist</h2>
          </DialogHeader>
          <AddStockSearch refetch={refetch} onStockAdded={handleStockAdded} />
        </DialogContent>
      </Dialog>
    </>
  );
}
