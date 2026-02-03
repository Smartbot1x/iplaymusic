"use client";

export default function GradientIcon({ Icon, active }) {
  return (
    <>
      {active ? (
        <div className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 bg-gradient">
          <Icon className="w-7 h-7 transition-all duration-300 " />
        </div>
      ) : (
        <Icon className="w-6 h-6 transition-all duration-300" />
      )}
    </>
  );
}
