import { getCategories } from '@/app/actions/categoryAction';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
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
        </div>
    );
};

export default CategoriesPage;