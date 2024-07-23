export function CheckFeature({ label }: { label: string }): JSX.Element{
  return (
    <div className="flex">
      <div className="pr-4">
        <CheckMark />
      </div>
      {label}
    </div>
  );
};

function CheckMark():JSX.Element {
  return (
    <svg
    className="size-5"
    fill="none"
    stroke="green"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
