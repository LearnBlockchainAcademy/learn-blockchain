"use client";

type Props = React.ComponentProps<"svg"> & {
  size?: number;
  color?: string;
};

/**
 * Blockchain logo.
 */
export const Logo: React.FC<Props> = ({ size = 32, ...props }) => {
  return (
    <svg width={size} style={{ marginTop: "2px" }} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <path
          id="secondary"
          d="M18.76,11.35a1,1,0,0,0-1.17-.26L12,13.6,6.41,11.09a1,1,0,0,0-1.17.26,1,1,0,0,0-.07,1.2l6,9a1,1,0,0,0,1.66,0l6-9A1,1,0,0,0,18.76,11.35Z"
          style={{ fill: "#2ca9bc" }}
        ></path>
        <path
          id="primary"
          d="M18.83,11.45l-6-9a1,1,0,0,0-1.66,0l-6,9a1,1,0,0,0-.13.83,1,1,0,0,0,.55.63l6,2.7a1,1,0,0,0,.82,0l6-2.7a1,1,0,0,0,.55-.63A1,1,0,0,0,18.83,11.45Z"
          style={{ fill: "#000000" }}
        ></path>
      </g>
      <defs>
        <clipPath id="clip0_1692_63849">
          <rect width="24" height="24" rx="12" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
