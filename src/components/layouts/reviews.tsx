import { getReviews } from "@/app/actions/reviewAction";
import ReviewCard from "./reviewCard";

const Reviews = async () => {
    const { data: reviews } = await getReviews();

    return (
        <div className="py-10 md:py-12 lg:py-20 lg:px-16 space-y-12">
            <div className="text-center">
                <small className="text-xs md:text-sm font-semibold uppercase">For whom we are blessed.</small>
                <h1 className="font-bold text-xl md:text-3xl uppercase text-[#f1620c]">What our valued customers say about us.</h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {
                    reviews.map((review: any, idx: number) => (
                        <ReviewCard key={idx} review={review} />
                    ))
                }
            </div>
        </div>
    );
};

export default Reviews;