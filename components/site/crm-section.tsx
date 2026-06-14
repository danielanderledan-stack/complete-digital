import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { ASSISTANT_NAME } from "@/lib/brand";

export function CrmSection() {
  return (
    <section className="bg-black">
      <ContainerScroll
        titleComponent={
          <>
            <p className="text-sm uppercase tracking-[0.25em] text-white/50">
              Your own personal
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-pixel)] text-[clamp(2.5rem,12vw,6.5rem)] font-semibold leading-none tracking-tight text-white">
              CRM SYSTEM
            </h2>
          </>
        }
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/crm-placeholder.svg"
          alt="Orbit CRM dashboard (placeholder)"
          className="h-full w-full object-cover object-left-top"
          draggable={false}
        />
      </ContainerScroll>

      {/* Right below the card */}
      <p className="-mt-16 px-6 pb-32 text-center font-[family-name:var(--font-pixel)] text-[clamp(1.5rem,6vw,3rem)] font-semibold leading-tight tracking-tight text-white md:-mt-40">
        {`Designed Ground-Up To Work With ${ASSISTANT_NAME}`}
      </p>
    </section>
  );
}
