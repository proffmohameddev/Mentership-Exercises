"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Toaster, toast } from "sonner";

export default function ToastHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const created = searchParams.get("created");
    const updated = searchParams.get("updated");
    const deleted = searchParams.get("deleted");

    if (created === "1") {
      toast.success("Todo created successfully");
    }

    if (updated === "1") {
      toast.success("Todo updated successfully");
    }

    if (deleted === "1") {
      toast.success("Todo deleted successfully");
    }

    if (created || updated || deleted) {
      router.replace("/");
    }
  }, [searchParams, router]);

  return (
    <Toaster
      position="top-right"
      richColors
      closeButton
      duration={3000}
      theme="system"
    />
  );
}