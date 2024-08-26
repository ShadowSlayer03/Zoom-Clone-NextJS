import Image from "next/image";
import React from "react";

type HomeCardProp = {
  title: string;
  description: string;
  imgSrc: string;
  cardColor: string;
  handleClick?: ()=>void
};

const HomeCard = ({
  title = "",
  description = "",
  imgSrc = "",
  cardColor = "",
  handleClick
}: HomeCardProp) => {
  return (
    <div
      className={`${cardColor} px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer`}
      onClick={handleClick}
    >
      <div className="flex-center glassmorphism size-12 rounded-[10px]">
        <Image src={`/icons/${imgSrc}`} alt="meeting" width={27} height={27} />
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-lg font-normal">{description}</p>
      </div>
    </div>
  );
};

export default HomeCard;
