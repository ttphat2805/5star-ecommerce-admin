import { useForm } from 'react-hook-form';

import Breadcrumb from '~/components/Breadcrumb';

const AddAttribute = () => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<any>();

    const onSubmit = (data: any) => console.log(data);

    return (
        <div>
            <Breadcrumb currentPage="Thêm danh mục" parentLink="list-product" parentPage="Danh mục" />
            <div className="add-product">
                <div className="card rounded-md p-2">
                    <div className="form">
                        <div className="card-header p-3 border-b">
                            <h3 className="card-title">Thêm danh mục mới</h3>
                        </div>
                        <div className="card text-base p-3">
                            <form onSubmit={handleSubmit(onSubmit)}></form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddAttribute;
