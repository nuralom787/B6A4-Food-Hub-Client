"use server";

export const createProvider = async (data: any) => {
    try {
        const res = await fetch('http://localhost:5000/provider/create-profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await res.json();

        return { success: true, data: result };
    }
    catch (err) {
        return { success: false, message: "Something went wrong while creating provider." };
    }
};