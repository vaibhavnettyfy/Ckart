import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Heading from "../common/Heading";

export function Faq({ faqDetails }) {
  const data = faqDetails;
  return (
    <div>
      <Heading para="FAQ's" />
      <div className="md:py-10 sm:py-8 py-5">
        <Accordion type="single" collapsible className="w-full border">
          {faqDetails &&
            faqDetails.map((response, index) => {
              const { id, key, value, productId } = response;
              return (
                <AccordionItem className="px-5" value={id}>
                  <AccordionTrigger>{key}</AccordionTrigger>
                  <AccordionContent>{value}</AccordionContent>
                </AccordionItem>
              );
            })}
          {/* <AccordionItem className="px-5" value="item-2">
            <AccordionTrigger>Is it styled?</AccordionTrigger>
            <AccordionContent>
              Yes. It comes with default styles that matches the other
              components&apos; aesthetic.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem className="px-5" value="item-3">
            <AccordionTrigger>Is it animated?</AccordionTrigger>
            <AccordionContent>
              Yes. It's animated by default, but you can disable it if you
              prefer.
            </AccordionContent>
          </AccordionItem> */}
        </Accordion>
      </div>
    </div>
  );
}
