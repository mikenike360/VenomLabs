"use client";

import dynamic from "next/dynamic";

const Grove = dynamic(() => import("./Grove"), { ssr: false });

export default function GroveLoader() {
  return <Grove />;
}
