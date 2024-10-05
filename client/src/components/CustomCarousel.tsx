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
      <div className="relative">
        <Carousel className="w-full max-w-xs">
          <CarouselContent>
            {items.map((item, index: number) => (
              <CarouselItem key={index}>
                <img
                  src={`${item.src}`}
                  alt={`product-${index}`}
                  className="flex w-[300px] mx-auto hover:scale-110 duration-300 rounded"
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="top-18 left-28" />
          <CarouselNext className="top-18 right-28" />
        </Carousel>
      </div>
    </>
  );
}
