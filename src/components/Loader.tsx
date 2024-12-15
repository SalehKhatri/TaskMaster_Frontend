import {ClipLoader} from "react-spinners";
import React from "react";

const Loader:React.FC = () => {
    return <div className="flex flex-col justify-center items-center">
        <ClipLoader color="#000" loading={true} size={50}/>
        <p className="text-center font-secondary text-gray-500">
            Loading tasks...
        </p>
    </div>
}

export default Loader;