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
        </div> */

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
        </div>
    );


}
