"use client";
import React, { useState, useEffect } from "react";
import SupplierForm from "@/components/ui/SupplierForm";
import { Button } from "@/components/ui/Button";
import { X } from "lucide-react";
import { useToast } from "@/components/ui/ToastProvider";

interface SupplierModalProps {
  modalId?: string;
  onSuccess?: () => void;
}

const SupplierModal: React.FC<SupplierModalProps> = ({
  modalId = "hs-supplier-modal",
  onSuccess,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { showToast } = useToast();

  // Listen for modal open/close events
  useEffect(() => {
    const modal = document.getElementById(modalId);

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    // Add event listeners for modal open/close
    document.addEventListener(`open-${modalId}`, handleOpen);
    document.addEventListener(`close-${modalId}`, handleClose);

    // Also observe class changes on the modal element
    if (modal) {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (
            mutation.type === "attributes" &&
            mutation.attributeName === "class"
          ) {
            const classList = (mutation.target as HTMLElement).classList;
            if (
              classList.contains("hs-overlay-open") ||
              !classList.contains("hidden")
            ) {
              setIsOpen(true);
            } else {
              setIsOpen(false);
            }
          }
        });
      });

      observer.observe(modal, { attributes: true, attributeFilter: ["class"] });

      return () => {
        observer.disconnect();
        document.removeEventListener(`open-${modalId}`, handleOpen);
        document.removeEventListener(`close-${modalId}`, handleClose);
      };
    }

    return () => {
      document.removeEventListener(`open-${modalId}`, handleOpen);
      document.removeEventListener(`close-${modalId}`, handleClose);
    };
  }, [modalId]);

  const handleFormSuccess = () => {
    // Close the modal first
    handleClose();

    // Show success toast
    showToast("success", "تم إرسال معلومات المورد بنجاح! سنتواصل معك قريباً.");

    // Call the optional success callback
    if (onSuccess) {
      onSuccess();
    }
  };

  const handleFormError = () => {
    showToast("error", "حدث خطأ أثناء إرسال النموذج. يرجى المحاولة مرة أخرى.");
  };

  const handleSubmitStateChange = (submitting: boolean) => {
    setIsSubmitting(submitting);
  };

  const handleClose = () => {
    setIsOpen(false);
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add("hidden");
      modal.classList.remove("hs-overlay-open");
      modal.classList.remove("hs-overlay-backdrop-open");
    }

    // Remove any overlay backdrop elements that might be left
    const overlays = document.querySelectorAll(".hs-overlay-backdrop");
    overlays.forEach((overlay) => overlay.remove());

    // Remove modal open class from body
    document.body.classList.remove("hs-overlay-open");
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[79] bg-gray-900/50 backdrop-blur-sm"
          onClick={handleClose}
        />
      )}

      {/* Modal */}
      <div
        id={modalId}
        className={`${
          isOpen ? "block" : "hidden"
        } hs-overlay size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto`}
        role="dialog"
        tabIndex={-1}
        aria-labelledby={`${modalId}-label`}
      >
        <div
          className={`${
            isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
          } transition-all duration-200 sm:max-w-4xl sm:w-full m-3 sm:mx-auto min-h-[calc(100%-3.5rem)] flex items-center`}
        >
          <div className="w-full flex flex-col bg-white border border-gray-200 shadow-xl rounded-xl pointer-events-auto min-h-[90vh]">
            {/* Modal Header */}
            <div className="flex justify-between items-center py-4 px-6 border-b border-gray-200">
              <h3
                id={`${modalId}-label`}
                className="font-bold text-xl text-gray-800"
              >
                انضم كمورد إلى شبكة جرس
              </h3>
              <Button
                type="button"
                variant="ghost"
                size="small"
                className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none"
                aria-label="إغلاق"
                onClick={handleClose}
                data-hs-overlay={`#${modalId}`}
              >
                <span className="sr-only">إغلاق</span>
                <X className="size-4" />
              </Button>
            </div>

            {/* Modal Body - Scrollable */}
            <div className="p-6 overflow-y-auto flex-1 max-h-[76vh]">
              {/* Supplier Form */}
              <SupplierForm
                className="max-w-none"
                onSuccess={handleFormSuccess}
                onError={handleFormError}
                onSubmitStateChange={handleSubmitStateChange}
                showHeader={false}
                showWrapper={false}
              />
            </div>

            {/* Modal Footer with Submit Button */}
            <div className="py-4 px-6 border-t border-gray-200 bg-gray-50 rounded-b-xl">
              <Button
                type="submit"
                form="supplier-form"
                loading={isSubmitting}
                fullWidth
                variant="solid"
                size="large"
                disabled={isSubmitting}
              >
                {isSubmitting ? "جاري الإرسال..." : "إرسال طلب الانضمام"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SupplierModal;
