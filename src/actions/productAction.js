"use server"

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/db";


export async function deleteProduct(productId) {
    await db.products.delete({
        where: {
            id: productId
        }
    })
    
    revalidateTag('revalTag')
    redirect('/')
}


export async function AddProduct(formData) {
    "use server"

    const productData = {
        name: formData.get('name'),
        price: parseFloat(formData.get('price')),
        image: formData.get('image').name
    }

    await db.products.createMany({
            data: productData
    })
    revalidatePath('/', 'page')
    redirect('/')
}


export async function updateProductAction(dataForm, id) {
    "use server";

    console.log(dataForm)

    await db.products.update({
        where: {
            id: parseInt(id)
        },
        data: dataForm
    })

    revalidatePath('/', 'page')
    redirect('/')
}