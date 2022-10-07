import { useRef } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { RiDeleteBin3Line } from 'react-icons/ri';
import './ImageUpload.scss';
const ImageUpload = ({ image, setImage, imagePreview, setImagePreview, label, name }: any) => {
    const handleChangeFile = (e: any) => {
        let file = e.target.files[0];
        const dataImageUrl = URL?.createObjectURL(file);
        setImage({ ...image, [name]: file });
        setImagePreview({ ...imagePreview, [name]: dataImageUrl });
    };

    const handleRemoveImage = () => {
        setImage({ ...image, [name]: '' });
        setImagePreview({ ...imagePreview, [name]: '' });
    };
    const dragUploadRef = useRef<HTMLHeadingElement>(null);

    const onDragEnter = () => dragUploadRef.current?.classList.add('active');
    const onDragLeave = () => dragUploadRef.current?.classList.remove('active');
    const onDrop = () => dragUploadRef.current?.classList.remove('active');

    return (
        <div className="upload-image-product text-center ">
            <div
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                ref={dragUploadRef}
                className="add-image relative p-1 w-[100px] h-[100px] overflow-hidden border-dashed border-[1px] border-primary hover:bg-slate-100 transition-all duration-300"
            >
                {imagePreview && !imagePreview[name] && (
                    <label
                        htmlFor={name}
                        className="label-upload w-full h-full flex justify-center items-center text-center text-3xl m-auto text-primary opacity-60"
                    >
                        <AiOutlinePlusCircle />
                        {/* icon Plus */}
                    </label>
                )}
                {imagePreview && imagePreview[name] && (
                    <div className="image-preview absolute w-full h-full top-0 left-0 right-0 ">
                        <img
                            src={imagePreview[name]}
                            alt="Ảnh không tồn tại !"
                            className="w-full h-full border-none outline-none"
                        />
                    </div>
                )}

                <input
                    type="file"
                    className="opacity-0 inset-0 absolute cursor-pointer"
                    id={name}
                    accept="image/*"
                    onChange={handleChangeFile}
                />
                {imagePreview && imagePreview[name] && (
                    <div
                        className="icon-close 
                      add-image-hover:opacity-1add-image-hover:visible
                      add-image-hover:right-0
                      text-white absolute opacity-0 
                      invisible top-0 right-[-50px] py-[4px] px-[6px] bg-gray-500 text-md transition-all duration-300"
                        onClick={handleRemoveImage}
                    >
                        <RiDeleteBin3Line />
                    </div>
                )}
            </div>
            <div className="label inline-block mt-2">
                <label htmlFor={name}>
                    <p className="text-base text-tbase text-center">{label}</p>
                </label>
            </div>
        </div>
    );
};

export default ImageUpload;
