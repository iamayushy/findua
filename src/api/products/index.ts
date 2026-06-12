import { useSuspenseQuery, type UseSuspenseQueryOptions } from "@tanstack/react-query";
import engine from "..";

const useGetProductListing = ({
    queryOptions,
}: {
    queryOptions?: Omit<UseSuspenseQueryOptions<any>, "queryKey" | "queryFn">;
} = {}) => {
    const fn = () => {
        return engine.get<any>(
            `/products`,
        );
    };

    return useSuspenseQuery<any>({
        queryKey: ["useGetProductListing"],
        queryFn: fn,
        ...queryOptions,
    });
};

const useGetProductDetails = ({
    productId,
    queryOptions,
}: {
    productId: string;
    queryOptions?: Omit<UseSuspenseQueryOptions<any>, "queryKey" | "queryFn">;
}) => {
    const fn = () => {
        return engine.get<any>(
            `/products/${productId}`,
        );
    };

    return useSuspenseQuery<any>({
        queryKey: ["useGetProductDetails", productId],
        queryFn: fn,
        ...queryOptions,
    });
};

export { useGetProductListing, useGetProductDetails }