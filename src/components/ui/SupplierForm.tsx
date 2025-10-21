"use client";
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { getCategoriesWithProducts } from "@/data/loader";
import { Category } from "@/types/product";
import { useToast } from "./ToastProvider";
import MultiSelect from "@/components/ui/MultiSelect";

interface SupplierFormData {
  name: string;
  email: string;
  phone: string;
  website: string;
  address: string;
  description: string;
  selectedCategory: string; // Single category selection
  products: string[]; // Array of product documentIds
  contactPerson: string;
}

interface SupplierFormProps {
  onSubmit?: (data: SupplierFormData) => void;
  onSubmitStateChange?: (isSubmitting: boolean) => void;
  onSuccess?: (data: SupplierFormData) => void;
  onError?: (error: Error) => void;
  className?: string;
  webhookUrl?: string;
  showHeader?: boolean;
  showWrapper?: boolean;
}

const SupplierForm: React.FC<SupplierFormProps> = ({
  onSubmit,
  onSubmitStateChange,
  onSuccess,
  onError,
  className,
  webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || "",
  showHeader = true,
  showWrapper = true,
}) => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState<SupplierFormData>({
    name: "",
    email: "",
    phone: "",
    website: "",
    address: "",
    description: "",
    selectedCategory: "", // Single category selection
    products: [], // Array of product documentIds
    contactPerson: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [availableCategories, setAvailableCategories] = useState<Category[]>(
    []
  );
  const [availableProducts, setAvailableProducts] = useState<
    Array<{ id: number; documentId: string; name: string }>
  >([]);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const [validationErrors, setValidationErrors] = useState<{
    phone?: string;
    website?: string;
  }>({});

  // Fetch categories on component mount
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await getCategoriesWithProducts();
        // Handle both possible response formats
        const categories =
          (response as { data?: Category[] })?.data || response || [];
        setAvailableCategories(categories as Category[]);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    }
    fetchCategories();
  }, []);

  // Validation functions
  const validatePhoneNumber = (phone: string): string | null => {
    if (!phone.trim()) {
      return "رقم الهاتف مطلوب";
    }

    // Remove all spaces and special characters except + for validation
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, "");

    // Saudi phone number patterns
    const saudiPhoneRegex = /^(\+966|966|0)?[5][0-9]{8}$/;

    if (!saudiPhoneRegex.test(cleanPhone)) {
      return "يرجى إدخال رقم هاتف صحيح (مثال: +966 50 123 4567)";
    }

    return null;
  };

  const validateWebsiteUrl = (url: string): string | null => {
    if (!url.trim()) {
      return null; // Website is optional
    }

    try {
      new URL(url);
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        return "يرجى إدخال رابط صحيح يبدأ بـ http:// أو https://";
      }
      return null;
    } catch {
      return "يرجى إدخال رابط صحيح يبدأ بـ http:// أو https://";
    }
  };

  // Clean phone number for submission (remove spaces and formatting)
  const cleanPhoneNumber = (phone: string): string => {
    let cleaned = phone.replace(/[\s\-\(\)]/g, "");

    // Normalize to international format
    if (cleaned.startsWith("0")) {
      cleaned = "+966" + cleaned.substring(1);
    } else if (cleaned.startsWith("966") && !cleaned.startsWith("+966")) {
      cleaned = "+" + cleaned;
    } else if (!cleaned.startsWith("+966")) {
      cleaned = "+966" + cleaned;
    }

    return cleaned;
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Real-time validation
    if (name === "phone") {
      const phoneError = validatePhoneNumber(value);
      setValidationErrors((prev) => ({
        ...prev,
        phone: phoneError || undefined,
      }));
    } else if (name === "website") {
      const websiteError = validateWebsiteUrl(value);
      setValidationErrors((prev) => ({
        ...prev,
        website: websiteError || undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields before submission
    const phoneError = validatePhoneNumber(formData.phone);
    const websiteError = validateWebsiteUrl(formData.website);

    // Update validation errors
    setValidationErrors({
      phone: phoneError || undefined,
      website: websiteError || undefined,
    });

    // Check for validation errors
    if (phoneError || websiteError) {
      setSubmitStatus({
        type: "error",
        message: "يرجى تصحيح الأخطاء في النموذج قبل الإرسال.",
      });
      if (onError) {
        onError(new Error("Validation errors"));
      }
      return;
    }

    // Validate categories
    if (formData.products.length === 0) {
      showToast("error", "Please select at least one product");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    // Notify parent about submit state change
    if (onSubmitStateChange) {
      onSubmitStateChange(true);
    }

    try {
      // Prepare data with cleaned phone number
      const submissionData = {
        ...formData,
        phone: cleanPhoneNumber(formData.phone),
        timestamp: new Date().toISOString(),
        source: "supplier-form",
      };

      // Send to n8n webhook
      if (webhookUrl) {
        const response = await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(submissionData),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      }

      // Call custom onSubmit if provided
      if (onSubmit) {
        onSubmit(formData);
      }

      // Call success callback
      if (onSuccess) {
        onSuccess(formData);
      }

      setSubmitStatus({
        type: "success",
        message: "تم إرسال معلومات المورد بنجاح! سنتواصل معك قريباً.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        website: "",
        address: "",
        description: "",
        selectedCategory: "",
        products: [],
        contactPerson: "",
      }); // Clear validation errors
      setValidationErrors({});
    } catch (error) {
      console.error("Error submitting supplier form:", error);
      setSubmitStatus({
        type: "error",
        message: "حدث خطأ أثناء إرسال النموذج. يرجى المحاولة مرة أخرى.",
      });

      if (onError) {
        onError(
          error instanceof Error ? error : new Error("Unknown error occurred")
        );
      }
    } finally {
      setIsSubmitting(false);
      if (onSubmitStateChange) {
        onSubmitStateChange(false);
      }
    }
  };

  const inputClasses =
    "py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-slate-200";

  const formContent = (
    <>
      {showHeader && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">انضم كمورد</h2>
          <p className="text-gray-600">
            املأ النموذج أدناه لإضافة شركتك كمورد في دليل جرس للفنادق
          </p>
        </div>
      )}

      {submitStatus.type && (
        <div
          className={cn(
            "mb-6 p-4 rounded-lg",
            submitStatus.type === "success"
              ? "bg-green-50 border border-green-200 text-green-800"
              : "bg-red-50 border border-red-200 text-red-800"
          )}
        >
          {submitStatus.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4" id="supplier-form">
        {/* Company Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            اسم الشركة <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={inputClasses}
            placeholder="اسم شركتك"
            disabled={isSubmitting}
            required
          />
        </div>

        {/* Contact Person */}
        <div>
          <label
            htmlFor="contactPerson"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            اسم الشخص المسؤول <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="contactPerson"
            name="contactPerson"
            value={formData.contactPerson}
            onChange={handleInputChange}
            className={inputClasses}
            placeholder="اسم الشخص المسؤول عن التواصل"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            البريد الإلكتروني <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={inputClasses}
            placeholder="example@company.com"
            disabled={isSubmitting}
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            رقم الهاتف <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className={cn(
              inputClasses,
              validationErrors.phone
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : formData.phone && !validationErrors.phone
                ? "border-green-500 focus:border-green-500 focus:ring-green-500"
                : ""
            )}
            placeholder="+966 XX XXX XXXX"
            disabled={isSubmitting}
            required
          />
          {validationErrors.phone && (
            <p className="text-sm text-red-500 mt-1">
              {validationErrors.phone}
            </p>
          )}
        </div>

        {/* Website */}
        <div>
          <label
            htmlFor="website"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            الموقع الإلكتروني
          </label>
          <input
            type="url"
            id="website"
            name="website"
            value={formData.website}
            onChange={handleInputChange}
            className={cn(
              inputClasses,
              validationErrors.website
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : formData.website && !validationErrors.website
                ? "border-green-500 focus:border-green-500 focus:ring-green-500"
                : ""
            )}
            placeholder="https://www.company.com"
            disabled={isSubmitting}
          />
          {validationErrors.website && (
            <p className="text-sm text-red-500 mt-1">
              {validationErrors.website}
            </p>
          )}
        </div>

        {/* Categories */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            فئة الخدمة <span className="text-red-500">*</span>
          </label>
          <select
            id="category"
            value={formData.selectedCategory}
            onChange={(e) => {
              const selectedCategoryId = e.target.value;
              setFormData((prev) => ({
                ...prev,
                selectedCategory: selectedCategoryId,
                products: [], // Reset products when category changes
              }));

              // Filter products based on selected category
              if (selectedCategoryId) {
                const selectedCategory = availableCategories.find(
                  (cat) => cat.documentId === selectedCategoryId
                );
                if (selectedCategory?.products) {
                  setAvailableProducts(
                    selectedCategory.products.map((product) => ({
                      id: product.id,
                      documentId: String(product.documentId || product.id), // Ensure documentId is always a string
                      name: product.name,
                    }))
                  );
                }
              } else {
                setAvailableProducts([]);
              }
            }}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="">اختر فئة الخدمة</option>
            {availableCategories.map((category) => (
              <option key={category.documentId} value={category.documentId}>
                {category.name}
              </option>
            ))}
          </select>
          {!formData.selectedCategory && (
            <p className="text-sm text-red-500 mt-1">يرجى اختيار فئة</p>
          )}

          {formData.selectedCategory && (
            <>
              <label className="block text-sm font-medium text-gray-700 mb-2 mt-4">
                المنتجات <span className="text-red-500">*</span>
              </label>
              <MultiSelect
                options={availableProducts.map((product) => ({
                  value: product.documentId,
                  label: product.name,
                }))}
                value={formData.products}
                onChange={(selectedProducts) =>
                  setFormData((prev) => ({
                    ...prev,
                    products: selectedProducts,
                  }))
                }
                placeholder="اختر المنتجات..."
                required={true}
                className="w-full"
              />
            </>
          )}
          {formData.products.length === 0 && formData.selectedCategory && (
            <p className="text-sm text-red-500 mt-1">
              يرجى اختيار منتج واحد على الأقل
            </p>
          )}
        </div>

        {/* Address */}
        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            العنوان <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className={inputClasses}
            placeholder="المدينة، المنطقة، المملكة العربية السعودية"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            وصف الخدمات <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            className={inputClasses}
            placeholder="اكتب وصفاً مفصلاً عن الخدمات والمنتجات التي تقدمها شركتك للفنادق..."
            required
          />
        </div>
      </form>
    </>
  );

  if (!showWrapper) {
    return <div className={cn(className)}>{formContent}</div>;
  }

  return (
    <div className={cn("max-w-2xl mx-auto", className)}>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        {formContent}
      </div>
    </div>
  );
};

export default SupplierForm;
