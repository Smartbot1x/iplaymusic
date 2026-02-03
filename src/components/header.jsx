export default function Header({
  title = "iPlayMusic",
  textGradient = "linear-gradient(180deg, #EE0979 0%, #FF6A00 100%)",
  backgroundColor = "transparent",
  className = "",
}) {
  return (
    <header
      className={` p-4 w-[174.672px] h-[29.232px]   ${className}`}
      style={{
        background: backgroundColor,
      }}
    >
      <div
        className="text-2xl font-bold"
        style={{
          background: textGradient,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {title}
      </div>
    </header>
  );
}
