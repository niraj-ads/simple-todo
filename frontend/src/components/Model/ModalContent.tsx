import React from "react";

const ModalContent: React.FC<{
    children: React.ReactNode;
    onClose: () => void;
    title: string;
}> = ({ children, onClose, title }) => {
    const closeModalHandler = (event: React.MouseEvent) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed bg-slate-600 opacity-90 w-full h-full z-40 grid place-items-center text-slate-600"
            onClick={closeModalHandler}
        >
            <section className="relative bg-white max-w-lg w-full rounded-lg p-3 sm:p-5 flex flex-col justify-start shadow-lg">
                <button
                    aria-label="close alert"
                    className="absolute top-4 right-4 text-xl hover:text-red-500"
                    onClick={onClose}
                >
                    &times;
                </button>
                <h2 className="font-medium mb-5 text-lg md:text-2xl">{title}</h2>
                {children}
            </section>
        </div>
    );
};

export default ModalContent;