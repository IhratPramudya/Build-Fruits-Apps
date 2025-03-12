/* eslint-disable react/jsx-key */
import { db } from "@/db";
import getProducts from "../../database/products";
import ProductCard from "@/components/ProductCard";

export const revalidate = 0;

export default async function Products() {

    const products = await db.products.findMany();
    

    return (
        <>
            <div className="grid grid-cols-4 gap-y-12 gap-x-14 mx-24 my-12" >
                {
                    products.map((prod) => {
                        return (
                            <ProductCard key={prod.id} product={prod}/>
                        )
                    })
                }
            </div>
        </>
    )
}