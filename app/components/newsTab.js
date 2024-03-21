"use client"
import React, {useState} from "react";
// https://news-about-climate-change-api.herokuapp.com/news
const NewsTab = () => {

    const [isClick, setIsClick] = useState(false);

    const toggleNewstab = () => {
        setIsClick(!isClick)
    }


    return (
        <nav className="bg-black position:fixed">
<div
  id="carouselExampleSlidesOnly"
  class="relative"
  data-twe-carousel-init
  data-twe-ride="carousel">

  <div
    class="relative w-full overflow-hidden after:clear-both after:block after:content-['']">
    <div
      class="relative float-left -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
      data-twe-carousel-item
      data-twe-carousel-active>
        <t1>Words</t1>
    </div>
    <div
      class="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
      data-twe-carousel-item>
        <t1>Text</t1>
    </div>
    <div
      class="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
      data-twe-carousel-item>
        <t1>Brother</t1>
    </div>
  </div>
</div>
        </nav>
    )
}

export default NewsTab