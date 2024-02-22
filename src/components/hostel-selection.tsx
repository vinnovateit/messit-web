import React, {useState} from 'react';
import ManEmoji from "@/public/man.png"
import WomanEmoji from "@/public/woman.png"
import Image from "next/image";

const HostelSelection = ({onSelect}) => {
    const [selectedButton, setSelectedButton] = useState(null);

    const handleButtonClick = (button) => {
        setSelectedButton(button);
        onSelect(button);
    };
    return (
        <div className="flex self-center">
            <button
                className={`flex items-center justify-center border border-gray-300 rounded-lg p-2 m-2 focus:outline-none focus:bg-gray-200 hover:shadow-lg transform transition ${
                    selectedButton === 'men' ? 'border-[#53C0D3] border-2 shadow-lg' : ''
                }`}
                onClick={() => handleButtonClick('men')}
            >
                <div className="flex flex-col">
                    <Image src={ManEmoji} alt={"Men's hostel"} width={200}></Image>
                    Men&apos;s Hostel
                </div>
            </button>
            <button
                className={`flex items-center justify-center border border-gray-300 rounded-lg p-2 m-2 focus:outline-none focus:bg-gray-200 hover:shadow-lg transform transition ${
                    selectedButton === 'ladies' ? 'border-[#53C0D3] border-2 shadow-lg' : ''
                }`}
                onClick={() => handleButtonClick('ladies')}
            >
                <div className="flex flex-col">
                    <Image src={WomanEmoji} alt={"Ladies' hostel"} width={200}></Image>
                    Ladies&apos;s Hostel
                </div>
            </button>
        </div>
    );
};

export default HostelSelection;