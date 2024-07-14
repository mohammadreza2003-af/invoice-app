import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col items-center px-8 justify-center min-h-screen bg-background">
      <Image
        src="/assets/Mail-bro.svg"
        width={400}
        height={400}
        alt="mail-bro"
      />
      <h2 className="text-center dark:text-white sm:text-xl">
        We sent a verifiction link to your email address, please verify your
        email.
      </h2>
    </div>
  );
};

export default page;
