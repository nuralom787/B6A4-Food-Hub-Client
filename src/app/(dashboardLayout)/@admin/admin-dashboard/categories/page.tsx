export const dynamic = 'force-dynamic';
import { getCategories } from '@/app/actions/categoryAction';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Category } from '@/types/category.types';
import Link from 'next/link';

const CategoriesPage = async () => {
    const categories = await getCategories();

    return (
        <div className='mx-5'>
            <div className='text-end'>
                <Button asChild className=''>
                    <Link href="/admin-dashboard/categories/add-category">Add New Category</Link>
                </Button>
            </div>
            {categories ?
                <div className='border border-gray-400 my-10 p-4 rounded-md text-base font-semibold'>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>SL</TableHead>
                                <TableHead>ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                categories?.data?.map((category: Category, idx: number) => (
                                    <TableRow key={idx}>
                                        <TableCell>{idx + 1}</TableCell>
                                        <TableCell>{category.id}</TableCell>
                                        <TableCell>{category.name}</TableCell>
                                        <TableCell>Come Soon..</TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </div>
                :
                <div className="flex justify-center items-center w-full min-h-max">
                    <span className="inline-flex gap-3 items-center text-2xl">
                        <Spinner className="size-7" />
                        Loading...
                    </span>
                </div>
            }
        </div>
    );
};

export default CategoriesPage;