import React, { memo, useMemo } from "react";
import { Link } from "react-router-dom";
const CampaignList = ({ item }) => {
  const dateFormatted = useMemo(() => {
    if (!item.start_date) return new Date();
    const date = new Date(item.start_date);
    return new Intl.DateTimeFormat("en-US", {
      // year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(date);
  }, [item.start_date]);

  return (
    <tr key={item._id}>
      <td className="px-6 py-4 whitespace-nowrap ">{item.name}</td>
      <td className="px-6 py-4 whitespace-nowrap ">{item?.options?.length}</td>
      <td className="px-6 py-4 whitespace-nowrap ">{item?.total_votes}</td>
      <td className="px-6 py-4 whitespace-nowrap ">{dateFormatted}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <Link
          to={"/admin/edit/" + item?._id}
          className="hover:text-[#eb6d1e] underline"
        >
          Manage
        </Link>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <Link
          to={"/admin/analytics/" + item?._id}
          className="hover:text-[#eb6d1e] underline"
        >
          Analytics
        </Link>
      </td>
    </tr>
  );
};

export default memo(CampaignList);
