import Image from "next/image";
import { Button } from "./ui/button";
import data from "@/constant/data.json";
const Invoice = () => {
  const formatData = (d: string) => {
    const date = new Date(d);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `Due ${day} ${month} ${year}`;
  };

  const colorFixer = (status: string) => {
    if (status === "paid") {
      return { bg: "bg-greenLow", color: "text-greenLight" };
    }
  };
  const nameFixer = (name: string) => {
    const temp = name[0].toUpperCase();
    return temp + name.slice(1);
  };
  console.log(nameFixer("ali"));
  return (
    <div className="md:min-w-[45rem] sm:min-w-[35rem] min-w-[24rem]">
      {data.map((invoice) => (
        <div
          key={invoice.id}
          className="bg-background dark:bg-foreground invoice-shadow rounded-lg mb-6 px-8 py-6  items-center flex flex-col gap-y-4 md:flex-row  justify-between gap-x-4 w-full dark:text-primary border border-transparent  hover:border hover:border-purpleLight transition-all ease-in-out duration-300"
        >
          <h2 className="md:block hidden">
            <span className="text-purpleDark">#</span>
            <span className="font-semibold">{invoice.id}</span>
          </h2>
          <h2 className="md:block hidden">{formatData(invoice.createdAt)}</h2>
          <p className="md:block hidden">{invoice.clientName}</p>
          <h2 className="md:block hidden font-semibold text-lg">
            ${invoice.total.toFixed(2)}
          </h2>
          <div className="flex items-center gap-x-3 ">
            <Button
              variant="none"
              className={`min-w-[96px] md:flex gap-x-2 justify-center items-center hidden ${
                invoice.status === "paid" && "bg-greenLow text-greenLight"
              }  ${
                invoice.status === "pending" && "bg-orangeLow text-orangeLight"
              } ${invoice.status === "draft" && "bg-grayLow text-white"}`}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  invoice.status === "paid" && "bg-greenLight"
                }  ${invoice.status === "pending" && "bg-orangeLight"} ${
                  invoice.status === "draft" && "bg-white"
                }`}
              />
              <h2>{nameFixer(invoice.status)}</h2>
            </Button>
            <Image
              src="/assets/icon-arrow-right.svg"
              width={12}
              height={12}
              alt="arrow"
              className="md:block hidden"
            />
          </div>

          <div className="items-center justify-between w-full flex md:hidden">
            <h2>
              <span className="text-purpleDark">#</span>
              <span className="font-semibold">{invoice.id}</span>
            </h2>
            <p>{invoice.clientName}</p>
          </div>
          <div className="items-center justify-between w-full flex md:hidden">
            <div className="items-start justify-center flex-col w-full flex md:hidden">
              <h2>{formatData(invoice.createdAt)}</h2>

              <h2 className="font-semibold text-lg">
                ${invoice.total.toFixed(2)}
              </h2>
            </div>
            <div className="md:hidden items-center gap-x-3 flex ">
              <Button
                variant="none"
                className={`min-w-[96px] md:flex gap-x-2 justify-center items-center  ${
                  invoice.status === "paid" && "bg-greenLow text-greenLight"
                }  ${
                  invoice.status === "pending" &&
                  "bg-orangeLow text-orangeLight"
                } ${invoice.status === "draft" && "bg-grayLow text-white"}`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    invoice.status === "paid" && "bg-greenLight"
                  }  ${invoice.status === "pending" && "bg-orangeLight"} ${
                    invoice.status === "draft" && "bg-white"
                  }`}
                />
                <h2>{nameFixer(invoice.status)}</h2>
              </Button>
              <Image
                src="/assets/icon-arrow-right.svg"
                width={12}
                height={12}
                alt="arrow"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Invoice;
