
import Image from "next/image";
import loadingImg from "../../public/Loading.gif";

const loading = () => {
    return (
        <div className="relative h-full w-full">
            <Image
                src={loadingImg}
                alt="Food Hub Loading Image"
                fill
                loading="eager"
                className="object-cover"
            />
        </div>
    );
};

export default loading;