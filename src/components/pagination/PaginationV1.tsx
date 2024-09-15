import { IMetaData } from "@/interfaces/IMetaData";
import { ConfigProvider, Pagination } from "antd";
import { FC } from "react";
type TProps = {
  curentPage: number;
  metaData: IMetaData;
  handleCurentPage: (value: number) => void;
  handlePageSize: (value: number) => void;
};

const PagintaionV1: FC<TProps> = ({
  curentPage,
  metaData,
  handleCurentPage,
  handlePageSize,
}) => {
  function paginationOnchange(curentPage: number, pageSize: number) {
    handleCurentPage(curentPage);
    handlePageSize(pageSize);
  }

  return (
    <div className="relative flex flex-col-reverse md:flex-row items-center gap-5 mt-4 justify-center w-full">
      {metaData?.total > 0 ? (
        <div>
          <p className="md:absolute text-xs text-center -translate-y-1/2 left-2 -z-10 top-1/2 text-slate-500">
            Showing {curentPage * 10 - 10 + 1} to{" "}
            {metaData.current_page === metaData.total_pages
              ? metaData?.total
              : metaData.per_page * metaData.current_page}{" "}
            of {metaData?.total} Entries
          </p>
          <ConfigProvider
            theme={{
              token: {
                borderRadius: 50,
                fontSize: 13,
                colorPrimary: "#666666",
              },
            }}
          >
            <Pagination
              pageSizeOptions={[10, 15, 20, 50, 100]}
              current={curentPage}
              // total={metaData?.total > 10 ? metaData.total : 100}
              total={metaData?.total}
              onChange={paginationOnchange}
            />
          </ConfigProvider>
        </div>
      ) : (
        <>
          <div>
            <p className="text-sm text-slate-500">No Entries Data . . .</p>
          </div>
        </>
      )}
    </div>
  );
};

export default PagintaionV1;
