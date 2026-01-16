import React from "react";
import Image from "next/image";

import { Container } from "@/components/global";

import { AuthRouteBackgroundImage } from "@/assets/images/banners";
import { TracklimoLogoFull } from "@/assets/svgs/logos";

type AuthRouteProps = Readonly<React.PropsWithChildren>;

export default function AuthRouteLayout(props: AuthRouteProps) {
  const { children } = props;

  return (
    <div className="relative min-h-svh">
      <Image
        src={AuthRouteBackgroundImage}
        priority
        alt="Background Image for Auth Page"
        className="absolute inset-0 size-full object-cover"
      />

      <div
        className="absolute inset-0 bg-black opacity-65"
        aria-hidden="true"
      />

      <main className="relative">
        <Container className="grid grid-rows-[auto_1fr]">
          <TracklimoLogoFull className="my-6 ml-0 h-10 w-fit text-white" />
          <div className="my-4">{children}</div>
        </Container>
      </main>
    </div>
  );
}
