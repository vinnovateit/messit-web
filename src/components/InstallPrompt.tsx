import React, { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Share, PlusCircle, Info} from 'lucide-react';
import {useTheme} from "next-themes";
import Cookies from "js-cookie";

const InstallPrompt = () => {
  const { theme } = useTheme();
  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIos = /iphone|ipad|ipod/.test(userAgent);
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;

    if (isIos && !isStandalone && !Cookies.get('pwaPromptClosed')) {
      showInstallPrompt();
    }
  }, []);

  const showInstallPrompt = () => {
    toast.info(
      <div>
        <div className="flex items-center mb-2">
          <Info className="w-5 h-5 text-blue-500 mr-2"/>
          <h3 className="text-lg font-semibold">Install Messit Web</h3>
        </div>
        <p className="text-sm mb-2">
          Install and unmess your mess today.
        </p>
        <ol className="text-sm list-decimal list-inside">
          <li className="mb-1">Tap <Share className="inline w-4 h-4 text-blue-500" /> below</li>
          <li className="mb-1">Choose &quot;Add to Home Screen&quot; <PlusCircle className="inline w-4 h-4 text-blue-500" /></li>
        </ol>
      </div>,      {
        position: "bottom-center",
        autoClose: false,
        icon: false,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: theme === "dark" ? "dark" : theme === "system" ? (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light") : "light",
        closeButton: ({ closeToast }) => (
          <button
            onClick={(e) => {
              closeToast(e);
              Cookies.set('pwaPromptClosed', 'true', { expires: 1 });
            }}
            className="text-blue-500 font-semibold p-2"
          >
            Ok
          </button>
        ),
      }
    );
  };

  return <ToastContainer />;
};

export default InstallPrompt;
