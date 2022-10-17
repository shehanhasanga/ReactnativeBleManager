import * as React from "react"
import Svg, { G, Rect, Circle, Path, Defs } from "react-native-svg"
const TabIconSvg = (props) => (
    <Svg
        width={95}
        height={95}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <G filter="url(#a)">
            <Rect
                x={18.5}
                y={12}
                width={58}
                height={58}
                rx={29}
                fill="#F23847"
                shapeRendering="crispEdges"
            />
            <G filter="url(#b)">
                <Circle cx={47.5} cy={41} r={29} fill="#F23847" />
            </G>
            <Path
                d="m62.07 38.725-12.568-8.03c-1.59-.988-3.54.206-3.54 2.06v16.017c0 1.853 2.029 3.006 3.54 2.06l12.53-7.99c1.51-.946 1.51-3.211.039-4.117ZM36.43 41.549l4.918 3.142c.623.387 1.385-.08 1.385-.806v-6.268c0-.725-.793-1.176-1.385-.805l-4.902 3.126c-.592.37-.592 1.256-.016 1.61ZM42.303 27.281l-4.918-3.142c-.622-.386-1.385.08-1.385.806v6.268c0 .725.794 1.176 1.385.806l4.903-3.126c.591-.371.591-1.257.015-1.612ZM42.303 52.64l-4.918-3.142c-.622-.387-1.385.08-1.385.805v6.268c0 .725.794 1.177 1.385.806l4.903-3.126c.591-.37.591-1.257.015-1.611Z"
                fill="#fff"
            />
        </G>
        <Defs></Defs>
    </Svg>
)

export default TabIconSvg;
