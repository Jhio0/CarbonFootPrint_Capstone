'use client';
import React from 'react';
export default function News() {


    // grid container
    const gridcontainer = {
        // <div class="grid-cols-2 gap-12 flex flex-row"> </div>

    }

    //trending tab container
    const trendingcontainer = {

    }

    //contains individual trending items
    const trendingitem = {

    }

    //size
    //position
    //border
    const trendingimg = {

    }

    //size
    //font
    //color
    //position
    const trendingtext = {

    }

    //contains main items
    const maincontainer = {

    }

    //contains text and img container
    //contanins text container
    const mainitem = {

    }
    // color
    // font
    // text size
    // position
    // lines
    // border
    const maintext = {

    }
    //size
    //location
    //magin
    //style
    const mainimg = {

    }

    return (
        //full page
        /*
        <div style={gridcontainer}> 
            <div style={maincontainer}>
                <div style={mainitem}>
                 <div style={maintext}>news title 1</div>
                 <div style={maintext}>news title 2</div>
                 <div style={maintext}>news title 3</div>
                 <div style={mainimg}>"company img"</div>
                </div>
                <div style={mainitem}>
                 <div style={maintext}>1 news title 1</div>
                 <div style={maintext}>1 news title 2</div>
                 <div style={maintext}>1 news title 3</div>
                 <div style={mainimg}>1 "company img"</div>
                </div>
            </div>
            <div style={trendingcontainer}>
                <div style={trendingitem}>
                    <div style={trendingimg}>"Arctical Img"</div>
                    <div style={trendingtext}>Artical text</div>
                </div>
            </div>
        </div> 

        <div class="grid-col-2 gap-2 flex flex-row"> 
            <div class="basis-2/3 gap-2 border-r-1 border-b-1">
                <div class="grid-cols-2 gap-2 grid-rows-3 divide-y">
                 <div class="row-span-1">news title 1</div>
                 <div class="row-span-1">news title 2</div>
                 <div class="row-span-1">news title 3</div>
                 <div class="row-span-3 object-cover h-48 w-96">"company img"</div>
                </div>
                <div class="grid-cols-2 gap-2 grid-rows-3 divide-y">
                 <div class="row-span-1">news title 1</div>
                 <div class="row-span-1">news title 2</div>
                 <div class="row-span-1">news title 3</div>
                 <div class="row-span-3 object-cover h-48 w-96">"company img"</div>
                </div>
            </div>
            <div class="basis-1/3 gap-2 border-b-1">
                <div class="divide-y">
                    <div class="object-cover h-48 w-96">"Arctical Img"</div>
                    <div class="row-span-1">Artical text</div>
                </div>
            </div>
        </div> */
        <div class="min-h-screen bg-[black]">
  <h1 class="p-2 text-center text-white">News</h1>
  <div class="grid-col-2 flex flex-row gap-2 bg-[white] px-8 py-4 text-white">
    <div class="border-r-1 border-b-1 mx-4 basis-2/3 gap-2">
      <div class="grid grid-flow-col grid-rows-3 gap-2 divide-y py-2">
        <div class="col-span-2 bg-[green]">news title 1</div>
        <div class="col-span-2 bg-[green]">news title 2</div>
        <div class="col-span-2 bg-[green]">news title 3</div>
        <div class="object-cove row-span-3 flex h-48 w-48 items-center justify-center bg-[green]">"company img"</div>
      </div>
      <div class="grid grid-flow-col grid-rows-3 gap-2 divide-y">
        <div class="col-span-2 bg-[green]">news title 1</div>
        <div class="col-span-2 bg-[green]">news title 2</div>
        <div class="col-span-2 bg-[green]">news title 3</div>
        <div class="row-span-3 flex h-48 w-48 items-center justify-center bg-[green] object-cover">"company img"</div>
      </div>
    </div>
    <div class="border-b-1 flex basis-1/3 grid-cols-2 grid-rows-2 gap-2 py-2">
      <div class="divide-y py-2">
        <div class="grid h-32 w-32 bg-[green] object-cover py-2">"Arctical Img"</div>
        <div class="row-start-1 grid bg-[green]">Artical text</div>
      </div>
    </div>
  </div>
</div>

    );


}