type IType = {
    market: string,
    division: string,
    min: string | number,
    max: string | number
}

const ProductDetails = async () => {

    const URL1 = "https://api.abcz.workers.dev/api/bazardor/products";
    const res = await fetch(URL1);
    const data = res.json();
    return (
        <div>
            Product Details
        </div>
    );
};

export default ProductDetails;