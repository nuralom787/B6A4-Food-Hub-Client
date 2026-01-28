import { getReviews } from "@/app/actions/reviewAction";
import ReviewCard from "./reviewCard";

const Reviews = async () => {
    const { data: reviews } = await getReviews();

    return (
        <div className="px-5 md:px-10 lg:px-20 py-10 grid gap-8 space-y-12">
            <div className="text-center">
                <small className="text-sm font-semibold uppercase">For whom we are blessed.</small>
                <h1 className="font-bold text-3xl uppercase text-[#f1620c]">What our valued customers say about us.</h1>
            </div>
            <div className="grid grid-cols-4 gap-6">
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