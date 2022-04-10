import React from "react";
import { LeftSideBar, Main, RightSideBar } from "../../shared";

export function FoodTaster() {
  return (
    <div className='container-fluid'>
      <div className='row flex-wrap'>
        <LeftSideBar />
        <Main />
        <RightSideBar />
      </div>
    </div>
  );
}
