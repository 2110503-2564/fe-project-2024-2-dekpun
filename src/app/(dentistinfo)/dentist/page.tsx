import RoleCatalog from "@/components/RoleCatalog";
import getcars from "@/libs/getDentists";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";
import CarPanel from "@/components/CarPanel";
import getCars from "@/libs/getDentists";

export default function Car() {

    // const cars = getCars();

    return(
        <main className="text-center p-5">
            <Suspense fallback={ <p>Loading ... <LinearProgress/></p> }>
            {/* carJson={cars} */}
                <RoleCatalog/>
            </Suspense>
        </main>
    );
}