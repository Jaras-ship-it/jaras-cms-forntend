import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Button variants using class-variance-authority for type-safe variants
const buttonVariants = cva(
  // Base classes that apply to all buttons
  "inline-flex items-center justify-center gap-x-2 font-medium rounded-lg transition-all duration-200 focus:outline-hidden disabled:opacity-50 disabled:pointer-events-none focus:ring-2 focus:ring-offset-2",
  {
    variants: {
      variant: {
        solid:
          "border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:bg-blue-700 focus:ring-blue-500",
        outline:
          "border border-gray-200 text-gray-500 bg-transparent hover:border-blue-600 hover:text-blue-600 focus:border-blue-600 focus:text-blue-600 focus:ring-blue-500",
        ghost:
          "border border-transparent text-blue-600 bg-transparent hover:bg-blue-100 hover:text-blue-800 focus:bg-blue-100 focus:text-blue-800 focus:ring-blue-500",
        soft: "border border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200 focus:bg-blue-200 focus:ring-blue-500",
        white:
          "border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:bg-gray-50 focus:ring-gray-500",
        link: "border border-transparent text-blue-600 bg-transparent hover:text-blue-800 focus:text-blue-800 focus:ring-blue-500 shadow-none",
        // Additional variants for different use cases
        destructive:
          "border border-transparent bg-red-600 text-white hover:bg-red-700 focus:bg-red-700 focus:ring-red-500",
        secondary:
          "border border-transparent bg-gray-600 text-white hover:bg-gray-700 focus:bg-gray-700 focus:ring-gray-500",
      },
      size: {
        small: "py-2 px-3 text-xs",
        medium: "py-3 px-4 text-sm",
        large: "py-4 px-6 text-base",
      },
      fullWidth: {
        true: "w-full",
        false: "w-auto",
      },
    },
    defaultVariants: {
      variant: "solid",
      size: "medium",
      fullWidth: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * The content of the button
   */
  children: React.ReactNode;
  /**
   * Optional icon to display before the text
   */
  icon?: React.ReactNode;
  /**
   * Optional icon to display after the text
   */
  iconEnd?: React.ReactNode;
  /**
   * Whether the button should take full width of container
   */
  fullWidth?: boolean;
  /**
   * Loading state - shows loading spinner and disables button
   */
  loading?: boolean;
  /**
   * Screen reader label for accessibility
   */
  "aria-label"?: string;
  /**
   * Custom className to extend styling
   */
  className?: string;
  /**
   * Whether the button should render as a link (uses Next.js Link internally)
   */
  asLink?: boolean;
  /**
   * URL for link buttons
   */
  href?: string;
  /**
   * Whether link should open in new tab
   */
  target?: "_blank" | "_self";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      children,
      icon,
      iconEnd,
      loading = false,
      disabled,
      "aria-label": ariaLabel,
      asLink = false,
      href,
      target,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    const buttonContent = (
      <>
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!loading && icon && <span className="flex-shrink-0">{icon}</span>}
        <span className={loading ? "opacity-50" : ""}>{children}</span>
        {!loading && iconEnd && (
          <span className="flex-shrink-0">{iconEnd}</span>
        )}
      </>
    );

    const buttonClasses = cn(
      buttonVariants({ variant, size, fullWidth }),
      className
    );

    if (asLink && href) {
      return (
        <a
          href={href}
          target={target}
          className={buttonClasses}
          aria-label={
            ariaLabel || (typeof children === "string" ? children : undefined)
          }
          {...(target === "_blank" && { rel: "noopener noreferrer" })}
        >
          {buttonContent}
        </a>
      );
    }

    return (
      <button
        className={buttonClasses}
        ref={ref}
        disabled={isDisabled}
        aria-label={
          ariaLabel || (typeof children === "string" ? children : undefined)
        }
        aria-disabled={isDisabled}
        {...props}
      >
        {buttonContent}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
