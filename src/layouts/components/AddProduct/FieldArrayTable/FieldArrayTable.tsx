import { Button, Input, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import React from 'react';
import { useWatch } from 'react-hook-form';
import { InputField } from '../../CustomField';
const FieldArrayTable = ({ control, error, getValues }: any) => {
    const classify_1 = useWatch({
        control,
        name: 'classify_1',
    });

    const classify_2 = useWatch({
        control,
        name: 'classify_2',
    });
    const name_classify_1 = useWatch({
        control,
        name: 'name_classify_1',
    });
    const name_classify_2 = useWatch({
        control,
        name: 'name_classify_2',
    });

    return (
        <>
            <Table colorScheme="gray" size="md" className="table-fixed !w-auto">
                <Tbody>
                    <Tr>
                        <Td width="300px">
                            <Input name="name" />
                        </Td>
                        <Td width="300px">
                            <Input name="name" />
                        </Td>
                        <Td>
                            <Button colorScheme="teal">Áp dụng cho tất cả</Button>
                        </Td>
                    </Tr>
                </Tbody>
            </Table>
            <Table colorScheme="gray" size="md" className="table-fixed !w-auto">
                <Thead>
                    <Tr>
                        <Th className="!text-base !text-center">{name_classify_1 || 'Tên'}</Th>
                        <Th className="!text-base !text-center">{name_classify_2 || 'Loại'}</Th>
                        <Th className="!text-base !text-center !w-[200px]">Giá sản phẩm</Th>
                        <Th className="!text-base !text-center">Kho hàng</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {classify_1?.map((item1: any, index: any) => {
                        const lengthOfClassify_2 = classify_2.length || 2;
                        return (
                            <React.Fragment key={index}>
                                {classify_2?.map((item2: any, index: any) => (
                                    <Tr key={index}>
                                        {/* CHECK AVOID RENDER MULTIPLE && DATA HAVE TO EXIST*/}
                                        {index === 0 && (
                                            <Td className="!text-center" rowSpan={lengthOfClassify_2}>
                                                {item1.attribute || 'Tên'}
                                            </Td>
                                        )}
                                        <Td className="!text-center"> {item2.attribute || 'Loại'}</Td>
                                        <Td className="!text-center">
                                            <InputField
                                                required
                                                control={control}
                                                error={error}
                                                name={`variable_attribute.${index}.price.${item1.attribute}`}
                                            />
                                        </Td>
                                        <Td className="!text-center">
                                            <InputField
                                                required
                                                control={control}
                                                error={error}
                                                name={`variable_attribute.${index}.quantity.${item1.attribute}`}
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
