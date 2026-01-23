import Image from 'next/image';

export default function Banner() {
  return (
    <div className="relative w-full max-w-[355px] md:max-w-[734px] lg:max-w-[1113px] h-[300px] md:h-[400px] rounded-[20px] overflow-hidden mb-10">
      <Image
        src="/assets/home-banner.jpg"
        alt="Maison moderne en nature"
        fill
        className="object-cover"
        priority
      />
    </div>
  );
}
