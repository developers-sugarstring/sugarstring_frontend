"use client";

import * as Dialog from "@radix-ui/react-dialog";

type DownloadModalProps = {
  isOpen: boolean;
  progress: number; // percentage (0–100)
};

export default function DownloadModal({ isOpen, progress }: DownloadModalProps) {
  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Portal>
        {/* Overlay */}
        <Dialog.Overlay className="fixed inset-0 bg-black/40 z-[9998]" />

        {/* Modal content */}
        <Dialog.Content className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <Dialog.Title className="text-lg font-semibold mb-4">
              Preparing your PDF
            </Dialog.Title>
            <p className="text-gray-600 mb-4">
              Your report is being downloaded. Please wait...
            </p>

            {/* Progress bar */}
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-3 bg-blue-600 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className="mt-3 text-sm text-gray-500">{progress}%</p>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
