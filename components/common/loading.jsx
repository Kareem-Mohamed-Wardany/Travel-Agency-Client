"use client";
import { Loader2 } from "lucide-react";

const Loading = ({ text = "Loading...", size = 24 }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Loader2 className="animate-spin text-gray-900" size={size} />
      <p className="mt-3 text-lg font-medium text-gray-900">{text}</p>
    </div>
  );
};

export default Loading;
