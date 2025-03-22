"use client"
import RoleCatalog from "@/components/RoleCatalog";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";

export default function DentistRoles() {

    return(
        <main className="text-center p-5">
            <Suspense fallback={ <p>Loading ... <LinearProgress/></p> }>
                <RoleCatalog />
            </Suspense>
        </main>
    );
};
