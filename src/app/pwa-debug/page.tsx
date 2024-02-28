'use client'

import React, {useState, useEffect} from 'react';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Button} from "@/components/ui/button"
import axios from 'axios';

const Page = () => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [status, setStatus] = useState<boolean>(false);
    const [hostel, setHostel] = useState<number>(1);
    const [mess, setMess] = useState<number>(1);
    const combinations = [
        {hostel: 1, mess: 1},
        {hostel: 1, mess: 2},
        {hostel: 1, mess: 3},
        {hostel: 2, mess: 1},
        {hostel: 2, mess: 2},
        {hostel: 2, mess: 3}
    ];

    // todo: cache fetch functions - must be added to root app route '/' at the end so that json gets cached as soon as app launch
    const cacheFetchData = async (hostel: number, mess: number) => {
        try {
            const response = await axios.get(`http://localhost:8000/?hostel=${hostel}&mess=${mess}`);
            // return response.data;
        } catch (error) {
            throw new Error('Error fetching data');
        }
    };
    const fetchAllData = async () => {
        try {
            const responses = await Promise.all(
                combinations.map(({hostel, mess}) => cacheFetchData(hostel, mess))
            );
            // setData(responses); todo: aren't storing the data anywhere yet. Store and use to prevent repeated calls when online
            setLoading(false);
        } catch (error) {
            setError('Error fetching data');
            setLoading(false);
        }
    };
    const handleRefresh = () => {
        setLoading(true);
        fetchAllData(); // forces to re-fetch all jsons
    };

    // local fetch: use it for dashboard
    const fetchData = async () => { // todo: use the jsons stored by the fetchAllData function instead
        try {
            const response = await axios.get(`http://localhost:8000/?hostel=${hostel}&mess=${mess}`);
            setData(response.data);
            setLoading(false);
        } catch (error) {
            setError('Error fetching data');
            setLoading(false);
        }
    };
    useEffect(() => {
        void fetchAllData();
    }, [fetchAllData]);

    useEffect(() => {
        if (navigator.onLine) {
            console.log("online");
            setStatus(true);
        } else {
            console.log("offline");
            setStatus(false);
        }
        void fetchData();
    }, [hostel, mess]);

    const renderMenuItems = (menuItems: any[]) => {
        return menuItems.map((menuItem, index) => (
            <div key={index} className="mb-4">
                <h3 className="font-bold text-lg">{menuItem.type === 1 ? 'Breakfast' : menuItem.type === 2 ? 'Lunch' : menuItem.type === 3 ? 'Snacks' : 'Dinner'}</h3>
                <p>{menuItem.menu}</p>
            </div>
        ));
    };

    return (
        <div className="container mx-auto">
            <div className="flex space-x-4 mb-4">
                {status ? (
                    <span
                        className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">Online</span>
                ) : (
                    <span
                        className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">Offline</span>
                )}
            </div>
            <div className="flex space-x-4 mb-4">
                <Select onValueChange={(e) => setHostel(Number(e))}>
                    <SelectTrigger
                        className="w md:w-[300px] border-[#53C0D3] dark:border-[#98E4FF]">
                        <SelectValue placeholder="Mens Hostel"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="1">Mens Hostel</SelectItem>
                        <SelectItem value="2">Ladies Hostel</SelectItem>
                    </SelectContent>
                </Select>
                <Select onValueChange={(e) => setMess(Number(e))}>
                    <SelectTrigger
                        className="w md:w-[300px] border-[#53C0D3] dark:border-[#98E4FF]">
                        <SelectValue placeholder="Special Mess"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="1">Special Mess</SelectItem>
                        <SelectItem value="2">Veg Mess</SelectItem>
                        <SelectItem value="3">Non-Veg mess</SelectItem>
                    </SelectContent>
                </Select>
                <Button variant="destructive" onClick={handleRefresh}>Refresh</Button>
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div>
                    <h1 className="text-2xl font-bold mb-4">Mess Data</h1>
                    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        {data?.menu.map((dayMenu: any, index: number) => (
                            <div key={index} className="mb-8">
                                <h2 className="text-xl font-semibold mb-4">{dayMenu.date}</h2>
                                {dayMenu.menu && renderMenuItems(dayMenu.menu)}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Page;
