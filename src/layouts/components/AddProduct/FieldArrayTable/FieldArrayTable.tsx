import { Button, FormControl, Input, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useWatch } from 'react-hook-form';
import { InputField } from '../../CustomField';
type applyType = {
    price: number;
    quantity: number;
};
let rerender = 0;
const FieldArrayTable = ({ control, error, setValue }: any) => {
    const [dataApply, setDataApply] = useState<applyType>({ price: 0, quantity: 0 });
    rerender++;
    const classify_1 = useWatch({
        control,
        name: 'classify_1',
    });

    const classify_2 = useWatch({
        control,
        name: 'classify_2',
    });
    console.log('classify_2: ', classify_2);
    const name_classify_1 = useWatch({
        control,
        name: 'name_classify_1',
    });
    const name_classify_2 = useWatch({
        control,
        name: 'name_classify_2',
    });

    // const isClassify_1 = useWatch({
    //     control,
    //     name: 'isClassify_1',
    // });
    // const isClassify_2 = useWatch({
    //     control,
    //     name: 'isClassify_2',
    // });

    const handleChangeApply = (e: React.ChangeEvent<HTMLInputElement>) => {
        let { name, value } = e.target;
        setDataApply({ ...dataApply, [name]: +value });
    };

    const handleApplyAll = () => {
        classify_1.forEach((item1: any, index1: any) => {
            classify_2.forEach((item2: any, index2: any) => {
                setValue(`${`variable_attribute.${index2}.price.${item1.attribute}`}`, dataApply.price);
                setValue(`${`variable_attribute.${index2}.quantity.${item1.attribute}`}`, dataApply.quantity);
            });
        });
    };

    return (
        <>
            {rerender}
            <Table colorScheme="gray" size="md" className="table-fixed !w-auto">
                <Tbody>
                    <Tr>
                        <Td className="!text-center">
                            <FormControl>
                                <Input
                                    width={200}
                                    name="price"
                                    type="number"
                                    min={1000}
                                    placeholder="Nhập giá"
                                    onChange={(e) => handleChangeApply(e)}
                                />
                            </FormControl>
                        </Td>
                        <Td className="!text-center">
                            <FormControl>
                                <Input
                                    width={200}
                                    name="quantity"
                                    type="number"
                                    placeholder="Nhập số lượng kho"
                                    onChange={(e) => handleChangeApply(e)}
                                />
                            </FormControl>
                        </Td>
                        <Td>
                            <Button colorScheme="teal" onClick={handleApplyAll}>
                                Áp dụng cho tất cả
                            </Button>
                        </Td>
                    </Tr>
                </Tbody>
            </Table>

            <Table colorScheme="gray" size="md" className="table-fixed !w-auto">
                <Thead>
                    <Tr>
                        <Th className="!text-base !text-center">{name_classify_1 || 'Màu sắc'}</Th>
                        <Th className="!text-base !text-center">{name_classify_2 || 'Kích thước'}</Th>
                        <Th className="!text-base !text-center !w-[200px]">Giá sản phẩm</Th>
                        <Th className="!text-base !text-center">Kho hàng</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {/* CLASSIFY 1 */}
                    {classify_1?.map((item1: any, index1: any) => {
                        const lengthOfClassify_2 = classify_2.length || 2;
                        return (
                            <React.Fragment key={index1}>
                                {classify_2?.map((item2: any, index2: any) => (
                                    <Tr key={index2}>
                                        {/* CHECK AVOID RENDER MULTIPLE && DATA HAVE TO EXIST*/}
                                        {index2 === 0 && (
                                            <Td className="text-center" rowSpan={lengthOfClassify_2}>
                                                <div
                                                    className="text-center m-auto h-[50px] w-[50px] rounded-full border-2 border-gray-700"
                                                    style={{ backgroundColor: item1.attribute ? item1.attribute : '' }}
                                                ></div>
                                            </Td>
                                        )}
                                        <Td className="!text-center"> {item2.attribute || 'Loại'}</Td>
                                        <Td className="!text-center">
                                            <InputField
                                                required
                                                control={control}
                                                error={error}
                                                name={
                                                    item1.attribute &&
                                                    `variable_attribute.${index2}.price.${item1.attribute}`
                                                }
                                            />
                                        </Td>
                                        <Td className="!text-center">
                                            <InputField
                                                required
                                                control={control}
                                                error={error}
                                                name={`variable_attribute.${index2}.quantity.${item1.attribute}`}
                                            />
                                        </Td>
                                    </Tr>
                                ))}
                            </React.Fragment>
                        );
                    })}
                </Tbody>
            </Table>
        </>
    );
};

export default FieldArrayTable;
