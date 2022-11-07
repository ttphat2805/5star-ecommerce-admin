import { FieldArray } from 'formik';
import React from 'react';
import { MdDeleteOutline } from 'react-icons/md';
import { InputField } from '../../CustomField';

const FieldArrayClassify = ({ formik, name, label }: any) => {
    let lengthValue = formik.values?.[name].length;
    return (
        <div className="fieldArrayClassify_Component">
            <FieldArray
                name={name}
                render={(arrayHelpers) => {
                    return (
                        <div>
                            {formik.values?.[name].map((classify: any, index: any) => (
                                <div className="form-group flex my-3 text-left" key={index}>
                                    <InputField type="text" label={label} name={`${name}.${index}.attribute`} />
                                    {lengthValue > 1 && (
                                        <>
                                            <div
                                                className="close_classify mx-2 cursor-pointer"
                                                onClick={() => arrayHelpers.remove(index)}
                                            >
                                                <MdDeleteOutline className="text-2xl hover:opacity-75 hover:text-red-500  transition-all duration-300 mt-2" />
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))}

                            {/*  */}
                            <button
                                type="button"
                                className="btn !text-sm !md:text-base  ml-4 border-dashed border-[1px] border-primary
                                                                                text-primary hover:bg-slate-100 transition-all duration-300 !px-[30px] py-[6px]"
                                onClick={() => arrayHelpers.insert(lengthValue + 1, { attribute: '' })}
                            >
                                Thêm phân loại hàng
                            </button>
                        </div>
                    );
                }}
            />
        </div>
    );
};

export default FieldArrayClassify;
