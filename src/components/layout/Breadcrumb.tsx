import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillDashboard } from "react-icons/ai";
import { FaAngleRight, FaRegCreditCard } from "react-icons/fa6";

const Breadcrumb = () => {
  const router = usePathname();
  const linkPath = router.split("/").slice(1);
  linkPath.shift();

  const pathArray = linkPath.map((path, i) => {
    return { breadcrumb: path, href: "/" + linkPath.slice(0, i + 1).join("/") };
  });

  return (
    <div className="text-sm breadcrumbs ">
      <ul className="flex gap-3">
        <li>
          <Link
            href={"/user"}
            className="capitalize flex items-center gap-2 font-medium text-[0.65rem]"
          >
            <AiFillDashboard className="text-slate-700 text-[1rem]" />
            Dashboard
          </Link>
        </li>
        {pathArray.map((data, key) => {
          return (
            <li
              key={key}
              className="text-slate-600 items-center flex gap-2 capitalize font-medium text-[0.65rem] tracking-widest"
            >
              <Link
                href={`/user${data.href}`}
                className="flex gap-2 items-center"
              >
                <FaAngleRight />
                {data.breadcrumb == "insert" ? (
                  <AiFillDashboard />
                ) : (
                  <FaRegCreditCard />
                )}
                <p>{data.breadcrumb.replace("-", " ")}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Breadcrumb;
