// src/components/BuyButton.tsx
"use client";

import { Button } from "@/components/ui/button";

export function BuyButton() {
  return (
    <Button
      variant="emerald"
      size="full"
      className="text-2xl"
      onClick={() => window.location.href = "https://buy.stripe.com/your-link-here"}
    >
      Download Instantly – Lifetime Access
    </Button>
  );
}