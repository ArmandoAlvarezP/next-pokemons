'use client';

import { useAppSelector } from "@/store";
import { SimpleWidget } from "./SimpleWidget"
import { IoCartOutline } from "react-icons/io5";


export const WidgetsGrid = () => {
    
    const { count } = useAppSelector( state => state.counter);
    
    return (
        <div className="flex flex-wrap p-2 items-center justify-center">
            <SimpleWidget 
                label="Contador"
                title={count.toString()}
                subtitle="Productos en el carrito"
                icon={<IoCartOutline size={ 70 } className="text-blue-600"/>}
                href="/dashboard/counter"
            />
        </div>
    )
}
