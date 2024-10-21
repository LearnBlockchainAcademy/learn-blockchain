import "./style.css";

export default function HeadTag({ className }: { className: string }) {
  return (
    <div className={"wrapper" + " " + className}>
      <svg>
        <text x="50%" y="50%" dy=".35em" textAnchor="middle">
          Blockchain Learning
        </text>
      </svg>
    </div>
  );
}
