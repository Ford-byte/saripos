import Image from "next/image";

export default function BannerBlock(){
    return <div className="center p-4">
        <div className="container">
            <Image
            src={`/images/bannerImage.png`}
            width={1000}
            height={500}
            alt="Banner"
            className="w-full h-[300px] object-cover rounded-lg"
            />
        </div>
    </div>
}