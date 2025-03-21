'use client'
import React from 'react'


export default function InteractiveCard( { children, contentName } : { children: React.ReactNode, contentName: string }) {

    function onCardSelected() {
        alert("You select " + contentName)
    }

    function onCardMouseAction(event: React.SyntheticEvent) {
        if(event.type == 'mouseover') {
            event.currentTarget.classList.remove('shadow-lg', 'scale-100')
            event.currentTarget.classList.add('shadow-2xl', 'scale-105')
        } else {
            event.currentTarget.classList.remove('shadow-2xl', 'scale-105')
            event.currentTarget.classList.add('shadow-lg', 'scale-100')
        }
    }

    return (
        <div className="w-full h-[300px] rounded-lg shadow-lg transition-transform duration-500 ease-in-out scale-100 hover:bg-gray-400 hover:text-white"
        onMouseOver={ (e)=>onCardMouseAction(e)}
        onMouseOut= {(e)=>onCardMouseAction(e)}
        >
           { children }
        </div>
    );
}