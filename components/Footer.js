import styled from "styled-components";
import Image from "next/image";

const Section = styled.div.attrs(() => ({
  className: `flex bg-second w-full h-28 items-center mt-8`
}))``;

const TextFooter = styled.div.attrs(() => ({
  className: `text-xs text-gray-500`
}))``;

export default function Footer() {
  return (
    <Section>
      <div className="flex flex-row justify-between items-center container mx-auto">
        <TextFooter>
          &copy; 2021 MoovieTime. All rights reserved.
        </TextFooter>
        <Image
          src="/MoovieTime-Logo-Grey@2x.png"
          alt="Moovie Time"
          width={88.1}
          height={24.36}
        />
        <TextFooter>
          Made With NextJS and TailwindCSS
        </TextFooter>
      </div>
    </Section>
  )
}
