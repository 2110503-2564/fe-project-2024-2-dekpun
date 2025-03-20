'use client'
import { useWindowListener } from "@/hooks/useWindowListener";
import { useEffect, useRef, useState } from "react";

export function VlogPlayer({vdoSrc, isPlaying}: {vdoSrc:string, isPlaying:boolean}) {

    const vdoRef = useRef<HTMLVideoElement>(null); 

    useEffect( ()=> {
        if(isPlaying) {
            vdoRef.current?.play()
        } else {
            vdoRef.current?.pause()
        }
    }, [isPlaying])

    useWindowListener("resize", (e)=>{ alert('window width is ' + (e.target as Window).innerWidth)});

    return (
        <video className="w-[40%]" src={vdoSrc} ref={vdoRef} controls loop muted/> 
    );
}