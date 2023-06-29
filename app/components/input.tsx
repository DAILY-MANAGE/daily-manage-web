"use client";
export default function Input({ ...props }: any) {
    return <>
        <input className={`border-2 rounded-lg p-2 px-3 w-full focus:outline-none focus:ring focus:ring-primary-300 ${props.error ? 'border-pink-800' : 'border-stone-200'}`} {...props}></input>
    </>
}
