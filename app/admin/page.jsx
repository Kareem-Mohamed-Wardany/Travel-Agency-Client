"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
const page = () => {
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        router.push("/");
      } else if (user.isAdmin) {
        router.push("/");
      }
    }
  }, [router]);
  return;
};

export default page;
