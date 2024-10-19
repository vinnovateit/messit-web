import React, {Dispatch, SetStateAction, useState} from 'react';
import ExportedImage from "next-image-export-optimizer";
import ManEmoji from "/public/man.png"
import WomanEmoji from "/public/woman.png"

interface HostelSelectionProps {
    onSelect: Dispatch<SetStateAction<string | null>>;
}
const HostelSelection: React.FC<HostelSelectionProps> = ({onSelect}) => {
    const [selectedButton, setSelectedButton] = useState<string | null>(null);

    const handleButtonClick = (button: string) => {
        setSelectedButton(button);
        onSelect(button);
    };
    return (
        <div className="flex self-center">
            <button
                className={`flex items-center justify-center border border-gray-300 rounded-lg p-2 m-2 focus:outline-none focus:bg-gray-200 dark:focus:bg-gray-800 hover:shadow-lg transform transition ${
                    selectedButton === 'men' ? 'border-[#53C0D3] dark:border-[#98E4FF] border-2 shadow-lg' : ''
                }`}
                onClick={() => handleButtonClick('men')}
            >
                <div className="flex flex-col">
                    <ExportedImage src={ManEmoji} alt={"Men's hostel"} width={200}></ExportedImage>
                    Men&apos;s Hostel
                </div>
            </button>
            <button
                className={`flex items-center justify-center border border-gray-300 rounded-lg p-2 m-2 focus:outline-none focus:bg-gray-200 dark:focus:bg-gray-800 hover:shadow-lg transform transition ${
                    selectedButton === 'ladies' ? 'border-[#53C0D3] dark:border-[#98E4FF] border-2 shadow-lg' : ''
                }`}
                onClick={() => handleButtonClick('ladies')}
            >
                <div className="flex flex-col">
                    <ExportedImage src={WomanEmoji} alt={"Ladies' hostel"} width={200}></ExportedImage>
                    Ladies&apos;s Hostel
                </div>
            </button>
        </div>
    );
};

export default HostelSelection;
