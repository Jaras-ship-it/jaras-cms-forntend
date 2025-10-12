"use client";
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { getAllCategories, CategoryResponseItem } from "@/data/loader";
import MultiSelect from "@/components/ui/MultiSelect";

interface CategoriesResponse {
  data?: CategoryResponseItem[];
}

interface SupplierFormData {
  name: string;
  email: string;
  phone: string;
  website: string;
  address: string;
  description: string;
  categories: string[]; // Changed from category to categories array
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
  const [formData, setFormData] = useState<SupplierFormData>({
    name: "",
    email: "",
    phone: "",
    website: "",
    address: "",
    description: "",
    categories: [], // Changed from category to categories array
    contactPerson: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [availableCategories, setAvailableCategories] = useState<
    CategoryResponseItem[]
  >([]);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = (await getAllCategories()) as CategoriesResponse;
        // The response structure from Strapi typically has a data property
        if (response && Array.isArray(response.data)) {
          setAvailableCategories(response.data);
        } else if (response && Array.isArray(response)) {
          // In case the response is directly an array
          setAvailableCategories(response as CategoryResponseItem[]);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

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
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate categories
    if (formData.categories.length === 0) {
      setSubmitStatus({
        type: "error",
        message: "يرجى اختيار فئة واحدة على الأقل من فئات الخدمة.",
      });
      if (onError) {
        onError(new Error("No categories selected"));
      }
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    // Notify parent about submit state change
    if (onSubmitStateChange) {
      onSubmitStateChange(true);
    }

    try {
      // Send to n8n webhook
      if (webhookUrl) {
        const response = await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            timestamp: new Date().toISOString(),
            source: "supplier-form",
          }),
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
        categories: [],
        contactPerson: "",
      });
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
            className={inputClasses}
            placeholder="+966 XX XXX XXXX"
            required
          />
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
            className={inputClasses}
            placeholder="https://www.company.com"
          />
        </div>

        {/* Categories */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            فئات الخدمة <span className="text-red-500">*</span>
          </label>
          <MultiSelect
            options={availableCategories.map((category) => ({
              value: category.slug || category.id.toString(),
              label: category.name,
            }))}
            value={formData.categories}
            onChange={(selectedCategories) =>
              setFormData((prev) => ({
                ...prev,
                categories: selectedCategories,
              }))
            }
            placeholder="اختر فئات الخدمة..."
            required={true}
            className="w-full"
          />
          {formData.categories.length === 0 && (
            <p className="text-sm text-red-500 mt-1">
              يرجى اختيار فئة واحدة على الأقل
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
