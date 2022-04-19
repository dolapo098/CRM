// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";

function DataTableDetails() {
  const [page, setPageNumber] = useState(1);
  const [totalItems, setTotalItems] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [pageSize, setPageSize] = useState(20);
  const [mounted, setMounted] = useState(false);
  const [complaints, setComplaints] = useState([]);

  const ComplaintsContext = React.createContext(complaints);

  return {
    page,
    setMounted,
    setPageNumber,
    totalItems,
    setTotalItems,
    pageSize,
    setPageSize,
    complaints,
    setComplaints,
    mounted,
    ComplaintsContext,
    totalPages,
    setTotalPages,
  };
}

export default DataTableDetails;
