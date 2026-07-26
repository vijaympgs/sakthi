import Image from "next/image";
import { getImageUrl } from "@/lib/utils";
import type { Testimonial as TestimonialType } from "@/types";

interface TestimonialCardProps {
  testimonial: TestimonialType;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="card">
      <div className="flex items-center gap-1 mb-4">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <span key={i} className="text-accent-500 text-lg">
            &#9733;
          </span>
        ))}
      </div>
      <blockquote className="text-gray-600 leading-relaxed mb-6 italic">
        &ldquo;{testimonial.content}&rdquo;
      </blockquote>
      <div className="flex items-center gap-3">
        {testimonial.author_photo && (
          <div className="w-12 h-12 bg-gray-100 overflow-hidden">
            <img
              src={getImageUrl(testimonial.author_photo)}
              alt={testimonial.author_name}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div>
          <div className="font-semibold text-primary-500">{testimonial.author_name}</div>
          <div className="text-sm text-gray-500">
            {testimonial.author_title}
            {testimonial.author_company && `, ${testimonial.author_company}`}
          </div>
        </div>
      </div>
    </div>
  );
}