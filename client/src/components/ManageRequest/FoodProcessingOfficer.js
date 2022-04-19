import React, { useEffect } from "react";
import { Header } from "../../shared";
import { LeftSideBar, Main, RightSideBar } from "../../shared";
import { complaintsService } from "../../_services";
import DataTableDetails from "../../shared/DataTableDetails";

export function FoodProcessingOfficer() {
  let {
    page,
    pageSize,
    setPageSize,
    setPageNumber,
    setComplaints,
    complaints,
    setTotalPages,
    totalPages,
  } = DataTableDetails();

  useEffect(() => {
    complaintsService
      .foodOfficerGetComplaints({ page, pageSize })
      .then((res) => {
        setComplaints(res?.data?.items);
        setPageNumber(res?.data?.metaData?.currentPage);
        setPageSize(res?.data?.metaData?.itemsPerPage);
        setTotalPages(res?.data?.metaData?.totalPages);
      });
  }, [
    page,
    pageSize,
    setComplaints,
    setPageNumber,
    setPageSize,
    setTotalPages,
  ]);

  return (
    <React.Fragment>
      <Header />
      <div className='container-fluid'>
        <div className='row flex-wrap'>
          <LeftSideBar />

          <Main
            complaints={complaints}
            pagObj={{
              setPageNumber,
              page,
              pageSize,
              totalPages,
              setPageSize,
            }}
          />

          <RightSideBar complaints={complaints} />
        </div>
      </div>
    </React.Fragment>
  );
}
