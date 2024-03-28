'use client';
import React from 'react';
export default function News(){


    // grid container
    const gridcontainer = {

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

    return( 
        //full page
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
    );


 }
