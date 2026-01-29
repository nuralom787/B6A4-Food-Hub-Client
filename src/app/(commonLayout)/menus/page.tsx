import Meals from '@/components/layouts/meals';
import Image from 'next/image';
import bannerImage from '../../../../public/menu-banner.jpg';

const MenusPage = () => {
    return (
        <div className='mt-6 md:mt-12'>
            <div>
                <Image
                    src={bannerImage}
                    alt='Food Hub Menu Banner'
                    loading='lazy'
                    className='object-fill h-40 md:h-full w-full rounded-md'
                />
            </div>
            <Meals totalData={30} />
        </div>
    );
};

export default MenusPage;