"use client";

import dynamic from "next/dynamic";

const ProfileBlock = dynamic(() =>
  import("@/public/components/block/ProfileBlock")
);

export default function Page() {
  return (
    <div className="">
      <ProfileBlock />
    </div>
  );
}
