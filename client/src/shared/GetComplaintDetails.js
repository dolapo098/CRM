// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";

function GetComplaintDetails() {
  let [formData, setFormData] = useState({
    id: "" || "",
    comment: "" || "",
    attachmentId: "" || "",
    salesInvoiceId: "" || "",
    reviewedBy: "" || "",
    state: "" || "",
    last_action: "" || "",
  });

  const [isSubmmitted, setIsSubmited] = useState(false);
  const [isSuccess, setIsSucces] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [isError, setIsError] = useState(false);

  return {
    setFormData,
    formData,
    isSubmmitted,
    setIsSubmited,
    isSuccess,
    setIsSucces,
    isFailed,
    setIsFailed,
    isError,
    setIsError,
  };
}

export default GetComplaintDetails;
