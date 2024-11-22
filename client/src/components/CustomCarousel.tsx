import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

type CustomCarouselProps = {
  items: string[];
};

export default function CustomCarousel({ items }: CustomCarouselProps) {
  return (
    <>
      <div className="relative w-full">
        <Carousel>
          <CarouselContent>
            {items.map((item, index: number) => (
              <CarouselItem key={index}>
                <img
                  src={`${item}`}
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
