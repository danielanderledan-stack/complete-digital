import { SplineScene } from "@/components/ui/spline-scene";
import { GooeyText } from "@/components/ui/gooey-text";

// Cursor-following Spline robot.
const ROBOT_SCENE = "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode";

// TODO: confirm the assistant's name — user wrote "Orgy" (assumed autocorrect),
// using "Orbit" as a placeholder. Change here and it updates the morph text.
const ASSISTANT_NAME = "Orbit";

/**
 * Tall wrapper gives the inner panel scroll distance to "stick" full-screen.
 * While pinned, the robot fills the screen and the gooey text morphs between
 * "Meet <name>" and "Your time-saver". The pin releases as you scroll past.
 */
export function RobotSection() {
  return (
    <section className="relative h-[220vh] bg-black">
      <div className="sticky top-0 flex h-svh w-full flex-col overflow-hidden">
        {/* Robot */}
        <div className="absolute inset-0">
          <SplineScene scene={ROBOT_SCENE} className="h-full w-full" />
        </div>

        {/* Morphing headline */}
        <div className="absolute inset-x-0 top-[14%] z-20 flex justify-center px-4">
          <GooeyText
            texts={[`Meet ${ASSISTANT_NAME}`, "Your time-saver"]}
            morphTime={1.1}
            cooldownTime={1.4}
            className="h-[140px] w-full"
            textClassName="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-4xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl"
          />
        </div>
      </div>
    </section>
  );
}
