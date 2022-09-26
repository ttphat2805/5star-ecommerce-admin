import React from 'react';
import Breadcrumb from '~/components/Breadcrumb';

const AddProduct = () => {
    return (
        <div>
            <Breadcrumb currentPage="Thêm sản phẩm" currentLink="list-product" parentPage="Sản phẩm" />
            <div className="add-product">
                <div className="box rounded-md"></div>
            </div>
        </div>
    );
};

export default AddProduct;
