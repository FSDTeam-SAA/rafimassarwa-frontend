/* eslint-disable @typescript-eslint/no-explicit-any */

export const Area = () => {
    return (
        <g>
            <path />
        </g>
    )
}
 
export const AreaChart = (props: any) => {
    return <svg>{props.children}</svg>
}

export const CartesianGrid = () => {
    return <g />
}

export const Legend = () => {
    return <div></div>
}
    // eslint-disable-next-line react-hooks/exhaustive-deps

export const ResponsiveContainer = (props: any) => {
    return <div>{props.children}</div>
}

export const Tooltip = () => {
    return <div></div>
}

export const XAxis = () => {
    return <g />
}

export const YAxis = () => {
    return <g />
}
