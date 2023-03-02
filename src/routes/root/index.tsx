import { Outlet } from "react-router-dom";

const Root = () => {
    return (
        <div className="flex flex-col flex-grow">
            <h1>Header</h1>
            <Outlet />
        </div>
    );
};

export default Root;
