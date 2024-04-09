'use client'
import Calendar from "@/components/Calendar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { type CarouselApi } from "@/components/ui/carousel"
import axios from 'axios';
import MenuCard from "@/components/MenuCard";
import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import Sidebar from "@/components/sidebar";
import LandingPage from "@/components/Landing";
import {getDates} from "@/helpers/getDates";

export default function Home() {
  const [showMainContent, setShowMainContent] = useState(false);
  const [currentDateIndex, setCurrentDateIndex] = useState<number>(0);
  const [dateArray, setDateArray] = useState<string[]>([]);
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [hostel, setHostel] = useState<number>(1);
  const [mess, setMess] = useState<number>(1);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  // const jsonData = {"hostel":1,"mess":1,"menu":[{"date":"2024-04-01","menu":[{"type":1,"menu":"Poori, Aloo Masala,  Poha Nampkin  Banana Milk Shake,  Cold Milk, Chocos  B,B,J Tea, Coffee, Milk, Mint Chutney  Cow Peas Salad,   French toast,  "},{"type":2,"menu":"Phulka, Mangolian Chicken/ Chilly Chicken Chilly Panneer, Fried Rice, Poriyal, Dhal Fry White Rice, Sambar, Rasam, Wheel Chips,   Sweet : Chandrakala/Milk Sweet, Butter Milk "},{"type":3,"menu":"Spring Roll   COLD COFFEE Tea, "},{"type":4,"menu":" Plain Dosa, Dal, Sambar, Chutney Veg Jal Frizhi, Methi Roti / Phulka White Rice, Rasam,  Butter Milk  Hot n Sour Veg Soup, Fruits : Fresh  Fruits "}]},{"date":"2024-04-02","menu":[{"type":1,"menu":"Idly, Vada, Sambar, Kitchadi ,Chutney  Fresh  Juice, Cold Milk, Cornflakes  B,B,J,  Tea, Coffee, Milk  Black eye Peas Salad,  Fried Eggs"},{"type":2,"menu":"Diamond Chapathi, Dal Thadka, Channa Masala  White Rice,   Pineapple Rasam,    Curd  Lemon Rice / Bagala Bath Sweet :   Carrot Halwa  "},{"type":3,"menu":"Onion Samosa Imly Chutney    Tea, Coffee, Milk"},{"type":4,"menu":"Chapathi, Veg & Egg  Schezwan Fried Rice  Rajma Masala, Long Beans Sabzhi, Garlic sauce White Rice, Sambar, Rasam, Butter Milk  Veg Manchow Soup, Fruits :    Fruits Salad "}]},{"date":"2024-04-03","menu":[{"type":1,"menu":"Kal Dosa,Vadacurry,  Chutney  Fresh  Juice, Cold Milk, Chocos  B,B,J Tea, Coffee, Milk "},{"type":2,"menu":"Phulka,    Chicken Chetinad  Panneer   Hariyali, Arvi Fry , Dhal Lasoni,Curd White Rice, Sambar, Tomato Rasam, Fryums"},{"type":3,"menu":"Raw banana bajji / Bread Bajji  ICE LEMON TEA "},{"type":4,"menu":"Phulka, Dal Maharani, Bindi Jaipuri Snack Guard Kootu, White Rice, Sambar  Rasam,   Curd Rice, Butter Milk "}]},{"date":"2024-04-04","menu":[{"type":1,"menu":"Paratha, Panneer Burji,    Pongal, Sambar Dates Milk Shake, Cold Milk, Cornflakes  B,B,J Tea, Coffee, Milk , Chutney  Sweet Corn Salad,  Fried Eggs (2nos)"},{"type":2,"menu":"Phulka, Mughlai Egg Masala,  Malai Kuftha Curry   White Rice, Sambar, Rasam,  Banaras Baigan Fryums, Dal Panchamela, Curd Sweet  :    Rasmalai/ Rasagula  "},{"type":3,"menu":"Sweet Corn / Masala Peanuts   Tea, Coffee, Milk"},{"type":4,"menu":"Poori, Channa Masala, White Rice, Rasam Jeera Rice, Poriyal  Loose Curd  Mixed veg Soup,  Fruits :  Seasonal "}]},{"date":"2024-04-05","menu":[{"type":1,"menu":"Masala Ghee Roast Dosa, Sambar,   Fresh  Juice, Cold Milk, Chocos, Chutney B,B,J,  Tea, Coffee, Milk  Moong Dal Sprout, Scrambeled Egg(2)"},{"type":2,"menu":"Phulka, Dal Fry,  Tandoori Chicken, Panneer  Amritsari, White rice, Sambar, Poondu Rasam,   Loose Curd,  Fryums, Keira  Kootu  Sweet :  Gulab Jamun/ Makhan peda "},{"type":3,"menu":"Brownie Cake    Cold Badam Milk Tea,  "},{"type":4,"menu":"Phulka, Dal Rajma,    White Rice,   Dhum Aloo / Banaras Aloo  Rasam,  Curd, Idly, Sambar, Chutney Cream of Tomato, Fruits :   Papaya "}]},{"date":"2024-04-06","menu":[{"type":1,"menu":"Aloo Paratha, Curd, Kitchadi, Chutney   Fresh  Juice, Cold Milk, Chocos,Sambar B,B,J Tea, Coffee, Milk  Salad,  Egg Burji (2)"},{"type":2,"menu":"Phulka, Dal Makhani,  Dingri Muttar   Dahi Vada , Poriyal, ,Sambar/Karakolambu  White Rice, Paruppu Rasam, Fryums,    Sweet : Ghee Mysore Paak "},{"type":3,"menu":"French Fries  Sauce   Tea, Coffee, Milk"},{"type":4,"menu":"Phulka, Dal Fry,  Veg & Egg Manchow Fried Rice  Baby corn Manchurian, Poriyal, Loose Curd White Rice, Sambar, Rasam  Spring Onion Soup, Fruits :  Fresh Fruits "}]},{"date":"2024-04-07","menu":[{"type":1,"menu":"Idly,Vada, Sambar,Chutney,Fresh  Juice, Cold Milk, Corn Flakes,Tea, Coffee, Milk, B,B,J Sprouted Channa Black Omelette Sandwich "},{"type":2,"menu":"Phulka, Dal, Chicken Biryani, Veg Biryani,  Banaras Baigan,  Panneer 65, Onion Raitha White Rice,Sambar,Tomato Rasam, Papad,  Sweet :  Ice Cream / Kulfhi"},{"type":3,"menu":"Vada Paav/ Pani Poori  SWEET LASSI  Tea, "},{"type":4,"menu":"Phulka, Dal Masala,   Butter Peas masala White Rice, Sambar, Rasam,  Aloo Jeera   Curd, Variety Rice  Sweet corn Soup, Fruits :  Cut Fruits "}]},{"date":"2024-04-08","menu":[{"type":1,"menu":"Poori, Aloo Masala,  Poha Nampkin  Banana Milk Shake, Cold Milk, Chocos  B,B,J Tea, Coffee, Milk  CowPeasSalad, Chutney,  French Toast"},{"type":2,"menu":"Phulka, Kashmiri  Chicken  Masala,Dal Fry Panneer Butter Masala, Poriyal, Butter Milk White Rice, Sambar, Pepper Rasam, Wheel Chips  Sweet : Mothichoor Laddu/   Rava Laddu "},{"type":3,"menu":"Mysore Bonda /Onion Pakoda   Tea, Coffee, Milk"},{"type":4,"menu":"Pudhina Roti / Phulka, Dosa, Sambar, Chutney Loose Curd , Dhal Maharani,Channa Masala  White Rice, Rasam,    Veg  Mushroom Soup, Fruits : Seasonal "}]},{"date":"2024-04-09","menu":[{"type":1,"menu":"Gobi Paratha, Curd,  Kitchadi, Sambar Date Milk Shake, Cold Milk, Cornflakes  B,B,J,Pickle,  Tea, Coffee, Milk, Chutney Black eye Peas Salad,  Fried Eggs "},{"type":2,"menu":"Phulka, Dal  Ajwin, Veg Jal Frizhe White Rice,   Pineapple Rasam , Curd  Bisibilla Bath, Potato Chips  Sweet : Carrot Halwa "},{"type":3,"menu":"Mixed Veg  Samosa  Sauce  Tea, Coffee, Milk"},{"type":4,"menu":"Phulka, Dal Fry,Veg & Egg  Fried Rice  Veg Chat pata/ Garlic Sauce, Poriyal, White Rice, Sambar, Rasam,  Curd  Veg Manchow Soup, Fruits :   Orange "}]},{"date":"2024-04-10","menu":[{"type":1,"menu":"Andhra Masala Dosa, Sambar, Chutney  Fresh  Juice, Cold Milk, Chocos  B,B,J Tea, Coffee, Milk  Green Salad,    Egg Burji ( 2 nos )"},{"type":2,"menu":"Diamond Chapathi, Dal Fry,  Lasoni  Chicken  Panneer Tikka Masala, Curd, Aloo Methi/  Aloo Saagwala, White Rice, Sambar, Rasam, Fryums Sweet : Coconut Burfi   /  Coconut Laddu "},{"type":3,"menu":"Veg Burger/ Veg Club Sandwich ICE LEMON TEA  Coffee, Milk"},{"type":4,"menu":" Phulka, Dal Maharani, Bindi  Do Piaza  Snack Guard Kootu, White Rice, Sambar  Rasam, Loose Curd,  Puliyodra  Chetinad Soup, Fruits :  Papaya"}]},{"date":"2024-04-11","menu":[{"type":1,"menu":"Panneer Paratha, Pongal, Vada, Sambar Fresh Juice,Cold Milk,Cornflakes,Chutney  B,B,J Tea, Coffee, Milk  Black Channa Sprout, Fried Eggs(2nos)"},{"type":2,"menu":" Phulka, Fried Egg Lababdar / Malabar fish Curry Panneer kuftha Curry, White Rice, Sambar, Rasam,   Wheel Chips, Dal Rajma,  Butter Milk  Sweet  :   Rasmalai/ Rasagula  "},{"type":3,"menu":"Donut / Croissant    Tea, Coffee, Milk "},{"type":4,"menu":"Poori, Channa Masala ,White Rice, Rasam  Veriety Rice , Poriyal   Curd   Veg Brocoli Soup,  Fruit Salad "}]},{"date":"2024-04-12","menu":[{"type":1,"menu":"Mysore Masala Dosa, Sambar, Chutney Fresh  Juice, Cold Milk, Cornflakes  B,B,J Tea, Coffee, Milk  Moong Dal Sprout,  Scrambeled Egg(2)"},{"type":2,"menu":"Phulka, Dhal ,Tandoor Chicken, Panneer  Fingers, White rice,Sambar, Gr.Veg Sabzhi Curd,  Fryums, Pineapple Rasam  Sweet : Gulab Jamun /  Makhan peda"},{"type":3,"menu":"Brownie Cake    Cold Badam Milk Tea,  "},{"type":4,"menu":"Phulka, Dal Rajma,  Idly, Sambar, Chutney White Rice,  Dhum Aloo / Aloo Jeera  Rasam, Loose Curd,   Cream of Tomato, Fruits :  Fresh Fruits "}]},{"date":"2024-04-13","menu":[{"type":1,"menu":"Aloo Paratha, Curd, Kitchadi, Chutney   Fresh   Juice, Cold Milk, Chocos,Sambar Pickle, B,B,J Tea, Coffee, Milk  Salad,  Egg Podimas "},{"type":2,"menu":"Phulka, Dal Makhani,  Mushroom Muttar Masala,  Dhai Vada,   Dal Rasam, Fryums, MoreKozhambhu White Rice, Karakozhambu /  Sambar  Sweet :  Kova  Mysore Paak "},{"type":3,"menu":"French Fries  Sauce  Ice Lemon Tea Coffee "},{"type":4,"menu":"Phulka, Dal Rajasthani, Veg & Egg Fried Rice       Soya Chunk & capsicum Masala  White Rice, Sambar, Rasam, Curd  Spring Onion Soup, Fruits :   Musk melon "}]},{"date":"2024-04-14","menu":[{"type":1,"menu":"Paav Bhaji , Vada/Vada Paav, Pongal,  Fresh  Juice, Cold Milk,  Corn Flakes B,B,J Tea, Coffee, Milk , Sambar, Chutney  Green Salad,  Fried Eggs(2nos)"},{"type":2,"menu":"Phulka, Dal Rajma, Chicken Biryani, Veg Biryani,  Banaras Baigan, Panneer Burji,  Onion Raitha White Rice,Sambar,Tomato Rasam, Papad,  Sweet :   Assorted Ice Cream "},{"type":3,"menu":"Sweet Puff/ Veg Puff  Tea, Coffee, Milk"},{"type":4,"menu":" Phulka, Dal Banjara,    Baby Corn Masala  White Rice, Sambar,  Poriyal Butter Milk, Mint Pulav , Rasam Minestroni Soup, Fruits : Papaya "}]},{"date":"2024-04-15","menu":[{"type":1,"menu":"Poori, Aloo Masala,  Poha Nampkin  Banana Milk Shake,  Cold Milk, Chocos  B,B,J Tea, Coffee, Milk, Mint Chutney  Cow Peas Salad,   French toast,  "},{"type":2,"menu":"Phulka, Mangolian Chicken/ Chilly Chicken Chilly Panneer, Fried Rice, Poriyal, Dhal Fry White Rice, Sambar, Rasam, Wheel Chips,   Sweet : Chandrakala/Milk Sweet, Butter Milk "},{"type":3,"menu":"Spring Roll   COLD COFFEE Tea, "},{"type":4,"menu":" Plain Dosa, Dal, Sambar, Chutney Veg Jal Frizhi, Methi Roti / Phulka White Rice, Rasam,  Butter Milk  Hot n Sour Veg Soup, Fruits : Fresh  Fruits "}]},{"date":"2024-04-16","menu":[{"type":1,"menu":"Idly, Vada, Sambar, Kitchadi ,Chutney  Fresh  Juice, Cold Milk, Cornflakes  B,B,J,  Tea, Coffee, Milk  Black eye Peas Salad,  Fried Eggs"},{"type":2,"menu":"Diamond Chapathi, Dal Thadka, Channa Masala  White Rice,   Pineapple Rasam,    Curd  Lemon Rice / Bagala Bath Sweet :   Carrot Halwa  "},{"type":3,"menu":"Onion Samosa Imly Chutney    Tea, Coffee, Milk"},{"type":4,"menu":"Chapathi, Veg & Egg  Schezwan Fried Rice  Rajma Masala, Long Beans Sabzhi, Garlic sauce White Rice, Sambar, Rasam, Butter Milk  Veg Manchow Soup, Fruits :    Fruits Salad "}]},{"date":"2024-04-17","menu":[{"type":1,"menu":"Kal Dosa,Vadacurry,  Chutney  Fresh  Juice, Cold Milk, Chocos  B,B,J Tea, Coffee, Milk "},{"type":2,"menu":"Phulka,    Chicken Chetinad  Panneer   Hariyali, Arvi Fry , Dhal Lasoni,Curd White Rice, Sambar, Tomato Rasam, Fryums"},{"type":3,"menu":"Raw banana bajji / Bread Bajji  ICE LEMON TEA "},{"type":4,"menu":"Phulka, Dal Maharani, Bindi Jaipuri Snack Guard Kootu, White Rice, Sambar  Rasam,   Curd Rice, Butter Milk "}]},{"date":"2024-04-18","menu":[{"type":1,"menu":"Paratha, Panneer Burji,    Pongal, Sambar Dates Milk Shake, Cold Milk, Cornflakes  B,B,J Tea, Coffee, Milk , Chutney  Sweet Corn Salad,  Fried Eggs (2nos)"},{"type":2,"menu":"Phulka, Mughlai Egg Masala,  Malai Kuftha Curry   White Rice, Sambar, Rasam,  Banaras Baigan Fryums, Dal Panchamela, Curd Sweet  :    Rasmalai/ Rasagula  "},{"type":3,"menu":"Sweet Corn / Masala Peanuts   Tea, Coffee, Milk"},{"type":4,"menu":"Poori, Channa Masala, White Rice, Rasam Jeera Rice, Poriyal  Loose Curd  Mixed veg Soup,  Fruits :  Seasonal "}]},{"date":"2024-04-19","menu":[{"type":1,"menu":"Masala Ghee Roast Dosa, Sambar,   Fresh  Juice, Cold Milk, Chocos, Chutney B,B,J,  Tea, Coffee, Milk  Moong Dal Sprout, Scrambeled Egg(2)"},{"type":2,"menu":"Phulka, Dal Fry,  Tandoori Chicken, Panneer  Amritsari, White rice, Sambar, Poondu Rasam,   Loose Curd,  Fryums, Keira  Kootu  Sweet :  Gulab Jamun/ Makhan peda "},{"type":3,"menu":"Brownie Cake    Cold Badam Milk Tea,  "},{"type":4,"menu":"Phulka, Dal Rajma,    White Rice,   Dhum Aloo / Banaras Aloo  Rasam,  Curd, Idly, Sambar, Chutney Cream of Tomato, Fruits :   Papaya "}]},{"date":"2024-04-20","menu":[{"type":1,"menu":"Aloo Paratha, Curd, Kitchadi, Chutney   Fresh  Juice, Cold Milk, Chocos,Sambar B,B,J Tea, Coffee, Milk  Salad,  Egg Burji (2)"},{"type":2,"menu":"Phulka, Dal Makhani,  Dingri Muttar   Dahi Vada , Poriyal, ,Sambar/Karakolambu  White Rice, Paruppu Rasam, Fryums,    Sweet : Ghee Mysore Paak "},{"type":3,"menu":"French Fries  Sauce   Tea, Coffee, Milk"},{"type":4,"menu":"Phulka, Dal Fry,  Veg & Egg Manchow Fried Rice  Baby corn Manchurian, Poriyal, Loose Curd White Rice, Sambar, Rasam  Spring Onion Soup, Fruits :  Fresh Fruits "}]},{"date":"2024-04-21","menu":[{"type":1,"menu":"Idly,Vada, Sambar,Chutney,Fresh  Juice, Cold Milk, Corn Flakes,Tea, Coffee, Milk, B,B,J Sprouted Channa Black Omelette Sandwich "},{"type":2,"menu":"Phulka, Dal, Chicken Biryani, Veg Biryani,  Banaras Baigan,  Panneer 65, Onion Raitha White Rice,Sambar,Tomato Rasam, Papad,  Sweet :  Ice Cream / Kulfhi"},{"type":3,"menu":"Vada Paav/ Pani Poori  SWEET LASSI  Tea, "},{"type":4,"menu":"Phulka, Dal Masala,   Butter Peas masala White Rice, Sambar, Rasam,  Aloo Jeera   Curd, Variety Rice  Sweet corn Soup, Fruits :  Cut Fruits "}]},{"date":"2024-04-22","menu":[{"type":1,"menu":"Poori, Aloo Masala,  Poha Nampkin  Banana Milk Shake, Cold Milk, Chocos  B,B,J Tea, Coffee, Milk  CowPeasSalad, Chutney,  French Toast"},{"type":2,"menu":"Phulka, Kashmiri  Chicken  Masala,Dal Fry Panneer Butter Masala, Poriyal, Butter Milk White Rice, Sambar, Pepper Rasam, Wheel Chips  Sweet : Mothichoor Laddu/   Rava Laddu "},{"type":3,"menu":"Mysore Bonda /Onion Pakoda   Tea, Coffee, Milk"},{"type":4,"menu":"Pudhina Roti / Phulka, Dosa, Sambar, Chutney Loose Curd , Dhal Maharani,Channa Masala  White Rice, Rasam,    Veg  Mushroom Soup, Fruits : Seasonal "}]},{"date":"2024-04-23","menu":[{"type":1,"menu":"Gobi Paratha, Curd,  Kitchadi, Sambar Date Milk Shake, Cold Milk, Cornflakes  B,B,J,Pickle,  Tea, Coffee, Milk, Chutney Black eye Peas Salad,  Fried Eggs "},{"type":2,"menu":"Phulka, Dal  Ajwin, Veg Jal Frizhe White Rice,   Pineapple Rasam , Curd  Bisibilla Bath, Potato Chips  Sweet : Carrot Halwa "},{"type":3,"menu":"Mixed Veg  Samosa  Sauce  Tea, Coffee, Milk"},{"type":4,"menu":"Phulka, Dal Fry,Veg & Egg  Fried Rice  Veg Chat pata/ Garlic Sauce, Poriyal, White Rice, Sambar, Rasam,  Curd  Veg Manchow Soup, Fruits :   Orange "}]},{"date":"2024-04-24","menu":[{"type":1,"menu":"Andhra Masala Dosa, Sambar, Chutney  Fresh  Juice, Cold Milk, Chocos  B,B,J Tea, Coffee, Milk  Green Salad,    Egg Burji ( 2 nos )"},{"type":2,"menu":"Diamond Chapathi, Dal Fry,  Lasoni  Chicken  Panneer Tikka Masala, Curd, Aloo Methi/  Aloo Saagwala, White Rice, Sambar, Rasam, Fryums Sweet : Coconut Burfi   /  Coconut Laddu "},{"type":3,"menu":"Veg Burger/ Veg Club Sandwich ICE LEMON TEA  Coffee, Milk"},{"type":4,"menu":" Phulka, Dal Maharani, Bindi  Do Piaza  Snack Guard Kootu, White Rice, Sambar  Rasam, Loose Curd,  Puliyodra  Chetinad Soup, Fruits :  Papaya"}]},{"date":"2024-04-25","menu":[{"type":1,"menu":"Panneer Paratha, Pongal, Vada, Sambar Fresh Juice,Cold Milk,Cornflakes,Chutney  B,B,J Tea, Coffee, Milk  Black Channa Sprout, Fried Eggs(2nos)"},{"type":2,"menu":" Phulka, Fried Egg Lababdar / Malabar fish Curry Panneer kuftha Curry, White Rice, Sambar, Rasam,   Wheel Chips, Dal Rajma,  Butter Milk  Sweet  :   Rasmalai/ Rasagula  "},{"type":3,"menu":"Donut / Croissant    Tea, Coffee, Milk "},{"type":4,"menu":"Poori, Channa Masala ,White Rice, Rasam  Veriety Rice , Poriyal   Curd   Veg Brocoli Soup,  Fruit Salad "}]},{"date":"2024-04-26","menu":[{"type":1,"menu":"Mysore Masala Dosa, Sambar, Chutney Fresh  Juice, Cold Milk, Cornflakes  B,B,J Tea, Coffee, Milk  Moong Dal Sprout,  Scrambeled Egg(2)"},{"type":2,"menu":"Phulka, Dhal ,Tandoor Chicken, Panneer  Fingers, White rice,Sambar, Gr.Veg Sabzhi Curd,  Fryums, Pineapple Rasam  Sweet : Gulab Jamun /  Makhan peda"},{"type":3,"menu":"Brownie Cake    Cold Badam Milk Tea,  "},{"type":4,"menu":"Phulka, Dal Rajma,  Idly, Sambar, Chutney White Rice,  Dhum Aloo / Aloo Jeera  Rasam, Loose Curd,   Cream of Tomato, Fruits :  Fresh Fruits "}]},{"date":"2024-04-27","menu":[{"type":1,"menu":"Aloo Paratha, Curd, Kitchadi, Chutney   Fresh   Juice, Cold Milk, Chocos,Sambar Pickle, B,B,J Tea, Coffee, Milk  Salad,  Egg Podimas "},{"type":2,"menu":"Phulka, Dal Makhani,  Mushroom Muttar Masala,  Dhai Vada,   Dal Rasam, Fryums, MoreKozhambhu White Rice, Karakozhambu /  Sambar  Sweet :  Kova  Mysore Paak "},{"type":3,"menu":"French Fries  Sauce  Ice Lemon Tea Coffee "},{"type":4,"menu":"Phulka, Dal Rajasthani, Veg & Egg Fried Rice       Soya Chunk & capsicum Masala  White Rice, Sambar, Rasam, Curd  Spring Onion Soup, Fruits :   Musk melon "}]},{"date":"2024-04-28","menu":[{"type":1,"menu":"Paav Bhaji , Vada/Vada Paav, Pongal,  Fresh  Juice, Cold Milk,  Corn Flakes B,B,J Tea, Coffee, Milk , Sambar, Chutney  Green Salad,  Fried Eggs(2nos)"},{"type":2,"menu":"Phulka, Dal Rajma, Chicken Biryani, Veg Biryani,  Banaras Baigan, Panneer Burji,  Onion Raitha White Rice,Sambar,Tomato Rasam, Papad,  Sweet :   Assorted Ice Cream "},{"type":3,"menu":"Sweet Puff/ Veg Puff  Tea, Coffee, Milk"},{"type":4,"menu":" Phulka, Dal Banjara,    Baby Corn Masala  White Rice, Sambar,  Poriyal Butter Milk, Mint Pulav , Rasam Minestroni Soup, Fruits : Papaya "}]},{"date":"2024-04-29","menu":[{"type":1,"menu":"Poori, Aloo Masala,  Poha Nampkin  Banana Milk Shake,  Cold Milk, Chocos  B,B,J Tea, Coffee, Milk, Mint Chutney  Cow Peas Salad,   French toast,  "},{"type":2,"menu":"Phulka, Mangolian Chicken/ Chilly Chicken Chilly Panneer, Fried Rice, Poriyal, Dhal Fry White Rice, Sambar, Rasam, Wheel Chips,   Sweet : Chandrakala/Milk Sweet, Butter Milk "},{"type":3,"menu":"Spring Roll   COLD COFFEE Tea, "},{"type":4,"menu":" Plain Dosa, Dal, Sambar, Chutney Veg Jal Frizhi, Methi Roti / Phulka White Rice, Rasam,  Butter Milk  Hot n Sour Veg Soup, Fruits : Fresh  Fruits "}]},{"date":"2024-04-30","menu":[{"type":1,"menu":"Idly, Vada, Sambar, Kitchadi ,Chutney  Fresh  Juice, Cold Milk, Cornflakes  B,B,J,  Tea, Coffee, Milk  Black eye Peas Salad,  Fried Eggs"},{"type":2,"menu":"Diamond Chapathi, Dal Thadka, Channa Masala  White Rice,   Pineapple Rasam,    Curd  Lemon Rice / Bagala Bath Sweet :   Carrot Halwa  "},{"type":3,"menu":"Onion Samosa Imly Chutney    Tea, Coffee, Milk"},{"type":4,"menu":"Chapathi, Veg & Egg  Schezwan Fried Rice  Rajma Masala, Long Beans Sabzhi, Garlic sauce White Rice, Sambar, Rasam, Butter Milk  Veg Manchow Soup, Fruits :    Fruits Salad "}]}]}
  // for date heading
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
  const currentYear = currentDate.getFullYear();

  const fetchData = async () => {
    try {
      const selectedHostel = Cookies.get('selectedHostelType');
      const selectedMessType = Cookies.get('selectedMessType');
      let hostelParam = 1;
      let messParam = 1;

      if (selectedHostel) {
        switch (selectedHostel) {
          case 'men':
            hostelParam = 1;
            break;
          case 'ladies':
            hostelParam = 2;
            break;
          default:
            hostelParam = 1;
        }
      }

      if (selectedMessType) {
        switch (selectedMessType) {
          case 'special':
            messParam = 1;
            break;
          case 'veg':
            messParam = 2;
            break;
          case 'non-veg':
            messParam = 3;
            break;
          default:
            messParam = 1;
        }
      }

      const response = await axios.get(`http://localhost:8000/?hostel=${hostelParam}&mess=${messParam}`);
      setData(response.data);
    } catch (error) {
      setError('Error fetching data');
    }
  };

  useEffect(() => {
    if (!api) {
      return
    }
    setCurrent(api.selectedScrollSnap() + 1)
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
      setCurrentDateIndex(api.selectedScrollSnap())
    })
  }, [api])

  useEffect(() => {
    const selectedHostel = Cookies.get('selectedHostelType');
    const selectedMessType = Cookies.get('selectedMessType');
    if (selectedMessType) {
      switch (selectedMessType) {
        case 'special':
          setMess(1);
          break;
        case 'veg':
          setMess(2);
          break;
        case 'non-veg':
          setMess(3);
          break;
        default:
          setMess(1);
      }
    }

    if (selectedHostel) {
      switch (selectedHostel) {
        case 'men':
          setHostel(1);
          break;
        case 'ladies':
          setHostel(2);
          break;
        default:
          setHostel(1);
      }
    }
    fetchData().then(r => console.log('Data fetched')).catch(e => console.error('Error fetching data'));
    if (selectedHostel && selectedMessType) {
      setShowMainContent(true);
    }
    const dates = getDates();
    setDateArray(dates);
    // set to current date
    const today = new Date().toISOString().slice(0, 10);
    const currentDateIndex = dates.findIndex(date => date === today);
    setCurrentDateIndex(currentDateIndex);
  }, [hostel,mess]);

  if (!showMainContent) {
    return <LandingPage/>;
  }

  // Hostel/mess title
  let hostelPrefix = '';
  let messTypeText = '';

  if (hostel === 1) {
    hostelPrefix = 'MH-';
  } else if (hostel === 2) {
    hostelPrefix = 'LH-';
  }

  if (mess === 1) {
    messTypeText = 'Special Mess';
  } else if (mess === 2) {
    messTypeText = 'Veg Mess';
  } else if (mess === 3) {
    messTypeText = 'Non-Veg Mess';
  }

  const handleDateSelect = (date: string) => {
    console.log('Selected date:', date);
  };
  const onSelectDayChange = (index: number) => {
    if (api) {
      api.scrollTo(index);
    }
    console.log('Select date index:', index)
  };


  return (
    <main className="flex min-h-screen flex-col items-center justify-around laptop:p-16 gap-[2rem] mobile:p-8">
      <div className="fixed top-2 left-2 z-50">
        <Sidebar setShowMainContent={setShowMainContent}/>
      </div>
      <div className="w-full flex flex-col justify-between items-start text-[3rem] gap-[2rem]">
        <h1 className="w-full text-center mobile:text-[2rem] mobile:mt-[2rem]">{hostelPrefix}<span className="font-bold text-[#53C0D3] dark:text-[#98E4FF]">{messTypeText}</span></h1>
        <h3 className="mobile:text-[2rem] mobile:w-full mobile:text-center"><b>{currentMonth} </b>{currentYear}</h3>
      </div>
      <Calendar onDateSelect={handleDateSelect} currentDateIndex={currentDateIndex} onSelectDayChange={onSelectDayChange}/>
      <Carousel className="w-full" setApi={setApi}
                opts={{
                  startIndex: currentDateIndex,
                }}>
        <CarouselContent>
          {Array.from(dateArray).map((_, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                    <section
                      className="grid laptop:grid-cols-2 justify-around items-center w-full gap-[2rem] flex-wrap mobile:grid-cols-1">
                      {data?.menu[index].menu.map((menuItem:string, i:number) => (
                        <MenuCard
                          key={i}
                          foodItems={menuItem.menu}
                          meal={
                            menuItem.type === 1
                              ? 'Breakfast'
                              : menuItem.type === 2
                                ? 'Lunch'
                                : menuItem.type === 3
                                  ? 'Snacks'
                                  : 'Dinner'
                          }
                          timing={
                            menuItem.type === 1
                              ? '7:00 AM - 9:00 AM'
                              : menuItem.type === 2
                                ? '12:30 PM - 2:30 PM'
                                : menuItem.type === 3
                                  ? '4:00 PM - 6:00 PM'
                                  : '7:00 PM - 9:00 PM'
                          }
                        />
                      ))}
                    </section>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </main>
  );
}
