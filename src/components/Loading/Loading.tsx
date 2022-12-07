import './Loading.scss';
const Loading = () => {
    return (
        <div className="loading-components fixed inset-0 z-[99]">
            <span className="loader shadow-md"></span>
        </div>
    );
};

export default Loading;
