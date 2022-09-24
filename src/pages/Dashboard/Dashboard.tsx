import { FormControl, FormHelperText, FormLabel, Input, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { FiEdit } from 'react-icons/fi';
import { IoCloseOutline } from 'react-icons/io5';
import Breadcrumb from '~/components/Breadcrumb';
const Dashboard = () => {
    return (
        <div>
            <Breadcrumb />
            <h1>Dashboard</h1>
            <hr />
            <h1>TABLE</h1>
            {/* TABLE */}
            <div className="w-full grid grid-cols-2 gap-5">
                <div className="box text-base overflow-x-auto">
                    <Table className="w-full">
                        <Thead>
                            <Tr>
                                <Th>To convert</Th>
                                <Th>into</Th>
                                <Th isNumeric>multiply by</Th>
                                <Th>Hành động</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td>inches</Td>
                                <Td>millimetres (mm)</Td>
                                <Td isNumeric>25.4</Td>
                                <Td className="flex">
                                    <span className="bg-primary action-btn mr-2">
                                        <FiEdit />
                                    </span>
                                    <span className="bg-red-500 action-btn">
                                        <IoCloseOutline />
                                    </span>
                                </Td>
                            </Tr>
                            <Tr>
                                <Td>feet</Td>
                                <Td>centimetres (cm)</Td>
                                <Td isNumeric>30.48</Td>
                                <Td className="flex">
                                    <span className="bg-primary action-btn mr-2">
                                        <FiEdit />
                                    </span>
                                    <span className="bg-red-500 action-btn">
                                        <IoCloseOutline />
                                    </span>
                                </Td>
                            </Tr>
                            <Tr>
                                <Td>yards</Td>
                                <Td>metres (m)</Td>
                                <Td isNumeric>0.91444</Td>
                                <Td className="flex">
                                    <span className="bg-primary action-btn mr-2">
                                        <FiEdit />
                                    </span>
                                    <span className="bg-red-500 action-btn">
                                        <IoCloseOutline />
                                    </span>
                                </Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </div>
                <div className="box text-base overflow-x-auto">
                    <Table variant="striped" className="">
                        <Thead>
                            <Tr>
                                <Th>To convert</Th>
                                <Th>into</Th>
                                <Th isNumeric>multiply by</Th>
                                <Th>Hành động</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td>inches</Td>
                                <Td>millimetres (mm)</Td>
                                <Td isNumeric>25.4</Td>
                                <Td className="flex">
                                    <span className="bg-primary action-btn mr-2">
                                        <FiEdit />
                                    </span>
                                    <span className="bg-red-500 action-btn">
                                        <IoCloseOutline />
                                    </span>
                                </Td>
                            </Tr>
                            <Tr>
                                <Td>feet</Td>
                                <Td>centimetres (cm)</Td>
                                <Td isNumeric>30.48</Td>
                                <Td className="flex">
                                    <span className="bg-primary action-btn mr-2">
                                        <FiEdit />
                                    </span>
                                    <span className="bg-red-500 action-btn">
                                        <IoCloseOutline />
                                    </span>
                                </Td>
                            </Tr>
                            <Tr>
                                <Td>yards</Td>
                                <Td>metres (m)</Td>
                                <Td isNumeric>0.91444</Td>
                                <Td className="flex">
                                    <span className="bg-primary action-btn mr-2">
                                        <FiEdit />
                                    </span>
                                    <span className="bg-red-500 action-btn">
                                        <IoCloseOutline />
                                    </span>
                                </Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </div>
            </div>
            <div className="form">
                <h2>Form</h2>
                <div className="box text-base p-3">
                    <div className="form-group grid grid-cols-2 gap-2">
                        <FormControl className="">
                            <FormLabel>Email address</FormLabel>
                            <Input type="email" />
                            <FormHelperText>We'll never share your email.</FormHelperText>
                        </FormControl>
                        <FormControl className="">
                            <FormLabel>Email address</FormLabel>
                            <Input type="email" />
                            <FormHelperText>We'll never share your email.</FormHelperText>
                        </FormControl>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
