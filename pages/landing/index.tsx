import { Section1 } from './sections/section1';
import { Section2 } from './sections/section2';
import { Section3 } from './sections/section3';
import { Section4 } from './sections/section4';
import { Section5 } from './sections/section5';
import { Section6 } from './sections/section6';
import { Section7 } from './sections/section7';

import { useRef } from "react";
import { WhatsappButton } from './whatsapp-button';

export const LandingPage = () => {
  const section6Ref = useRef<HTMLDivElement>(null);
  return (
    <>
      <Section1 section6Ref={section6Ref}></Section1>
      <Section2></Section2>
      <Section3></Section3>
      <Section4></Section4>
      <Section5></Section5>
      <Section6></Section6>
      <Section7 ref={section6Ref}></Section7>
      <WhatsappButton />
    </>
  )
}