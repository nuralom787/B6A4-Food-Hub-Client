"use server";

export const createProvider = async (data: any) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/providers/create-profile`, {
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


export const getSingleProvider = async (id: string) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/providers/${id}`);

        const result = await res.json();

        return { success: true, data: result };
    }
    catch (err) {
        return { success: false, message: "Something went wrong while creating provider." };
    }
};