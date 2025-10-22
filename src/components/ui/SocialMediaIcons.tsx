import React from "react";

interface IconProps {
  className?: string;
  width?: number;
  height?: number;
}

export const TwitterIcon = ({
  className = "w-5 h-5",
  width = 14,
  height = 14,
}: IconProps) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <g clipPath="url(#clip0_922_6920)">
      <mask
        id="mask0_922_6920"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="14"
        height="14"
      >
        <path d="M0 0H14V14H0V0Z" fill="white" />
      </mask>
      <g mask="url(#mask0_922_6920)">
        <path
          d="M11.025 0.65625H13.172L8.482 6.03025L14 13.3442H9.68L6.294 8.90925L2.424 13.3442H0.275L5.291 7.59425L0 0.65725H4.43L7.486 4.71025L11.025 0.65625ZM10.27 12.0562H11.46L3.78 1.87725H2.504L10.27 12.0562Z"
          fill="currentColor"
        />
      </g>
    </g>
    <defs>
      <clipPath id="clip0_922_6920">
        <rect width="14" height="14" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export const XIcon = TwitterIcon; // Alias for X/Twitter

export const FacebookIcon = ({
  className = "w-5 h-5",
  width = 24,
  height = 24,
}: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

export const InstagramIcon = ({
  className = "w-5 h-5",
  width = 24,
  height = 24,
}: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export const LinkedinIcon = ({
  className = "w-5 h-5",
  width = 24,
  height = 24,
}: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const YoutubeIcon = ({
  className = "w-5 h-5",
  width = 24,
  height = 24,
}: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <path d="m10 15 5-3-5-3z" />
  </svg>
);

export const WhatsAppIcon = ({
  className = "w-5 h-5",
  width = 24,
  height = 24,
}: IconProps) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M19.0498 4.91005C18.1329 3.98416 17.0408 3.25002 15.8373 2.75042C14.6338 2.25081 13.3429 1.99574 12.0398 2.00005C6.5798 2.00005 2.1298 6.45005 2.1298 11.9101C2.1298 13.6601 2.5898 15.3601 3.4498 16.8601L2.0498 22.0001L7.2998 20.6201C8.7498 21.4101 10.3798 21.8301 12.0398 21.8301C17.4998 21.8301 21.9498 17.3801 21.9498 11.9201C21.9498 9.27005 20.9198 6.78005 19.0498 4.91005ZM12.0398 20.1501C10.5598 20.1501 9.1098 19.7501 7.8398 19.0001L7.5398 18.8201L4.4198 19.6401L5.2498 16.6001L5.0498 16.2901C4.22735 14.9771 3.79073 13.4593 3.7898 11.9101C3.7898 7.37005 7.4898 3.67005 12.0298 3.67005C14.2298 3.67005 16.2998 4.53005 17.8498 6.09005C18.6174 6.85392 19.2257 7.7626 19.6394 8.76338C20.0531 9.76417 20.264 10.8371 20.2598 11.9201C20.2798 16.4601 16.5798 20.1501 12.0398 20.1501ZM16.5598 13.9901C16.3098 13.8701 15.0898 13.2701 14.8698 13.1801C14.6398 13.1001 14.4798 13.0601 14.3098 13.3001C14.1398 13.5501 13.6698 14.1101 13.5298 14.2701C13.3898 14.4401 13.2398 14.4601 12.9898 14.3301C12.7398 14.2101 11.9398 13.9401 10.9998 13.1001C10.2598 12.4401 9.7698 11.6301 9.6198 11.3801C9.4798 11.1301 9.5998 11.0001 9.7298 10.8701C9.8398 10.7601 9.9798 10.5801 10.0998 10.4401C10.2198 10.3001 10.2698 10.1901 10.3498 10.0301C10.4298 9.86005 10.3898 9.72005 10.3298 9.60005C10.2698 9.48005 9.7698 8.26005 9.5698 7.76005C9.3698 7.28005 9.1598 7.34005 9.0098 7.33005H8.5298C8.3598 7.33005 8.0998 7.39005 7.8698 7.64005C7.6498 7.89005 7.0098 8.49005 7.0098 9.71005C7.0098 10.9301 7.8998 12.1101 8.0198 12.2701C8.1398 12.4401 9.7698 14.9401 12.2498 16.0101C12.8398 16.2701 13.2998 16.4201 13.6598 16.5301C14.2498 16.7201 14.7898 16.6901 15.2198 16.6301C15.6998 16.5601 16.6898 16.0301 16.8898 15.4501C17.0998 14.8701 17.0998 14.3801 17.0298 14.2701C16.9598 14.1601 16.8098 14.1101 16.5598 13.9901Z"
      fill="currentColor"
    />
  </svg>
);

// Helper function to get the appropriate social media icon
export const getSocialMediaIcon = (
  title: string | null | undefined,
  className: string = "w-5 h-5"
) => {
  if (!title || typeof title !== "string" || title.trim() === "") {
    return <FacebookIcon className={className} />;
  }

  const iconName = title.toLowerCase().trim();

  switch (iconName) {
    // English names
    case "facebook":
    case "فيسبوك":
    case "فيس بوك":
      return <FacebookIcon className={className} />;

    case "instagram":
    case "انستغرام":
    case "انستقرام":
    case "إنستغرام":
      return <InstagramIcon className={className} />;

    case "twitter":
    case "x":
    case "تويتر":
      return <TwitterIcon className={className} />;

    case "linkedin":
    case "لينكد ان":
    case "لينكدان":
    case "لينكد إن":
      return <LinkedinIcon className={className} />;

    case "youtube":
    case "يوتيوب":
    case "يوتوب":
      return <YoutubeIcon className={className} />;

    case "whatsapp":
    case "واتساب":
    case "واتس اب":
    case "واتس آب":
      return <WhatsAppIcon className={className} />;

    default:
      return <FacebookIcon className={className} />;
  }
};
