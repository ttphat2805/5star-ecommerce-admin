import { TbChevronsRight } from 'react-icons/tb';
import { Link } from 'react-router-dom';

const Breadcrumb = (props: any) => {
    const { currentPage, currentLink, parentPage, parentLink } = props;
    return (
        <div className="breadcrumb">
            <div className="breadcrumb-container flex flex-col sm:flex-row bg-white p-3 my-3 rounded-md shadow-sm justify-start">
                <div className="title-page text-lg font-medium">{currentPage}</div>
                <div className="title sm:ml-auto mr-[20px]">
                    <div className="breadcrumb-item flex-wrap">
                        <ul className="flex sm:text-base text-sm">
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
