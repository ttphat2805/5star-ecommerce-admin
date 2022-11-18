import { useFieldArray } from 'react-hook-form';
import { MdDeleteOutline } from 'react-icons/md';
import { InputField } from '../../CustomField';

const InfoDetail = ({ control, error, name, label }: any) => {
    const { fields, append, remove } = useFieldArray({
        control: control,
        name,
    });
    return (
        <div className="fieldArrayClassify_Component">
            <div>
                {fields.map((item: any, index: any) => (
                    <div className="form-group flex my-3 text-left" key={item.id}>
                        <InputField error={error} control={control} label={label} name={`${name}.${index}`} />
                        {fields.length > 1 && (
                            <>
                                <div className="close_classify mx-2 cursor-pointer" onClick={() => remove(index)}>
                                    <MdDeleteOutline className="text-2xl hover:opacity-75 hover:text-red-500  transition-all duration-300 mt-2" />
                                </div>
                            </>
                        )}
                    </div>
                ))}

                <button
                    type="button"
                    className="btn !text-sm !md:text-base ml-4 border-dashed border-[1px] border-primary
                                text-primary hover:bg-slate-100 transition-all duration-300 !px-[30px] py-[6px]"
                    onClick={() => append('')}
                >
                    Thêm thông tin
                </button>
            </div>
        </div>
    );
};

export default InfoDetail;
