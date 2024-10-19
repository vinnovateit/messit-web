import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {GitHubLogoIcon, LinkedInLogoIcon, TwitterLogoIcon, InstagramLogoIcon, GlobeIcon} from '@radix-ui/react-icons';
import VinnovateLogo from '/public/VinnovateIT-logo.png';
import VinnovateLogoDark from '/public/VinnovateIT-logo-dark.png';
import ExportedImage from "next-image-export-optimizer";
import React from "react";

const contributors = [
    {
        name: 'Replace me!',
        imageUrl: '/man.png', // ...temp placeholder
        role: 'Developer',
        linkedin: 'https://www.linkedin.com/',
        github: 'https://github.com/',
    },
    {
        name: 'Another person',
        imageUrl: '/man.png', // ...temp placeholder
        role: 'Designer',
        linkedin: 'https://www.linkedin.com/',
        github: 'https://github.com/',
    },
    // todo: all all contributors
];

const About = () => {
    return (
        <div className="container mx-auto py-8">
            <h1 className="text-2xl text-[#53C0D3] font-bold dark:text-[#98E4FF] mb-2">About Us</h1>
            <Card className="mb-6">
                <CardContent className="flex items-center place-content-around ">
                    <ExportedImage src={VinnovateLogo} alt={"Men's hostel"} className="block dark:hidden mt-4 sm:w-52 w-32"/>
                    <ExportedImage src={VinnovateLogoDark} alt={"Men's hostel"}
                           className="hidden dark:block mt-4 sm:w-52 w-32"/>
                    <div className="grid grid-cols-2 gap-4 place-content-center">
                        <div><a href="https://vinnovateit.com" target="_blank"><GlobeIcon className="w-8 h-8"/></a>
                        </div>
                        <div><a href="https://www.instagram.com/vinnovateit/" target="_blank"><InstagramLogoIcon
                            className="w-8 h-8"/></a></div>
                        <div><a href="https://www.linkedin.com/company/v-innovate-it/" target="_blank"><LinkedInLogoIcon
                            className="w-8 h-8"/></a></div>
                        <div><a href="https://twitter.com/v_innovate_it" target="_blank"><TwitterLogoIcon
                            className="w-8 h-8"/></a></div>
                    </div>
                </CardContent>
            </Card>
            <h1 className="text-2xl text-[#53C0D3] font-bold dark:text-[#98E4FF] mb-2">Contributors</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {contributors.map((contributor, index) => (
                    <Card key={index}>
                        <CardHeader>
                            <CardTitle>
                                <ExportedImage src={contributor.imageUrl} alt={contributor.name} width={128} height={128}
                                     className="w-32 h-32 mx-auto rounded-full"/>
                                {contributor.name}
                            </CardTitle>
                            <CardDescription>{contributor.role}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex space-x-4">
                            <a href={contributor.github} target="_blank"><GitHubLogoIcon className="w-8 h-8"/></a>
                            <a href={contributor.linkedin} target="_blank"><LinkedInLogoIcon className="w-8 h-8"/></a>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default About;
