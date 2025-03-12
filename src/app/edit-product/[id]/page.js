import { updateProductAction } from '@/actions/productAction';
import { db } from '@/db';

export default async function EditProduct({ params }) {
    const { id } = params;
    
    const product = await db.products.findUnique({
        where: {
            id: parseInt(id)
        }
    });

    async function updateProduct(formData) {
        "use server";
 
        const updatedData = {
            name: formData.get('name'),
            price: parseFloat(formData.get('price')),
            image: formData.get('image')?.name || ''
        };

        await updateProductAction(updatedData, id);
    }

    return (
        <div style={{ margin: "4em" }}>
            <form 
                className="max-w-3xl p-12 m-auto border border-gray-300 rounded-lg shadow-lg"
                action={updateProduct}
            >
                <div className="space-y-8">
                    <div className="border-b border-gray-200 pb-8">
                        <h1 className="text-2xl font-semibold leading-7 text-gray-900">Edit Product</h1>
                    </div>
                    <div className="pb-8">
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label className="block text-md font-medium text-gray-900">Product Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    defaultValue={product?.name || ''}
                                    className="block w-full rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                                    placeholder="E.g., Fruit"
                                />
                            </div>
                            <div className="sm:col-span-3">
                                <label className="block text-md font-medium text-gray-900">Price</label>
                                <input
                                    type="text"
                                    name="price"
                                    defaultValue={product?.price || ''}
                                    className="block w-full rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                                    placeholder="$0"
                                />
                            </div>
                            <div className="sm:col-span-full">
                                <label className="block text-md font-medium text-gray-900">Product Image</label>
                                <div className="mt-2 justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-5">
                                    <div className="text-center">
                                        <label className="block">
                                            <input 
                                                type="file"
                                                name="image"
                                                className="block w-full text-md text-slate-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-md file:font-semibold file:bg-indigo-50 file:text-indigo-700"
                                            />
                                        </label>
                                        <p className="text-xs leading-5 text-gray-600">.PNG , .JPG , .HEIC</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button type="button" className="text-sm font-semibold leading-6 text-gray-600">
                            Cancel
                        </button>
                        <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-md hover:bg-indigo-500">
                            Save
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}