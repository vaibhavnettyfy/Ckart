// import dynamic from 'next/dynamic';

// const Banner = dynamic(() => import('./Banner'), { ssr: false });
// const ProductCollection = dynamic(() => import('./ProductCollection'), { ssr: false });
// const SponsoredProducts = dynamic(() => import('./SponsoredProducts'), { ssr: false });
// const Appointment = dynamic(() => import('./Appointment'), { ssr: false });
// const Selling = dynamic(() => import('./Selling'), { ssr: false });
// const OurProcess = dynamic(() => import('./OurProcess'), { ssr: false });

// const Banner = dynamic(() => import('./Banner'), {
//   loading: () => <p>Loading...</p>,
// });
// const ProductCollection = dynamic(() => import('./ProductCollection'), {
//   loading: () => <p>Loading...</p>,
// });
// const SponsoredProducts = dynamic(() => import('./SponsoredProducts'), {
//   loading: () => <p>Loading...</p>,
// });
// const Appointment = dynamic(() => import('./Appointment'), {
//   loading: () => <p>Loading...</p>,
// });
// const Selling = dynamic(() => import('./Selling'), {
//   loading: () => <p>Loading...</p>,
// });
// const OurProcess = dynamic(() => import('./OurProcess'), {
//   loading: () => <p>Loading...</p>,
// });

import Banner from './Banner';
import ProductCollection from './ProductCollection';
import SponsoredProducts from './SponsoredProducts';
import Appointment from './Appointment';
import Selling from './Selling';
import OurProcess from './OurProcess';
import Whyus from './Whyus';

export { Banner, ProductCollection, SponsoredProducts, Appointment, Selling, OurProcess, Whyus }