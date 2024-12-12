"use server";
export async function createRouteAction(state: any, formData: FormData) {
    //console.log("Entrou na função")
    const { sourceId, destinationId } = Object.fromEntries(formData);
    console.log("Entrou na função: ", sourceId, destinationId)
    const directionReponse = await fetch(
        `http://localhost:3000/directions?originId=${sourceId}&destinationId=${destinationId}`
    );

    if(!directionReponse.ok) {
        throw new Error("Falha no fetch directionReponse CreateRouteAction");
    };

    const directionData = await directionReponse.json();

    const startAddress = directionData.routes[0].legs[0].start_address;
    const endAddress = directionData.routes[0].legs[0].end_address;
    console.log("Entrou na start: ", directionData)
    const response = await fetch("http://localhost:3000/routes",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "name": `${startAddress} - ${endAddress}`,
                "source_id": directionData.request.origin.place_id.replace("place_id:", ""),
                "destination_id": directionData.request.destination.place_id.replace("place_id:", "")
            })

        }
    )
    if (!response.ok) {
        console.log(await response.text());

        throw new Error("Falha ao criar a rota")
    }

    return {
        success: true
    }
}

