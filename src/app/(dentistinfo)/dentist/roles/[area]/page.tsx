"use client"
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";
import DentistCatalog from "@/components/DentistCatalog";

export default function DentistByRole( { params } : { params: { area:string } } ) {
    return (
        <main className="text-center p-5">
            <Suspense fallback={ <p>Loading ... <LinearProgress/></p> }>
                <DentistCatalog role={ params.area } />
            </Suspense>
        </main>
    );
};
