import React, { FormHTMLAttributes, ForwardedRef } from "react";

interface FormRootProps extends FormHTMLAttributes<HTMLFormElement> {
    children: React.ReactNode
}

function FormRoot({ children, ...props }: FormRootProps, ref: ForwardedRef<HTMLFormElement>) {
    return <form className="mb-0.5" ref={ref} {...props}>
        { children }
    </form>

}

const RefFormRoot = React.forwardRef(FormRoot);
export default RefFormRoot