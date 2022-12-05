import { useState } from 'react';
import { SketchPicker } from 'react-color';
import { useFieldArray, useWatch } from 'react-hook-form';
import { MdDeleteOutline } from 'react-icons/md';
const FieldColorPicker = ({ control, name, setValue, ...propsField }: any) => {
    const [togglePicker, setTogglePicker] = useState(false);
    const [indexPicker, setIndexPicker] = useState<number | null>(null);
    const { fields, append, remove } = useFieldArray({
        control,
        name,
    });
    const color = useWatch({
        control,
        name: 'classify_1',
    });

    const handleOpenPickerColor = (index: number) => {
        setTogglePicker(true);
        setIndexPicker(index);
    };
    const handleClosePickerColor = () => {
        setTogglePicker(false);
        setIndexPicker(null);
    };
    const handleChangeComplete = (color: any, event: any, index: number) => {
        setValue(`${name}.${index}.attribute`, color.hex);
    };
    return (
        <div className="FieldColorPicker">
            <div>
                {fields.map((item: any, index: any) => (
                    <div className="form-group flex my-3 text-left" key={item.id}>
                        <button type="button" className="w-full" onClick={() => handleOpenPickerColor(index)}>
                            <div
                                className="color w-full h-[35px] my-[2px] rounded-2xl border-neutral-400 shadow-md border"
                                style={{
                                    backgroundColor:
                                        color[index]?.attribute.length !== 0 ? color[index]?.attribute : '#000',
                                }}
                            ></div>
                        </button>
                        {togglePicker && indexPicker === index ? (
                            <div className="popover absolute mt-[45px] z-[2]">
                                <div className="cover fixed inset-0" onClick={handleClosePickerColor} />
                                <SketchPicker
                                    onChangeComplete={(color, event) => handleChangeComplete(color, event, index)}
                                    color={color[index]?.attribute}
                                />
                            </div>
                        ) : null}

                        {fields.length > 1 && (
                            <>
                                <div className="close_classify mx-2 cursor-pointer" onClick={() => remove(index)}>
                                    <MdDeleteOutline className="text-2xl hover:opacity-75 hover:text-red-600  transition-all duration-300 mt-2" />
                                </div>
                            </>
                        )}
                    </div>
                ))}
                <button
                    type="button"
                    className="btn !text-sm !md:text-base  ml-4 border-dashed border-[1px] border-primary
                    text-primary hover:bg-slate-100 transition-all duration-300 !px-[30px] py-[6px]"
                    onClick={() => append({ attribute: '' })}
                >
                    Thêm màu sắc
                </button>
            </div>
        </div>
    );
};

export default FieldColorPicker;
