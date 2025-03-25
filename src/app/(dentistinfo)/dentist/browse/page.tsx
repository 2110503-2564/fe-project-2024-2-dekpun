"use client"
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";
import DentistCatalog from "@/components/DentistCatalog";

export default function Dentists() {
    return (
        <main className="text-center p-5">
            <Suspense fallback={ <p>Loading ... <LinearProgress/></p> }>
                <DentistCatalog />
            </Suspense>
        </main>
    );
};
