import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

type CarouselItemProps = {
  src: string;
};

type CustomCarouselProps = {
  items: CarouselItemProps[];
};

export default function CustomCarousel({ items }: CustomCarouselProps) {
  return (
    <>
      <div className="relative w-full md:1/2">
        <Carousel>
          <CarouselContent>
            {items.map((item, index: number) => (
              <CarouselItem key={index}>
                <img
                  src={`${item.src}`}
                  alt={`product-${index}`}
                  className="w-full h-full object-cover flex hover:scale-110 duration-300 rounded"
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="mt-auto ml-14" />
          <CarouselNext className="mt-auto mr-14" />
        </Carousel>
      </div>
    </>
  );
}
