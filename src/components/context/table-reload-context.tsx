"use client";

import {
    createContext,
    useContext,
    useState,
    ReactNode,
} from "react";

interface TableReloadContextType {
    shouldReloadTable: boolean;
    setShouldReloadTable: (value: boolean) => void;
}

const TableReloadContext = createContext<TableReloadContextType | undefined>(
    undefined
);

export const TableReloadProvider = ({ children }: { children: ReactNode }) => {
    const [shouldReloadTable, setShouldReloadTable] = useState<boolean>(false);

    return (
        <TableReloadContext.Provider
            value={{ shouldReloadTable, setShouldReloadTable }}
        >
            {children}
        </TableReloadContext.Provider>
    );
};

export const useTableReload = () => {
    const context = useContext(TableReloadContext);
    if (!context) {
        throw new Error(
            "useTableReload must be used within a TableReloadProvider"
        );
    }
    return context;
};
