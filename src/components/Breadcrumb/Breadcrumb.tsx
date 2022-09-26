import { TbChevronsRight } from 'react-icons/tb';
import { Link } from 'react-router-dom';

const Breadcrumb = (props: any) => {
    const { currentPage, currentLink, parentPage, parentLink } = props;
    return (
        <div className="breadcrumb">
            <div className="breadcrumb-container flex bg-white p-3 my-3 rounded-md shadow-sm">
                <div className="title-page text-lg font-medium">{currentPage}</div>
                <div className="title ml-auto mr-[20px]">
                    <div className="breadcrumb-item">
                        <ul className="flex text-base">
                            <li className="text-primary font-medium">Dashboard</li>
                            {parentPage && (
                                <li className="flex items-center">
                                    <span className="text-gray-400 mx-1">
                                        <TbChevronsRight />
                                    </span>
                                    <Link to={`/${parentLink}`}>{parentPage}</Link>
                                </li>
                            )}
                            {currentPage && (
                                <li className="flex items-center">
                                    <span className="text-gray-400 mx-1">
                                        <TbChevronsRight />
                                    </span>
                                    <Link to={`/${currentLink}`}>{currentPage}</Link>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Breadcrumb;
